#!/usr/bin/env node

/**
 * Solana Price Monitor CLI
 * Monitor Solana tokens for price-move alerts
 */

import { Command } from 'commander';
import * as readline from 'node:readline';
import { validateMintAddress, log } from './utils.js';
import { createPriceProvider } from './price-provider.js';
import { createStateManager } from './state.js';
import { createNotifier } from './notifier.js';
import { runMonitor } from './monitor.js';
import type { CliOptions } from './types.js';

const VERSION = '1.0.0';

/**
 * Prompt for mint address interactively
 */
async function promptForMint(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('Enter Solana token mint address: ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  const program = new Command();

  program
    .name('solana-price-monitor')
    .description('Monitor Solana token prices and receive alerts on significant moves')
    .version(VERSION)
    .option('-m, --mint <address>', 'Solana token mint address to monitor')
    .option('-i, --interval <seconds>', 'Polling interval in seconds', '30')
    .option('-w, --webhook <url>', 'Webhook URL for alert notifications')
    .parse(process.argv);

  const opts = program.opts();

  // Get mint address from CLI arg or prompt
  let mint = opts.mint as string | undefined;

  if (!mint) {
    mint = await promptForMint();
  }

  // Validate mint address
  const validation = validateMintAddress(mint);
  if (!validation.valid) {
    console.error(`Error: ${validation.error}`);
    console.error('');
    console.error('Solana mint addresses must be:');
    console.error('  - Base58 encoded (characters: 1-9, A-H, J-N, P-Z, a-k, m-z)');
    console.error('  - 32-44 characters in length');
    console.error('');
    console.error('Example: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v (USDC)');
    process.exit(1);
  }

  // Parse interval
  const interval = parseInt(opts.interval as string, 10);
  if (isNaN(interval) || interval < 1) {
    console.error('Error: Invalid interval. Must be a positive integer (seconds).');
    process.exit(1);
  }

  if (interval < 10) {
    log('Warning: Very short polling interval may cause rate limiting.', 'WARN');
  }

  const options: CliOptions = {
    mint,
    interval,
    webhook: opts.webhook as string | undefined,
  };

  // Initialize components
  log('Initializing Solana Price Monitor...');

  try {
    const priceProvider = createPriceProvider();
    const stateManager = await createStateManager();
    const notifier = createNotifier(options.webhook);

    // Print configuration
    console.log('');
    console.log('Configuration:');
    console.log(`  Token:    ${options.mint}`);
    console.log(`  Interval: ${options.interval}s`);
    console.log(`  Webhook:  ${options.webhook || 'none (console only)'}`);
    console.log('');
    console.log('Alert thresholds:');
    console.log('  - 30% price increase (UP_30)');
    console.log('  - 30% price decrease (DOWN_30)');
    console.log('  - 100% price increase / 2x (UP_100)');
    console.log('  - 50% price decrease / halved (DOWN_100)');
    console.log('');
    console.log('Press Ctrl+C to stop monitoring.');
    console.log('');

    // Run monitor
    await runMonitor(options, priceProvider, stateManager, notifier);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Fatal error: ${errorMessage}`, 'ERROR');
    process.exit(1);
  }
}

// Run
main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
