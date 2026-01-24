/**
 * Price provider implementations for fetching Solana token prices
 */

import type { PriceProvider } from './types.js';
import { log, exponentialBackoff, sleep } from './utils.js';

/**
 * DexScreener API response structure
 */
interface DexScreenerResponse {
  pairs: Array<{
    chainId: string;
    dexId: string;
    priceUsd: string;
    liquidity?: {
      usd: number;
    };
    volume?: {
      h24: number;
    };
  }> | null;
}

/**
 * DexScreener Price Provider implementation
 * Uses the free DexScreener API - no API key required
 * Docs: https://docs.dexscreener.com/api/reference
 */
export class DexScreenerPriceProvider implements PriceProvider {
  private readonly baseUrl = 'https://api.dexscreener.com/latest/dex/tokens';
  private readonly maxRetries = 5;

  async getPriceUsd(mint: string): Promise<number | null> {
    const url = `${this.baseUrl}/${encodeURIComponent(mint)}`;

    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.status === 429) {
          // Rate limited - back off
          const delay = exponentialBackoff(attempt, 2000);
          log(`Rate limited by DexScreener API. Retrying in ${Math.round(delay / 1000)}s...`, 'WARN');
          await sleep(delay);
          continue;
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = (await response.json()) as DexScreenerResponse;

        if (!data.pairs || data.pairs.length === 0) {
          // Token not found or no pairs available
          log(`No price data available for mint: ${mint}`, 'WARN');
          return null;
        }

        // Filter to Solana pairs and sort by liquidity to get best price
        const solanaPairs = data.pairs
          .filter((p) => p.chainId === 'solana' && p.priceUsd)
          .sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0));

        if (solanaPairs.length === 0) {
          log(`No Solana pairs found for mint: ${mint}`, 'WARN');
          return null;
        }

        const priceStr = solanaPairs[0].priceUsd;
        const price = parseFloat(priceStr);

        if (isNaN(price) || price <= 0) {
          log(`Invalid price value received: ${priceStr}`, 'WARN');
          return null;
        }

        return price;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);

        if (attempt < this.maxRetries - 1) {
          const delay = exponentialBackoff(attempt);
          log(
            `Error fetching price (attempt ${attempt + 1}/${this.maxRetries}): ${errorMessage}. Retrying in ${Math.round(delay / 1000)}s...`,
            'WARN'
          );
          await sleep(delay);
        } else {
          log(`Failed to fetch price after ${this.maxRetries} attempts: ${errorMessage}`, 'ERROR');
          return null;
        }
      }
    }

    return null;
  }
}

/**
 * Create the default price provider
 */
export function createPriceProvider(): PriceProvider {
  return new DexScreenerPriceProvider();
}
