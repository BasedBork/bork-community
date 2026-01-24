/**
 * Utility functions for validation, formatting, and common operations
 */

import type { LogLevel } from './config.js';

// Base58 alphabet used by Solana
const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

// Log level priority (lower = more verbose)
const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Current log level (can be set via setLogLevel)
let currentLogLevel: LogLevel = 'info';

/**
 * Validate a Solana mint address
 * - Must be base58 encoded
 * - Typically 32-44 characters (most are 43-44)
 */
export function validateMintAddress(mint: string): { valid: boolean; error?: string } {
  if (!mint || typeof mint !== 'string') {
    return { valid: false, error: 'Mint address is required' };
  }

  const trimmed = mint.trim();

  // Check length (Solana addresses are typically 32-44 chars, most commonly 43-44)
  if (trimmed.length < 32 || trimmed.length > 44) {
    return {
      valid: false,
      error: `Invalid mint address length: ${trimmed.length}. Expected 32-44 characters.`,
    };
  }

  // Check base58 characters
  for (const char of trimmed) {
    if (!BASE58_ALPHABET.includes(char)) {
      return {
        valid: false,
        error: `Invalid character '${char}' in mint address. Must be base58 encoded.`,
      };
    }
  }

  return { valid: true };
}

/**
 * Format a price for display
 */
export function formatPrice(price: number): string {
  if (price >= 1) {
    return `$${price.toFixed(4)}`;
  } else if (price >= 0.0001) {
    return `$${price.toFixed(6)}`;
  } else {
    return `$${price.toExponential(4)}`;
  }
}

/**
 * Format a percentage change for display
 */
export function formatPercent(percent: number): string {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
}

/**
 * Calculate percentage change from baseline
 */
export function calcPercentChange(baseline: number, current: number): number {
  return ((current - baseline) / baseline) * 100;
}

/**
 * Format a timestamp for display
 */
export function formatTimestamp(timestamp: number = Date.now()): string {
  return new Date(timestamp).toISOString();
}

/**
 * Format duration in milliseconds to human readable
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    const remainingMins = minutes % 60;
    return `${hours}h ${remainingMins}m`;
  } else if (minutes > 0) {
    const remainingSecs = seconds % 60;
    return `${minutes}m ${remainingSecs}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Truncate mint address for display
 */
export function truncateMint(mint: string, chars: number = 8): string {
  if (mint.length <= chars * 2 + 3) {
    return mint;
  }
  return `${mint.slice(0, chars)}...${mint.slice(-chars)}`;
}

/**
 * Sleep for a given number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Add jitter to a delay (for rate-limit friendly behavior)
 * Returns delay +/- up to jitterPercent
 */
export function addJitter(delay: number, jitterPercent: number = 0.2): number {
  const jitter = delay * jitterPercent * (Math.random() * 2 - 1);
  return Math.max(0, delay + jitter);
}

/**
 * Calculate exponential backoff delay
 */
export function exponentialBackoff(
  attempt: number,
  baseDelayMs: number = 1000,
  maxDelayMs: number = 60000
): number {
  const delay = Math.min(baseDelayMs * Math.pow(2, attempt), maxDelayMs);
  return addJitter(delay);
}

/**
 * Set the global log level
 */
export function setLogLevel(level: LogLevel): void {
  currentLogLevel = level;
}

/**
 * Get the current log level
 */
export function getLogLevel(): LogLevel {
  return currentLogLevel;
}

/**
 * Check if a log level should be displayed
 */
function shouldLog(level: LogLevel): boolean {
  return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[currentLogLevel];
}

/**
 * Sanitize user ID for logging (PII protection)
 * Truncates to first 4 and last 2 digits for privacy
 */
export function sanitizeUserId(userId: number): string {
  const str = String(userId);
  if (str.length <= 6) {
    return `${str.slice(0, 2)}***`;
  }
  return `${str.slice(0, 4)}...${str.slice(-2)}`;
}

// Accept both lowercase and uppercase for backward compatibility
type LogLevelInput = LogLevel | 'alert' | 'INFO' | 'WARN' | 'ERROR' | 'ALERT' | 'DEBUG';

/**
 * Normalize log level to lowercase
 */
function normalizeLogLevel(level: LogLevelInput): LogLevel | 'alert' {
  const lowered = level.toLowerCase() as LogLevel | 'alert';
  return lowered;
}

/**
 * Log with timestamp prefix and level filtering
 */
export function log(message: string, level: LogLevelInput = 'info'): void {
  const normalizedLevel = normalizeLogLevel(level);

  // Handle alert specially (always shows)
  if (normalizedLevel === 'alert') {
    const timestamp = formatTimestamp();
    const prefix = `[${timestamp}] [ALERT]`;
    console.log(`\n${'='.repeat(60)}`);
    console.log(`${prefix} ${message}`);
    console.log(`${'='.repeat(60)}\n`);
    return;
  }

  // Check if we should log this level
  if (!shouldLog(normalizedLevel)) {
    return;
  }

  const timestamp = formatTimestamp();
  const prefix = `[${timestamp}] [${normalizedLevel.toUpperCase()}]`;

  switch (normalizedLevel) {
    case 'error':
      console.error(`${prefix} ${message}`);
      break;
    case 'warn':
      console.warn(`${prefix} ${message}`);
      break;
    default:
      console.log(`${prefix} ${message}`);
  }
}

/**
 * 24 hours in milliseconds
 */
export const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
