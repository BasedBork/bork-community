/**
 * Notification system - handles alert delivery via webhooks
 */

import type { AlertPayload } from './types.js';
import { log, exponentialBackoff, sleep } from './utils.js';

/**
 * Notifier interface
 */
export interface Notifier {
  notify(payload: AlertPayload): Promise<boolean>;
}

/**
 * Console-only notifier (default)
 */
export class ConsoleNotifier implements Notifier {
  async notify(_payload: AlertPayload): Promise<boolean> {
    // Console output is handled by the monitor - this is a no-op
    return true;
  }
}

/**
 * Webhook notifier - POSTs JSON payloads to a configured URL
 */
export class WebhookNotifier implements Notifier {
  private readonly webhookUrl: string;
  private readonly maxRetries = 3;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  async notify(payload: AlertPayload): Promise<boolean> {
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const response = await fetch(this.webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...payload,
            source: 'solana-price-monitor',
          }),
        });

        if (response.ok) {
          log(`Webhook notification sent successfully for ${payload.alertType}`);
          return true;
        }

        // Handle rate limiting
        if (response.status === 429) {
          const delay = exponentialBackoff(attempt, 2000);
          log(`Webhook rate limited. Retrying in ${Math.round(delay / 1000)}s...`, 'WARN');
          await sleep(delay);
          continue;
        }

        // Other errors
        if (response.status >= 500) {
          // Server error - retry
          const delay = exponentialBackoff(attempt);
          log(`Webhook server error (${response.status}). Retrying in ${Math.round(delay / 1000)}s...`, 'WARN');
          await sleep(delay);
          continue;
        }

        // Client error - don't retry
        log(`Webhook failed with status ${response.status}: ${response.statusText}`, 'ERROR');
        return false;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);

        if (attempt < this.maxRetries - 1) {
          const delay = exponentialBackoff(attempt);
          log(`Webhook error (attempt ${attempt + 1}/${this.maxRetries}): ${errorMessage}. Retrying...`, 'WARN');
          await sleep(delay);
        } else {
          log(`Webhook failed after ${this.maxRetries} attempts: ${errorMessage}`, 'ERROR');
          return false;
        }
      }
    }

    return false;
  }
}

/**
 * Create a notifier based on configuration
 */
export function createNotifier(webhookUrl?: string): Notifier {
  if (webhookUrl) {
    // Validate URL
    try {
      new URL(webhookUrl);
      log(`Webhook notifications enabled: ${webhookUrl}`);
      return new WebhookNotifier(webhookUrl);
    } catch {
      log(`Invalid webhook URL provided: ${webhookUrl}. Using console-only notifications.`, 'WARN');
      return new ConsoleNotifier();
    }
  }

  return new ConsoleNotifier();
}
