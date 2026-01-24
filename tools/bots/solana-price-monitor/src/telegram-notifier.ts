/**
 * Telegram notification adapter
 * Implements the Notifier interface for sending alerts via Telegram
 */

import TelegramBot from 'node-telegram-bot-api';
import type { Notifier } from './notifier.js';
import type { AlertPayload } from './types.js';
import { truncateMint } from './utils.js';

/**
 * Telegram notifier - sends formatted alert messages to a specific chat
 */
export class TelegramNotifier implements Notifier {
  private readonly bot: TelegramBot;
  private readonly chatId: number;

  constructor(bot: TelegramBot, chatId: number) {
    this.bot = bot;
    this.chatId = chatId;
  }

  async notify(payload: AlertPayload): Promise<boolean> {
    const emoji = payload.percentChange >= 0 ? '📈' : '📉';
    const alertEmoji = payload.percentChange >= 0 ? '🚀' : '🔻';
    const sign = payload.percentChange >= 0 ? '+' : '';

    const message = [
      `${alertEmoji} *PRICE ALERT: ${sign}${payload.percentChange.toFixed(0)}% ${payload.percentChange >= 0 ? 'increase' : 'decrease'}!*`,
      '',
      `${emoji} *Token:* \`${truncateMint(payload.mint, 10)}\``,
      `💰 *Baseline:* $${payload.baselinePrice.toFixed(8)}`,
      `💵 *Current:* $${payload.currentPrice.toFixed(8)}`,
      `📊 *Change:* ${sign}${payload.percentChange.toFixed(2)}%`,
    ].join('\n');

    try {
      await this.bot.sendMessage(this.chatId, message, { parse_mode: 'Markdown' });
      return true;
    } catch (error) {
      console.error(`Failed to send Telegram notification: ${error instanceof Error ? error.message : error}`);
      return false;
    }
  }
}
