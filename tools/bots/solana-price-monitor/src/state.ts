/**
 * State persistence module
 * Handles saving and loading monitor state to/from a JSON file
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { PersistedState, TokenMonitorState, AlertsFired } from './types.js';
import { log } from './utils.js';

const STATE_VERSION = 1;

// Get the directory of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));
// Default data directory is ./data relative to the project root
const DEFAULT_DATA_DIR = join(__dirname, '..', '..', 'data');
const STATE_FILE_NAME = 'alerts.json';

/**
 * State manager class for persisting and loading monitor state
 */
export class StateManager {
  private state: PersistedState;
  private readonly statePath: string;
  private saveDebounceTimer: NodeJS.Timeout | null = null;

  constructor(dataDir: string = DEFAULT_DATA_DIR) {
    this.statePath = join(dataDir, STATE_FILE_NAME);
    this.state = this.createEmptyState();
  }

  /**
   * Create a fresh empty state
   */
  private createEmptyState(): PersistedState {
    return {
      version: STATE_VERSION,
      tokens: {},
    };
  }

  /**
   * Create a fresh alerts fired record
   */
  private createEmptyAlertsFired(): AlertsFired {
    return {
      UP_30: false,
      DOWN_30: false,
      UP_100: false,
      DOWN_100: false,
    };
  }

  /**
   * Initialize state manager - load existing state or create new
   */
  async init(): Promise<void> {
    try {
      // Ensure data directory exists
      await mkdir(dirname(this.statePath), { recursive: true });

      // Try to load existing state
      const data = await readFile(this.statePath, 'utf-8');
      const loaded = JSON.parse(data) as PersistedState;

      // Validate version
      if (loaded.version !== STATE_VERSION) {
        log(`State file version mismatch (found ${loaded.version}, expected ${STATE_VERSION}). Starting fresh.`, 'WARN');
        this.state = this.createEmptyState();
      } else {
        this.state = loaded;
        log(`Loaded existing state with ${Object.keys(this.state.tokens).length} token(s)`);
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        log('No existing state file found. Starting fresh.');
      } else {
        log(`Error loading state file: ${error instanceof Error ? error.message : error}. Starting fresh.`, 'WARN');
      }
      this.state = this.createEmptyState();
    }
  }

  /**
   * Save state to disk (with debouncing to avoid excessive writes)
   */
  async save(): Promise<void> {
    // Clear any pending save
    if (this.saveDebounceTimer) {
      clearTimeout(this.saveDebounceTimer);
    }

    // Debounce saves - wait 500ms before actually writing
    return new Promise((resolve, reject) => {
      this.saveDebounceTimer = setTimeout(async () => {
        try {
          await mkdir(dirname(this.statePath), { recursive: true });
          await writeFile(this.statePath, JSON.stringify(this.state, null, 2), 'utf-8');
          resolve();
        } catch (error) {
          log(`Error saving state: ${error instanceof Error ? error.message : error}`, 'ERROR');
          reject(error);
        }
      }, 500);
    });
  }

  /**
   * Force immediate save (bypass debouncing)
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
      log(`Error saving state: ${error instanceof Error ? error.message : error}`, 'ERROR');
      throw error;
    }
  }

  /**
   * Get state for a specific token
   */
  getTokenState(mint: string): TokenMonitorState | null {
    return this.state.tokens[mint] || null;
  }

  /**
   * Check if a token has an active monitor (within 24h window)
   */
  hasActiveMonitor(mint: string): boolean {
    const tokenState = this.state.tokens[mint];
    if (!tokenState) {
      return false;
    }

    const elapsed = Date.now() - tokenState.baselineTime;
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return elapsed < twentyFourHours;
  }

  /**
   * Create or reset a token monitor state
   */
  async createTokenState(mint: string, baselinePrice: number): Promise<TokenMonitorState> {
    const now = Date.now();
    const tokenState: TokenMonitorState = {
      mint,
      baselinePrice,
      baselineTime: now,
      alertsFired: this.createEmptyAlertsFired(),
      maxPrice: baselinePrice,
      minPrice: baselinePrice,
      lastPrice: baselinePrice,
      lastUpdated: now,
    };

    this.state.tokens[mint] = tokenState;
    await this.save();

    return tokenState;
  }

  /**
   * Update token state with new price
   */
  async updateTokenPrice(mint: string, price: number): Promise<TokenMonitorState | null> {
    const tokenState = this.state.tokens[mint];
    if (!tokenState) {
      return null;
    }

    tokenState.lastPrice = price;
    tokenState.lastUpdated = Date.now();
    tokenState.maxPrice = Math.max(tokenState.maxPrice, price);
    tokenState.minPrice = Math.min(tokenState.minPrice, price);

    await this.save();
    return tokenState;
  }

  /**
   * Mark an alert as fired
   */
  async markAlertFired(mint: string, alertType: keyof AlertsFired): Promise<void> {
    const tokenState = this.state.tokens[mint];
    if (!tokenState) {
      return;
    }

    tokenState.alertsFired[alertType] = true;
    await this.save();
  }

  /**
   * Check if an alert has already been fired
   */
  hasAlertFired(mint: string, alertType: keyof AlertsFired): boolean {
    const tokenState = this.state.tokens[mint];
    if (!tokenState) {
      return false;
    }
    return tokenState.alertsFired[alertType];
  }

  /**
   * Remove a token from monitoring
   */
  async removeToken(mint: string): Promise<void> {
    delete this.state.tokens[mint];
    await this.saveImmediate();
  }

  /**
   * Get list of alerts that have fired for a token
   */
  getFiredAlerts(mint: string): (keyof AlertsFired)[] {
    const tokenState = this.state.tokens[mint];
    if (!tokenState) {
      return [];
    }

    const fired: (keyof AlertsFired)[] = [];
    for (const [key, value] of Object.entries(tokenState.alertsFired)) {
      if (value) {
        fired.push(key as keyof AlertsFired);
      }
    }
    return fired;
  }
}

/**
 * Create and initialize a state manager
 */
export async function createStateManager(dataDir?: string): Promise<StateManager> {
  const manager = new StateManager(dataDir);
  await manager.init();
  return manager;
}
