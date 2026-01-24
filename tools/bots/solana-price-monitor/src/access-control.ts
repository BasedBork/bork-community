/**
 * Access control for multi-user Telegram bot
 * Supports private, public, and community modes
 */

import type { Config, TelegramMode } from './config.js';

export interface AccessCheckResult {
  allowed: boolean;
  isAdmin: boolean;
  reason?: string;
}

/**
 * Access control manager
 */
export class AccessControl {
  private readonly mode: TelegramMode;
  private readonly allowedUserIds: Set<number>;
  private readonly adminUserIds: Set<number>;

  constructor(config: Config) {
    this.mode = config.telegramMode;
    this.allowedUserIds = config.allowedUserIds;
    this.adminUserIds = config.adminUserIds;
  }

  /**
   * Check if a user is allowed to use the bot
   */
  checkAccess(userId: number): AccessCheckResult {
    const isAdmin = this.isAdmin(userId);

    switch (this.mode) {
      case 'private':
        // Only allowed users can use the bot
        if (this.allowedUserIds.has(userId)) {
          return { allowed: true, isAdmin };
        }
        return {
          allowed: false,
          isAdmin: false,
          reason: 'This bot is private and not accepting new users.',
        };

      case 'public':
        // Anyone can use the bot, no admin features
        return { allowed: true, isAdmin: false };

      case 'community':
        // Anyone can use the bot, admins have extra features
        return { allowed: true, isAdmin };

      default:
        return { allowed: false, isAdmin: false, reason: 'Invalid access mode.' };
    }
  }

  /**
   * Check if user is an admin
   */
  isAdmin(userId: number): boolean {
    if (this.mode === 'public') return false;
    return this.adminUserIds.has(userId) || this.allowedUserIds.has(userId);
  }

  /**
   * Check if admin features are available
   */
  hasAdminFeatures(): boolean {
    return this.mode === 'community' || this.mode === 'private';
  }

  /**
   * Get the current access mode
   */
  getMode(): TelegramMode {
    return this.mode;
  }

  /**
   * Get denial message for unauthorized users (privacy-safe)
   */
  getDenialMessage(): string {
    return 'This bot is private and not accepting new users.';
  }
}

/**
 * Create access control instance
 */
export function createAccessControl(config: Config): AccessControl {
  return new AccessControl(config);
}
