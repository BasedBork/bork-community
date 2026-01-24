#!/usr/bin/env node

/**
 * Telegram Bot for Solana Price Monitor
 * Multi-user bot that monitors tokens and sends price alerts
 */

import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import { createBotStateManager, type BotStateManager, type UserTokenState } from './bot-state.js';
import { TelegramNotifier } from './telegram-notifier.js';
import { createPriceProvider } from './price-provider.js';
import { checkAlertThresholds, createAlertPayload } from './alerts.js';
import {
  validateMintAddress,
  formatPrice,
  formatPercent,
  calcPercentChange,
  formatDuration,
  truncateMint,
  TWENTY_FOUR_HOURS_MS,
  log,
  setLogLevel,
  sanitizeUserId,
} from './utils.js';
import { getConfig, printConfigSummary, ConfigValidationError, type Config } from './config.js';
import { createAccessControl, type AccessControl } from './access-control.js';
import { createRateLimiter, type RateLimiter } from './rate-limiter.js';
import { createHealthServer, updateHealthStatus, type HealthServer } from './health.js';
import type { PriceProvider } from './types.js';

const CLEANUP_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

let config: Config;
let bot: TelegramBot;
let stateManager: BotStateManager;
let priceProvider: PriceProvider;
let accessControl: AccessControl;
let rateLimiter: RateLimiter;
let healthServer: HealthServer | null = null;
let pollTimer: NodeJS.Timeout | null = null;
let cleanupTimer: NodeJS.Timeout | null = null;

/**
 * Check rate limit and send message if limited
 */
async function checkRateLimit(chatId: number): Promise<boolean> {
  const result = rateLimiter.tryConsume(chatId);
  if (!result.allowed) {
    const retrySeconds = Math.ceil((result.retryAfterMs || 3000) / 1000);
    await bot.sendMessage(
      chatId,
      `You're sending commands too quickly. Please wait ${retrySeconds} second(s).`
    );
    return false;
  }
  return true;
}

/**
 * Check if user can add more monitors
 */
function canAddMonitor(chatId: number): { allowed: boolean; current: number; max: number } {
  const current = stateManager.getUserMonitorCount(chatId);
  const max = config.maxMonitorsPerUser;
  return { allowed: current < max, current, max };
}

/**
 * Start monitoring a token for a user
 */
async function startMonitoring(chatId: number, mint: string): Promise<void> {
  // Check monitor limit
  const monitorCheck = canAddMonitor(chatId);
  if (!monitorCheck.allowed) {
    await bot.sendMessage(
      chatId,
      `You've reached the maximum of ${monitorCheck.max} active monitors.\n\n` +
      `Use /status to see your monitors and /stop <CA> to remove one.`
    );
    return;
  }

  // Check if already monitoring
  if (stateManager.hasActiveMonitor(chatId, mint)) {
    const monitor = stateManager.getMonitor(chatId, mint)!;
    const elapsed = Date.now() - monitor.baselineTime;
    const remaining = TWENTY_FOUR_HOURS_MS - elapsed;
    const change = calcPercentChange(monitor.baselinePrice, monitor.lastPrice);

    await bot.sendMessage(
      chatId,
      `Already monitoring this token!\n\n` +
      `CA: \`${truncateMint(mint, 10)}\`\n` +
      `Baseline: ${formatPrice(monitor.baselinePrice)}\n` +
      `Current: ${formatPrice(monitor.lastPrice)} (${formatPercent(change)})\n` +
      `Time left: ${formatDuration(remaining)}`,
      { parse_mode: 'Markdown' }
    );
    return;
  }

  // Fetch initial price
  await bot.sendMessage(chatId, `Fetching price for \`${truncateMint(mint, 10)}\`...`, { parse_mode: 'Markdown' });

  const price = await priceProvider.getPriceUsd(mint);

  if (price === null) {
    await bot.sendMessage(
      chatId,
      `Could not fetch price for this token. It may not be listed on DexScreener or have no liquidity.\n\nCA: \`${mint}\``,
      { parse_mode: 'Markdown' }
    );
    return;
  }

  // Create monitor
  await stateManager.createMonitor(chatId, mint, price);

  const monitorStatus = canAddMonitor(chatId);
  await bot.sendMessage(
    chatId,
    `Started monitoring token!\n\n` +
    `CA: \`${truncateMint(mint, 10)}\`\n` +
    `Baseline: ${formatPrice(price)}\n` +
    `Tracking for 24 hours.\n\n` +
    `You'll receive alerts at:\n` +
    `  - +30% / -30%\n` +
    `  - +100% (2x) / -50% (halved)\n\n` +
    `Monitors: ${monitorStatus.current}/${monitorStatus.max}`,
    { parse_mode: 'Markdown' }
  );
}

