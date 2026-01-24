/**
 * Token bucket rate limiter for per-user command limiting
 */

interface UserBucket {
  tokens: number;
  lastRefill: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remainingTokens: number;
  retryAfterMs?: number;
}

/**
 * Token bucket rate limiter
 */
export class RateLimiter {
  private readonly maxTokens: number;
  private readonly refillRateMs: number;
  private readonly buckets: Map<number, UserBucket> = new Map();

  /**
   * Create rate limiter
   * @param tokensPerMinute Maximum tokens (commands) per minute per user
   */
  constructor(tokensPerMinute: number) {
    this.maxTokens = tokensPerMinute;
    // Refill one token every (60000 / tokensPerMinute) ms
    this.refillRateMs = 60000 / tokensPerMinute;
  }

  /**
   * Try to consume a token for a user
   * Returns whether the action is allowed
   */
  tryConsume(userId: number): RateLimitResult {
    const now = Date.now();
    let bucket = this.buckets.get(userId);

    if (!bucket) {
      // New user, create bucket with full tokens
      bucket = {
        tokens: this.maxTokens,
        lastRefill: now,
      };
      this.buckets.set(userId, bucket);
    }

    // Calculate tokens to add since last refill
    const timePassed = now - bucket.lastRefill;
    const tokensToAdd = Math.floor(timePassed / this.refillRateMs);

    if (tokensToAdd > 0) {
      bucket.tokens = Math.min(this.maxTokens, bucket.tokens + tokensToAdd);
      bucket.lastRefill = now;
    }

    // Try to consume a token
    if (bucket.tokens > 0) {
      bucket.tokens--;
      return {
        allowed: true,
        remainingTokens: bucket.tokens,
      };
    }

    // Rate limited - calculate retry time
    const timeUntilNextToken = this.refillRateMs - (now - bucket.lastRefill);
    return {
      allowed: false,
      remainingTokens: 0,
      retryAfterMs: Math.max(0, timeUntilNextToken),
    };
  }

  /**
   * Check if a user would be rate limited (without consuming)
   */
  wouldLimit(userId: number): boolean {
    const bucket = this.buckets.get(userId);
    if (!bucket) return false;

    // Recalculate tokens
    const now = Date.now();
    const timePassed = now - bucket.lastRefill;
    const tokensToAdd = Math.floor(timePassed / this.refillRateMs);
    const currentTokens = Math.min(this.maxTokens, bucket.tokens + tokensToAdd);

    return currentTokens <= 0;
  }

  /**
   * Get remaining tokens for a user
   */
  getRemainingTokens(userId: number): number {
    const bucket = this.buckets.get(userId);
    if (!bucket) return this.maxTokens;

    const now = Date.now();
    const timePassed = now - bucket.lastRefill;
    const tokensToAdd = Math.floor(timePassed / this.refillRateMs);
    return Math.min(this.maxTokens, bucket.tokens + tokensToAdd);
  }

  /**
   * Reset a user's bucket (for admins or testing)
   */
  reset(userId: number): void {
    this.buckets.delete(userId);
  }

  /**
   * Clean up old buckets to prevent memory leaks
   * Call periodically (e.g., every hour)
   */
  cleanup(maxAgeMs: number = 3600000): number {
    const now = Date.now();
    let cleaned = 0;

    for (const [userId, bucket] of this.buckets) {
      if (now - bucket.lastRefill > maxAgeMs) {
        this.buckets.delete(userId);
        cleaned++;
      }
    }

    return cleaned;
  }
}

/**
 * Create rate limiter instance
 */
export function createRateLimiter(tokensPerMinute: number): RateLimiter {
  return new RateLimiter(tokensPerMinute);
}
