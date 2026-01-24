/**
 * Centralized configuration with validation
 * Loads settings from environment variables with sensible defaults
 */

export type TelegramMode = 'private' | 'public' | 'community';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Config {
  // Telegram
  telegramBotToken: string;
  telegramMode: TelegramMode;
  allowedUserIds: Set<number>;
  adminUserIds: Set<number>;

  // Logging
  logLevel: LogLevel;

  // Monitoring
  pollIntervalMs: number;
  maxMonitorsPerUser: number;

  // Rate limiting
  rateLimitPerMinute: number;

  // Storage
  dataDir: string;

  // Health check
  healthCheckPort: number;
}

/**
 * Parse comma-separated numeric IDs from env var
 */
function parseUserIds(envValue: string | undefined): Set<number> {
  if (!envValue) return new Set();

  return new Set(
    envValue
      .split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id) && id > 0)
  );
}

/**
 * Validate telegram mode
 */
function parseTelegramMode(value: string | undefined): TelegramMode {
  const normalized = (value || 'private').toLowerCase();
  if (normalized === 'public' || normalized === 'community') {
    return normalized;
  }
  return 'private';
}

/**
 * Validate log level
 */
function parseLogLevel(value: string | undefined): LogLevel {
  const normalized = (value || 'info').toLowerCase();
  if (normalized === 'debug' || normalized === 'warn' || normalized === 'error') {
    return normalized;
  }
  return 'info';
}

/**
 * Parse positive integer with default
 */
function parsePositiveInt(value: string | undefined, defaultValue: number): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) || parsed <= 0 ? defaultValue : parsed;
}

/**
 * Configuration validation errors
 */
export class ConfigValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigValidationError';
  }
}

/**
 * Load and validate configuration from environment
 */
export function loadConfig(): Config {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramMode = parseTelegramMode(process.env.TELEGRAM_MODE);
  const allowedUserIds = parseUserIds(process.env.ALLOWED_USER_IDS);
  const adminUserIds = parseUserIds(process.env.TELEGRAM_ADMIN_IDS);

  // Validation
  if (!telegramBotToken) {
    throw new ConfigValidationError(
      'TELEGRAM_BOT_TOKEN is required.\n\n' +
      'To set up:\n' +
      '1. Open Telegram and message @BotFather\n' +
      '2. Send /newbot and follow the prompts\n' +
      '3. Copy the bot token\n' +
      '4. Set the environment variable:\n' +
      '   export TELEGRAM_BOT_TOKEN=your_token_here\n' +
      '   Or create a .env file with: TELEGRAM_BOT_TOKEN=your_token_here'
    );
  }

  // Private mode requires allowed user IDs
  if (telegramMode === 'private' && allowedUserIds.size === 0) {
    throw new ConfigValidationError(
      'ALLOWED_USER_IDS is required in private mode.\n\n' +
      'Options:\n' +
      '1. Set ALLOWED_USER_IDS=your_telegram_user_id\n' +
      '2. Change to public mode: TELEGRAM_MODE=public\n' +
      '3. Change to community mode: TELEGRAM_MODE=community\n\n' +
      'To find your Telegram user ID, message @userinfobot on Telegram.'
    );
  }

  return {
    telegramBotToken,
    telegramMode,
    allowedUserIds,
    adminUserIds,
    logLevel: parseLogLevel(process.env.LOG_LEVEL),
    pollIntervalMs: parsePositiveInt(process.env.POLL_INTERVAL_MS, 30000),
    maxMonitorsPerUser: parsePositiveInt(process.env.MAX_MONITORS_PER_USER, 10),
    rateLimitPerMinute: parsePositiveInt(process.env.RATE_LIMIT_PER_MINUTE, 20),
    dataDir: process.env.DATA_DIR || './data',
    healthCheckPort: parsePositiveInt(process.env.HEALTH_CHECK_PORT, 8080),
  };
}

/**
 * Singleton config instance
 */
let configInstance: Config | null = null;

/**
 * Get the config instance (loads on first call)
 */
export function getConfig(): Config {
  if (!configInstance) {
    configInstance = loadConfig();
  }
  return configInstance;
}

/**
 * Reset config (for testing)
 */
export function resetConfig(): void {
  configInstance = null;
}

/**
 * Print configuration summary (hides sensitive values)
 */
export function printConfigSummary(config: Config): void {
  console.log('Configuration:');
  console.log(`  Mode:                ${config.telegramMode}`);
  console.log(`  Log level:           ${config.logLevel}`);
  console.log(`  Poll interval:       ${config.pollIntervalMs / 1000}s`);
  console.log(`  Max monitors/user:   ${config.maxMonitorsPerUser}`);
  console.log(`  Rate limit:          ${config.rateLimitPerMinute}/min`);
  console.log(`  Data directory:      ${config.dataDir}`);
  console.log(`  Health check port:   ${config.healthCheckPort}`);

  if (config.telegramMode === 'private') {
    console.log(`  Allowed users:       ${config.allowedUserIds.size} user(s)`);
  } else if (config.telegramMode === 'community') {
    console.log(`  Admin users:         ${config.adminUserIds.size} admin(s)`);
  }
}