/**
 * Show status of user's monitors
 */
async function showStatus(chatId: number): Promise<void> {
  const userMonitors = stateManager.getUserMonitors(chatId);
  const activeMonitors: UserTokenState[] = [];

  const now = Date.now();
  for (const monitor of Object.values(userMonitors)) {
    const elapsed = now - monitor.baselineTime;
    if (elapsed < TWENTY_FOUR_HOURS_MS) {
      activeMonitors.push(monitor);
    }
  }

  if (activeMonitors.length === 0) {
    await bot.sendMessage(
      chatId,
      `You have no active monitors.\n\nPaste a Solana token CA to start tracking!`
    );
    return;
  }

  const monitorLimit = config.maxMonitorsPerUser;
  let message = `Your active monitors (${activeMonitors.length}/${monitorLimit}):\n`;

  for (let i = 0; i < activeMonitors.length; i++) {
    const m = activeMonitors[i];
    const change = calcPercentChange(m.baselinePrice, m.lastPrice);
    const elapsed = now - m.baselineTime;
    const remaining = TWENTY_FOUR_HOURS_MS - elapsed;

    message += `\n${i + 1}. \`${truncateMint(m.mint, 10)}\`\n`;
    message += `   Price: ${formatPrice(m.lastPrice)} (${formatPercent(change)})\n`;
    message += `   Time left: ${formatDuration(remaining)}\n`;
  }

  await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
}

/**
 * Stop monitoring a specific token
 */
async function stopMonitor(chatId: number, mint: string): Promise<void> {
  const removed = await stateManager.removeMonitor(chatId, mint);

  if (removed) {
    await bot.sendMessage(chatId, `Stopped monitoring \`${truncateMint(mint, 10)}\``, { parse_mode: 'Markdown' });
  } else {
    await bot.sendMessage(chatId, `Not currently monitoring this token.`);
  }
}

/**
 * Stop all monitors for a user
 */
async function stopAllMonitors(chatId: number): Promise<void> {
  const count = await stateManager.removeAllUserMonitors(chatId);

  if (count > 0) {
    await bot.sendMessage(chatId, `Stopped all ${count} monitor(s).`);
  } else {
    await bot.sendMessage(chatId, `You have no active monitors.`);
  }
}

/**
 * Show help message
 */
async function showHelp(chatId: number): Promise<void> {
  const accessResult = accessControl.checkAccess(chatId);

  let helpText = `*Solana Price Monitor Bot*

*How to use:*
Paste a Solana token contract address (CA) to start monitoring it for 24 hours.

*Commands:*
\`/status\` - Show your active monitors
\`/stop <CA>\` - Stop monitoring a specific token
\`/stopall\` - Stop all your monitors
\`/help\` - Show this message`;

  // Add admin commands if user is admin
  if (accessResult.isAdmin && accessControl.hasAdminFeatures()) {
    helpText += `

*Admin Commands:*
\`/stats\` - Show bot statistics
\`/broadcast <message>\` - Send message to all users`;
  }

  helpText += `

*Alerts:*
You'll receive alerts when price moves:
  - +30% or -30%
  - +100% (2x) or -50% (halved)

Each alert fires only once per threshold.`;

  await bot.sendMessage(chatId, helpText, { parse_mode: 'Markdown' });
}

/**
 * Show bot statistics (admin only)
 */
async function showStats(chatId: number): Promise<void> {
  const stats = stateManager.getStats();

  const message = `*Bot Statistics*

Users: ${stats.totalUsers}
Total monitors: ${stats.totalMonitors}
Active monitors: ${stats.activeMonitors}

Mode: ${config.telegramMode}
Poll interval: ${config.pollIntervalMs / 1000}s
Max monitors/user: ${config.maxMonitorsPerUser}
Rate limit: ${config.rateLimitPerMinute}/min`;

  await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
}

/**
 * Broadcast message to all users (admin only)
 */
