/**
 * Alert threshold types
 */
export type AlertType = 'UP_30' | 'DOWN_30' | 'UP_100' | 'DOWN_100';

/**
 * Configuration for an alert threshold
 */
export interface AlertThreshold {
  type: AlertType;
  multiplier: number;
  description: string;
}

/**
 * Record of which alerts have been fired for a token
 */
export interface AlertsFired {
  UP_30: boolean;
  DOWN_30: boolean;
  UP_100: boolean;
  DOWN_100: boolean;
}

/**
 * State for a monitored token
 */
export interface TokenMonitorState {
  mint: string;
  baselinePrice: number;
  baselineTime: number; // Unix timestamp ms
  alertsFired: AlertsFired;
  maxPrice: number;
  minPrice: number;
  lastPrice: number;
  lastUpdated: number; // Unix timestamp ms
}

/**
 * Full persisted state
 */
export interface PersistedState {
  version: number;
  tokens: Record<string, TokenMonitorState>;
}

/**
 * CLI options
 */
export interface CliOptions {
  mint: string;
  interval: number;
  webhook?: string;
}

/**
 * Alert event payload
 */
export interface AlertPayload {
  timestamp: string;
  mint: string;
  alertType: AlertType;
  baselinePrice: number;
  currentPrice: number;
  percentChange: number;
  thresholdDescription: string;
}

/**
 * Monitor summary after 24h
 */
export interface MonitorSummary {
  mint: string;
  baselinePrice: number;
  finalPrice: number;
  maxPrice: number;
  minPrice: number;
  maxPercentChange: number;
  minPercentChange: number;
  alertsFired: AlertType[];
  monitoringDurationMs: number;
}

/**
 * Price provider interface
 */
export interface PriceProvider {
  /**
   * Get the current USD price for a Solana token
   * @param mint - The token mint address
   * @returns The price in USD, or null if unavailable
   */
  getPriceUsd(mint: string): Promise<number | null>;
}

/**
 * Jupiter API response structure
 */
export interface JupiterPriceResponse {
  data: Record<string, {
    id: string;
    type: string;
    price: string;
  } | undefined>;
  timeTaken: number;
}
