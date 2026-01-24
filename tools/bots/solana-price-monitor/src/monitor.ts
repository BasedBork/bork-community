/**
 * Main monitoring logic
 * Orchestrates price fetching, alert checking, and notifications
 */

import type { PriceProvider, MonitorSummary, AlertType, CliOptions } from './types.js';
import type { StateManager } from './state.js';
import type { Notifier } from './notifier.js';
import {
  log,
  formatPrice,
  formatPercent,
  calcPercentChange,
  formatDuration,
  truncateMint,
  addJitter,
  sleep,
  TWENTY_FOUR_HOURS_MS,
} from './utils.js';
import {
  checkAlertThresholds,
  createAlertPayload,
  formatAlertMessage,
} from './alerts.js';

export interface MonitorConfig {
  mint: string;
  intervalSeconds: number;
  priceProvider: PriceProvider;
  stateManager: StateManager;
  notifier: Notifier;
}

/**
 * Token price monitor
 */
export class TokenMonitor {
  private readonly config: MonitorConfig;
  private isRunning = false;
  private pollTimer: NodeJS.Timeout | null = null;

  constructor(config: MonitorConfig) {
    this.config = config;
  }

  /**
   * Start monitoring the token
   */
  async start(): Promise<MonitorSummary> {
    const { mint, priceProvider, stateManager, intervalSeconds } = this.config;

    this.isRunning = true;
    log(`Starting monitor for token: ${mint}`);
    log(`Polling interval: ${intervalSeconds} seconds`);

    // Check for existing state
    let state = stateManager.getTokenState(mint);
    const hasExisting = state !== null && stateManager.hasActiveMonitor(mint);

    if (hasExisting && state) {
      // Resume existing monitor
      const elapsed = Date.now() - state.baselineTime;
      const remaining = TWENTY_FOUR_HOURS_MS - elapsed;
      log(`Resuming existing monitor. Baseline: ${formatPrice(state.baselinePrice)}`);
      log(`Time remaining: ${formatDuration(remaining)}`);
      log(`Alerts already fired: ${stateManager.getFiredAlerts(mint).join(', ') || 'none'}`);
    } else {
      // New monitor - fetch initial price
      log('Fetching initial price to establish baseline...');

      let baselinePrice: number | null = null;
      let attempts = 0;
      const maxWaitTime = TWENTY_FOUR_HOURS_MS;
      const startWait = Date.now();

      // Keep trying until we get a price or 24h expires
      while (baselinePrice === null && this.isRunning) {
        baselinePrice = await priceProvider.getPriceUsd(mint);

        if (baselinePrice === null) {
          attempts++;
          const elapsed = Date.now() - startWait;

          if (elapsed >= maxWaitTime) {
            log('Failed to get initial price within 24 hours. Exiting.', 'ERROR');
            return this.createEmptySummary(mint);
          }

          const waitTime = Math.min(30000, 5000 * attempts); // Cap at 30s
          log(`Price unavailable. Retrying in ${waitTime / 1000}s... (attempt ${attempts})`);
          await sleep(addJitter(waitTime));
        }
      }

      if (!this.isRunning || baselinePrice === null) {
        return this.createEmptySummary(mint);
      }

      // Create new state
      state = await stateManager.createTokenState(mint, baselinePrice);
      log(`Baseline price established: ${formatPrice(baselinePrice)}`);
      log(`Monitoring for 24 hours until ${new Date(state.baselineTime + TWENTY_FOUR_HOURS_MS).toISOString()}`);
    }

    // Start polling loop
    return this.pollLoop(state.baselineTime);
  }