async function broadcastMessage(chatId: number, message: string): Promise<void> {
  if (!message.trim()) {
    await bot.sendMessage(chatId, 'Usage: /broadcast <message>');
    return;
  }

  const userMonitors = stateManager.getAllActiveMonitors();

  // Get unique user IDs
  const userIds = new Set(userMonitors.map(m => m.chatId));

  let sent = 0;
  let failed = 0;

  await bot.sendMessage(chatId, `Broadcasting to ${userIds.size} user(s)...`);

  for (const userId of userIds) {
    try {
      await bot.sendMessage(userId, `*Announcement:*\n\n${message}`, { parse_mode: 'Markdown' });
      sent++;
    } catch {
      failed++;
      log(`Failed to broadcast to user ${sanitizeUserId(userId)}`, 'warn');
    }
  }

  await bot.sendMessage(chatId, `Broadcast complete: ${sent} sent, ${failed} failed`);
}

/**
 * Poll all active monitors and send alerts
 */
async function pollMonitors(): Promise<void> {
  const monitors = stateManager.getAllActiveMonitors();

  // Update health status
  updateHealthStatus({
    activeMonitors: monitors.length,
    lastPollTime: Date.now(),
  });

  if (monitors.length === 0) {
    return;
  }

  // Group monitors by mint to avoid duplicate API calls
  const mintToMonitors = new Map<string, UserTokenState[]>();
  for (const monitor of monitors) {
    const existing = mintToMonitors.get(monitor.mint) || [];
    existing.push(monitor);
    mintToMonitors.set(monitor.mint, existing);
  }

  // Fetch prices and process alerts
  for (const [mint, monitorList] of mintToMonitors) {
    const price = await priceProvider.getPriceUsd(mint);

    if (price === null) {
      continue;
    }

    for (const monitor of monitorList) {
      // Update price in state
      const updated = await stateManager.updateMonitorPrice(monitor.chatId, mint, price);

      if (!updated) continue;

      // Check for triggered alerts
      const triggeredAlerts = checkAlertThresholds(updated, price);

      for (const alertType of triggeredAlerts) {
        // Mark as fired
        await stateManager.markAlertFired(monitor.chatId, mint, alertType);

        // Send alert via Telegram
        const notifier = new TelegramNotifier(bot, monitor.chatId);
        const payload = createAlertPayload(mint, alertType, updated.baselinePrice, price);
        await notifier.notify(payload);
      }
    }
  }
}

/**
 * Handle incoming messages
 */
