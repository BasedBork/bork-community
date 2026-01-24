/**
 * Multi-user bot state management
 * Tracks active monitors per chat ID with persistence
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import type { TokenMonitorState, AlertsFired } from './types.js';

const STATE_FILE_NAME = 'bot-state.json';
const STATE_VERSION = 1;

/**
 * State for a single user's monitor of a token
 */
export interface UserTokenState extends TokenMonitorState {
  chatId: number;
}

/**
 * Full bot state structure
 */
export interface BotPersistedState {
  version: number;
  users: Record<string, Record<string, UserTokenState>>; // chatId -> mint -> state
}

/**
 * Bot state manager for multi-user support
 */
export class BotStateManager {
  private state: BotPersistedState;
  private readonly statePath: string;
  private saveDebounceTimer: NodeJS.Timeout | null = null;

  constructor(dataDir: string) {
    this.statePath = join(dataDir, STATE_FILE_NAME);
    this.state = this.createEmptyState();
  }

  private createEmptyState(): BotPersistedState {
    return {
      version: STATE_VERSION,
      users: {},
    };
  }

  private createEmptyAlertsFired(): AlertsFired {
    return {
      UP_30: false,
      DOWN_30: false,
      UP_100: false,
      DOWN_100: false,
    };
  }

  /**
   * Initialize - load existing state or create new
   */
  async init(): Promise<void> {
    try {
      await mkdir(dirname(this.statePath), { recursive: true });
      const data = await readFile(this.statePath, 'utf-8');
      const loaded = JSON.parse(data) as BotPersistedState;

      if (loaded.version !== STATE_VERSION) {
        console.log(`Bot state version mismatch. Starting fresh.`);
        this.state = this.createEmptyState();
      } else {
        this.state = loaded;
        const userCount = Object.keys(this.state.users).length;
        let monitorCount = 0;
        for (const user of Object.values(this.state.users)) {
          monitorCount += Object.keys(user).length;
        }
        console.log(`Loaded bot state: ${userCount} user(s), ${monitorCount} monitor(s)`);
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        console.log('No existing bot state. Starting fresh.');
      }
      this.state = this.createEmptyState();
    }
  }

  /**
   * Save state to disk with debouncing
   */
  async save(): Promise<void> {
    if (this.saveDebounceTimer) {
      clearTimeout(this.saveDebounceTimer);
    }

    return new Promise((resolve, reject) => {
      this.saveDebounceTimer = setTimeout(async () => {
        try {
          await mkdir(dirname(this.statePath), { recursive: true });
          await writeFile(this.statePath, JSON.stringify(this.state, null, 2), 'utf-8');
          resolve();
        } catch (error) {
          console.error(`Error saving bot state: ${error instanceof Error ? error.message : error}`);
          reject(error);
        }
      }, 500);
    });
  }