  /**
   * Main polling loop
   */
  private async pollLoop(baselineTime: number): Promise<MonitorSummary> {
    const { mint, priceProvider, stateManager, notifier, intervalSeconds } = this.config;
    const intervalMs = intervalSeconds * 1000;

    while (this.isRunning) {
      // Check if 24h has elapsed
      const elapsed = Date.now() - baselineTime;
      if (elapsed >= TWENTY_FOUR_HOURS_MS) {
        log('24-hour monitoring window complete.');
        break;
      }

      // Fetch current price
      const currentPrice = await priceProvider.getPriceUsd(mint);

      if (currentPrice === null) {
        log('Price fetch returned null. Will retry next interval.', 'WARN');
      } else {
        // Update state with new price
        const state = await stateManager.updateTokenPrice(mint, currentPrice);

        if (state) {
          // Log current status
          const percentChange = calcPercentChange(state.baselinePrice, currentPrice);
          const remaining = TWENTY_FOUR_HOURS_MS - elapsed;

          log(
            `${truncateMint(mint)} | ` +
            `Price: ${formatPrice(currentPrice)} | ` +
            `Change: ${formatPercent(percentChange)} | ` +
            `Remaining: ${formatDuration(remaining)}`
          );

          // Check for triggered alerts
          const triggeredAlerts = checkAlertThresholds(state, currentPrice);

          for (const alertType of triggeredAlerts) {
            // Mark as fired first to prevent duplicates
            await stateManager.markAlertFired(mint, alertType);

            // Create and send alert
            const payload = createAlertPayload(
              mint,
              alertType,
              state.baselinePrice,
              currentPrice
            );

            log(formatAlertMessage(payload), 'ALERT');

            // Send webhook notification
            await notifier.notify(payload);
          }
        }
      }

      // Wait for next poll interval (with jitter)
      const jitteredInterval = addJitter(intervalMs, 0.1);
      await sleep(jitteredInterval);
    }

    // Generate and return summary
    return this.generateSummary();
  }

  /**
   * Stop monitoring
   */
  stop(): void {
    this.isRunning = false;
    if (this.pollTimer) {
      clearTimeout(this.pollTimer);
      this.pollTimer = null;
    }
    log('Monitor stopped.');
  }

  /**
   * Generate monitoring summary
   */
  private async generateSummary(): Promise<MonitorSummary> {
    const { mint, stateManager } = this.config;
    const state = stateManager.getTokenState(mint);

    if (!state) {
      return this.createEmptySummary(mint);
    }

    const alertsFired = stateManager.getFiredAlerts(mint) as AlertType[];
    const duration = Date.now() - state.baselineTime;

    const summary: MonitorSummary = {
      mint,
      baselinePrice: state.baselinePrice,
      finalPrice: state.lastPrice,
      maxPrice: state.maxPrice,
      minPrice: state.minPrice,
      maxPercentChange: calcPercentChange(state.baselinePrice, state.maxPrice),
      minPercentChange: calcPercentChange(state.baselinePrice, state.minPrice),
      alertsFired,
      monitoringDurationMs: duration,
    };

    // Clean up state after monitoring complete
    await stateManager.removeToken(mint);

    return summary;
  }

  /**
   * Create empty summary for error cases
   */
  private createEmptySummary(mint: string): MonitorSummary {
    return {
      mint,
      baselinePrice: 0,
      finalPrice: 0,
      maxPrice: 0,
      minPrice: 0,
      maxPercentChange: 0,
      minPercentChange: 0,
      alertsFired: [],
      monitoringDurationMs: 0,
    };
  }
}

/**
 * Print monitoring summary to console
 */
export function printSummary(summary: MonitorSummary): void {
  console.log('\n' + '='.repeat(60));
  console.log('MONITORING SUMMARY');
  console.log('='.repeat(60));
  console.log(`Token:             ${summary.mint}`);
  console.log(`Duration:          ${formatDuration(summary.monitoringDurationMs)}`);
  console.log(`Baseline Price:    ${formatPrice(summary.baselinePrice)}`);
  console.log(`Final Price:       ${formatPrice(summary.finalPrice)}`);
  console.log(`Max Price:         ${formatPrice(summary.maxPrice)} (${formatPercent(summary.maxPercentChange)})`);
  console.log(`Min Price:         ${formatPrice(summary.minPrice)} (${formatPercent(summary.minPercentChange)})`);
  console.log(`Alerts Fired:      ${summary.alertsFired.length > 0 ? summary.alertsFired.join(', ') : 'none'}`);
  console.log('='.repeat(60) + '\n');
}

/**
 * Create and start a monitor
 */
export async function runMonitor(
  options: CliOptions,
  priceProvider: PriceProvider,
  stateManager: StateManager,
  notifier: Notifier
): Promise<MonitorSummary> {
  const monitor = new TokenMonitor({
    mint: options.mint,
    intervalSeconds: options.interval,
    priceProvider,
    stateManager,
    notifier,
  });

  // Handle graceful shutdown
  const shutdown = () => {
    log('Received shutdown signal. Stopping monitor...');
    monitor.stop();
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  try {
    const summary = await monitor.start();
    printSummary(summary);
    return summary;
  } finally {
    process.off('SIGINT', shutdown);
    process.off('SIGTERM', shutdown);
  }
}
