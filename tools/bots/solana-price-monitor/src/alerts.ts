/**
 * Alert system - defines thresholds and checks for alert conditions
 */

import type { AlertType, AlertThreshold, AlertPayload, TokenMonitorState } from './types.js';
import { calcPercentChange, formatTimestamp } from './utils.js';

/**
 * Alert threshold definitions
 */
export const ALERT_THRESHOLDS: AlertThreshold[] = [
  {
    type: 'UP_30',
    multiplier: 1.30,
    description: '30% price increase',
  },
  {
    type: 'DOWN_30',
    multiplier: 0.70,
    description: '30% price decrease',
  },
  {
    type: 'UP_100',
    multiplier: 2.00,
    description: '100% price increase (2x)',
  },
  {
    type: 'DOWN_100',
    multiplier: 0.50,
    description: '50% price decrease (halved)',
  },
];

/**
 * Check which alert thresholds are triggered by the current price
 * Returns array of triggered alert types that haven't been fired yet
 */
export function checkAlertThresholds(
  state: TokenMonitorState,
  currentPrice: number
): AlertType[] {
  const triggered: AlertType[] = [];
  const baseline = state.baselinePrice;

  for (const threshold of ALERT_THRESHOLDS) {
    // Skip if already fired
    if (state.alertsFired[threshold.type]) {
      continue;
    }

    // Check if threshold is met
    let isTriggered = false;

    switch (threshold.type) {
      case 'UP_30':
        isTriggered = currentPrice >= baseline * threshold.multiplier;
        break;
      case 'DOWN_30':
        isTriggered = currentPrice <= baseline * threshold.multiplier;
        break;
      case 'UP_100':
        isTriggered = currentPrice >= baseline * threshold.multiplier;
        break;
      case 'DOWN_100':
        isTriggered = currentPrice <= baseline * threshold.multiplier;
        break;
    }

    if (isTriggered) {
      triggered.push(threshold.type);
    }
  }

  return triggered;
}

/**
 * Get threshold info by type
 */
export function getThresholdInfo(type: AlertType): AlertThreshold | undefined {
  return ALERT_THRESHOLDS.find((t) => t.type === type);
}

/**
 * Create an alert payload for notification
 */
export function createAlertPayload(
  mint: string,
  alertType: AlertType,
  baselinePrice: number,
  currentPrice: number
): AlertPayload {
  const threshold = getThresholdInfo(alertType);
  const percentChange = calcPercentChange(baselinePrice, currentPrice);

  return {
    timestamp: formatTimestamp(),
    mint,
    alertType,
    baselinePrice,
    currentPrice,
    percentChange,
    thresholdDescription: threshold?.description || alertType,
  };
}

/**
 * Format an alert for console output
 */
export function formatAlertMessage(payload: AlertPayload): string {
  const direction = payload.percentChange >= 0 ? '📈' : '📉';
  const sign = payload.percentChange >= 0 ? '+' : '';

  return [
    `ALERT: ${payload.thresholdDescription}`,
    `${direction} Token: ${payload.mint}`,
    `   Baseline: $${payload.baselinePrice.toFixed(8)}`,
    `   Current:  $${payload.currentPrice.toFixed(8)}`,
    `   Change:   ${sign}${payload.percentChange.toFixed(2)}%`,
    `   Time:     ${payload.timestamp}`,
  ].join('\n');
}