function setupMessageHandlers(): void {
  // /start command
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    const accessResult = accessControl.checkAccess(chatId);
    if (!accessResult.allowed) {
      await bot.sendMessage(chatId, accessControl.getDenialMessage());
      log(`Denied access to user ${sanitizeUserId(chatId)}`, 'info');
      return;
    }

    if (!await checkRateLimit(chatId)) return;

    await bot.sendMessage(
      chatId,
      `Welcome to Solana Price Monitor!\n\n` +
      `Paste a Solana token CA to start tracking it.\n` +
      `Use /help to see all commands.`
    );
  });

  // /help command
  bot.onText(/\/help/, async (msg) => {
    const accessResult = accessControl.checkAccess(msg.chat.id);
    if (!accessResult.allowed) return;
    if (!await checkRateLimit(msg.chat.id)) return;

    await showHelp(msg.chat.id);
  });

  // /status command
  bot.onText(/\/status/, async (msg) => {
    const accessResult = accessControl.checkAccess(msg.chat.id);
    if (!accessResult.allowed) return;
    if (!await checkRateLimit(msg.chat.id)) return;

    await showStatus(msg.chat.id);
  });

  // /stop <CA> command
  bot.onText(/\/stop\s+(\S+)/, async (msg, match) => {
    const accessResult = accessControl.checkAccess(msg.chat.id);
    if (!accessResult.allowed) return;
    if (!match) return;
    if (!await checkRateLimit(msg.chat.id)) return;

    const mint = match[1].trim();
    await stopMonitor(msg.chat.id, mint);
  });

  // /stopall command
  bot.onText(/\/stopall/, async (msg) => {
    const accessResult = accessControl.checkAccess(msg.chat.id);
    if (!accessResult.allowed) return;
    if (!await checkRateLimit(msg.chat.id)) return;

    await stopAllMonitors(msg.chat.id);
  });

  // /stats command (admin only)
  bot.onText(/\/stats/, async (msg) => {
    const accessResult = accessControl.checkAccess(msg.chat.id);
    if (!accessResult.allowed) return;
    if (!accessResult.isAdmin) {
      await bot.sendMessage(msg.chat.id, 'This command is only available to admins.');
      return;
    }
    if (!await checkRateLimit(msg.chat.id)) return;

    await showStats(msg.chat.id);
  });

  // /broadcast command (admin only)
  bot.onText(/\/broadcast\s+(.+)/s, async (msg, match) => {
    const accessResult = accessControl.checkAccess(msg.chat.id);
    if (!accessResult.allowed) return;
    if (!accessResult.isAdmin) {
      await bot.sendMessage(msg.chat.id, 'This command is only available to admins.');
      return;
    }
    if (!match) return;
    if (!await checkRateLimit(msg.chat.id)) return;

    const message = match[1].trim();
    await broadcastMessage(msg.chat.id, message);
  });

  // Handle plain text messages (potential CAs)
  bot.on('message', async (msg) => {
    // Skip commands
    if (msg.text?.startsWith('/')) return;

    // Check permissions
    const accessResult = accessControl.checkAccess(msg.chat.id);
    if (!accessResult.allowed) return;

    const text = msg.text?.trim();
    if (!text) return;

    // Check rate limit
    if (!await checkRateLimit(msg.chat.id)) return;

    // Check if it looks like a Solana address
    const validation = validateMintAddress(text);
    if (validation.valid) {
      await startMonitoring(msg.chat.id, text);
    }
  });
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  // Load configuration (fails fast if invalid)
  try {
    config = getConfig();
  } catch (error) {
    if (error instanceof ConfigValidationError) {
      console.error('Configuration Error:', error.message);
      process.exit(1);
    }
    throw error;
  }

  // Set log level from config
  setLogLevel(config.logLevel);

  log('Initializing Solana Price Monitor Telegram Bot...', 'info');
  printConfigSummary(config);
  console.log('');

  // Initialize components
  stateManager = await createBotStateManager(config.dataDir);
  priceProvider = createPriceProvider();
  accessControl = createAccessControl(config);
  rateLimiter = createRateLimiter(config.rateLimitPerMinute);
  bot = new TelegramBot(config.telegramBotToken, { polling: true });

  // Start health server
  try {
    healthServer = await createHealthServer(config.healthCheckPort);
    log(`Health server started on port ${config.healthCheckPort}`, 'info');
  } catch (error) {
    log(`Failed to start health server: ${error instanceof Error ? error.message : error}`, 'warn');
  }

  // Set up message handlers
  setupMessageHandlers();

  // Start polling loop
  pollTimer = setInterval(pollMonitors, config.pollIntervalMs);

  // Start cleanup timer
  cleanupTimer = setInterval(async () => {
    const cleaned = await stateManager.cleanupExpiredMonitors();
    if (cleaned > 0) {
      log(`Cleaned up ${cleaned} expired monitor(s)`, 'info');
    }

    // Clean up rate limiter buckets
    const rateLimitCleaned = rateLimiter.cleanup();
    if (rateLimitCleaned > 0) {
      log(`Cleaned up ${rateLimitCleaned} rate limit bucket(s)`, 'debug');
    }
  }, CLEANUP_INTERVAL_MS);

  // Handle graceful shutdown
  const shutdown = async () => {
    log('Shutting down...', 'info');

    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }

    if (cleanupTimer) {
      clearInterval(cleanupTimer);
      cleanupTimer = null;
    }

    if (healthServer) {
      healthServer.close();
    }

    await stateManager.saveImmediate();
    bot.stopPolling();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  // Get bot info and print status
  const botInfo = await bot.getMe();
  console.log('');
  log(`Bot started successfully!`, 'info');
  console.log(`Username: @${botInfo.username}`);
  console.log(`Polling interval: ${config.pollIntervalMs / 1000}s`);

  const modeInfo = {
    private: 'Private mode (allowlist only)',
    public: 'Public mode (anyone can use)',
    community: 'Community mode (anyone + admin features)',
  };
  console.log(`Access mode: ${modeInfo[config.telegramMode]}`);

  console.log(`\nOpen Telegram and search for @${botInfo.username} to start!`);
  console.log(`Press Ctrl+C to stop.`);
}

// Run
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