  /**
   * Save immediately (bypass debouncing)
   */
  async saveImmediate(): Promise<void> {
    if (this.saveDebounceTimer) {
      clearTimeout(this.saveDebounceTimer);
      this.saveDebounceTimer = null;
    }
    try {
      await mkdir(dirname(this.statePath), { recursive: true });
      await writeFile(this.statePath, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Error saving bot state: ${error instanceof Error ? error.message : error}`);
    }
  }

  /**
   * Get all monitors for a user
   */
  getUserMonitors(chatId: number): Record<string, UserTokenState> {
    return this.state.users[String(chatId)] || {};
  }

  /**
   * Get a specific monitor for a user
   */
  getMonitor(chatId: number, mint: string): UserTokenState | null {
    const userMonitors = this.state.users[String(chatId)];
    if (!userMonitors) return null;
    return userMonitors[mint] || null;
  }

  /**
   * Check if user has an active monitor for a token (within 24h)
   */
  hasActiveMonitor(chatId: number, mint: string): boolean {
    const monitor = this.getMonitor(chatId, mint);
    if (!monitor) return false;

    const elapsed = Date.now() - monitor.baselineTime;
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return elapsed < twentyFourHours;
  }

  /**
   * Create a new monitor for a user
   */
  async createMonitor(chatId: number, mint: string, baselinePrice: number): Promise<UserTokenState> {
    const now = Date.now();
    const userTokenState: UserTokenState = {
      chatId,
      mint,
      baselinePrice,
      baselineTime: now,
      alertsFired: this.createEmptyAlertsFired(),
      maxPrice: baselinePrice,
      minPrice: baselinePrice,
      lastPrice: baselinePrice,
      lastUpdated: now,
    };

    if (!this.state.users[String(chatId)]) {
      this.state.users[String(chatId)] = {};
    }
    this.state.users[String(chatId)][mint] = userTokenState;

    await this.save();
    return userTokenState;
  }

  /**
   * Update a monitor's price
   */
  async updateMonitorPrice(chatId: number, mint: string, price: number): Promise<UserTokenState | null> {
    const monitor = this.getMonitor(chatId, mint);
    if (!monitor) return null;

    monitor.lastPrice = price;
    monitor.lastUpdated = Date.now();
    monitor.maxPrice = Math.max(monitor.maxPrice, price);
    monitor.minPrice = Math.min(monitor.minPrice, price);

    await this.save();
    return monitor;
  }

  /**
   * Mark an alert as fired
   */
  async markAlertFired(chatId: number, mint: string, alertType: keyof AlertsFired): Promise<void> {
    const monitor = this.getMonitor(chatId, mint);
    if (!monitor) return;

    monitor.alertsFired[alertType] = true;
    await this.save();
  }

  /**
   * Remove a monitor
   */
  async removeMonitor(chatId: number, mint: string): Promise<boolean> {
    const userMonitors = this.state.users[String(chatId)];
    if (!userMonitors || !userMonitors[mint]) return false;

    delete userMonitors[mint];

    // Clean up empty user entries
    if (Object.keys(userMonitors).length === 0) {
      delete this.state.users[String(chatId)];
    }

    await this.saveImmediate();
    return true;
  }

  /**
   * Remove all monitors for a user
   */
  async removeAllUserMonitors(chatId: number): Promise<number> {
    const userMonitors = this.state.users[String(chatId)];
    if (!userMonitors) return 0;

    const count = Object.keys(userMonitors).length;
    delete this.state.users[String(chatId)];
    await this.saveImmediate();
    return count;
  }

  /**
   * Get all active monitors across all users
   */
  getAllActiveMonitors(): UserTokenState[] {
    const monitors: UserTokenState[] = [];
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const now = Date.now();

    for (const userMonitors of Object.values(this.state.users)) {
      for (const monitor of Object.values(userMonitors)) {
        const elapsed = now - monitor.baselineTime;
        if (elapsed < twentyFourHours) {
          monitors.push(monitor);
        }
      }
    }

    return monitors;
  }

  /**
   * Clean up expired monitors (older than 24h)
   */
  async cleanupExpiredMonitors(): Promise<number> {
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const now = Date.now();
    let cleanedCount = 0;

    for (const [chatIdStr, userMonitors] of Object.entries(this.state.users)) {
      for (const [mint, monitor] of Object.entries(userMonitors)) {
        const elapsed = now - monitor.baselineTime;
        if (elapsed >= twentyFourHours) {
          delete userMonitors[mint];
          cleanedCount++;
        }
      }

      // Remove empty user entries
      if (Object.keys(userMonitors).length === 0) {
        delete this.state.users[chatIdStr];
      }
    }

    if (cleanedCount > 0) {
      await this.saveImmediate();
    }

    return cleanedCount;
  }

  /**
   * Get statistics for admin dashboard
   */
  getStats(): BotStats {
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const now = Date.now();
    let activeMonitors = 0;
    let totalMonitors = 0;

    for (const userMonitors of Object.values(this.state.users)) {
      for (const monitor of Object.values(userMonitors)) {
        totalMonitors++;
        const elapsed = now - monitor.baselineTime;
        if (elapsed < twentyFourHours) {
          activeMonitors++;
        }
      }
    }

    return {
      totalUsers: Object.keys(this.state.users).length,
      totalMonitors,
      activeMonitors,
    };
  }

  /**
   * Get count of active monitors for a specific user
   */
  getUserMonitorCount(chatId: number): number {
    const userMonitors = this.state.users[String(chatId)];
    if (!userMonitors) return 0;

    const twentyFourHours = 24 * 60 * 60 * 1000;
    const now = Date.now();
    let count = 0;

    for (const monitor of Object.values(userMonitors)) {
      const elapsed = now - monitor.baselineTime;
      if (elapsed < twentyFourHours) {
        count++;
      }
    }

    return count;
  }
}

/**
 * Statistics for admin dashboard
 */
export interface BotStats {
  totalUsers: number;
  totalMonitors: number;
  activeMonitors: number;
}

/**
 * Create and initialize bot state manager
 */
export async function createBotStateManager(dataDir: string): Promise<BotStateManager> {
  const manager = new BotStateManager(dataDir);
  await manager.init();
  return manager;
}
