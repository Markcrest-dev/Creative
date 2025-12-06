/**
 * Rate Limiting Utility
 * Implements token bucket algorithm for API rate limiting
 */

interface RateLimitConfig {
    maxTokens: number; // Maximum number of tokens in the bucket
    refillRate: number; // Tokens added per second
    refillInterval?: number; // How often to refill (ms), default 1000
}

interface RateLimitState {
    tokens: number;
    lastRefill: number;
}

/**
 * Rate limiter implementing the token bucket algorithm
 */
export class RateLimiter {
    private config: Required<RateLimitConfig>;
    private state: RateLimitState;
    private queue: Array<() => void> = [];
    private processingQueue = false;

    constructor(config: RateLimitConfig) {
        this.config = {
            maxTokens: config.maxTokens,
            refillRate: config.refillRate,
            refillInterval: config.refillInterval || 1000,
        };

        this.state = {
            tokens: config.maxTokens,
            lastRefill: Date.now(),
        };
    }

    /**
     * Refill tokens based on time elapsed
     */
    private refillTokens(): void {
        const now = Date.now();
        const timePassed = now - this.state.lastRefill;
        const intervalsElapsed = Math.floor(timePassed / this.config.refillInterval);

        if (intervalsElapsed > 0) {
            const tokensToAdd = intervalsElapsed * this.config.refillRate;
            this.state.tokens = Math.min(this.config.maxTokens, this.state.tokens + tokensToAdd);
            this.state.lastRefill = now;
        }
    }

    /**
     * Check if a request can proceed
     */
    private canProceed(): boolean {
        this.refillTokens();
        return this.state.tokens > 0;
    }

    /**
     * Consume a token for a request
     */
    private consumeToken(): boolean {
        this.refillTokens();

        if (this.state.tokens > 0) {
            this.state.tokens--;
            return true;
        }

        return false;
    }

    /**
     * Process queued requests
     */
    private async processQueue(): Promise<void> {
        if (this.processingQueue || this.queue.length === 0) {
            return;
        }

        this.processingQueue = true;

        while (this.queue.length > 0 && this.canProceed()) {
            const request = this.queue.shift();
            if (request) {
                this.consumeToken();
                request();
            }
        }

        this.processingQueue = false;

        // Continue processing if there are still items in queue
        if (this.queue.length > 0) {
            setTimeout(() => this.processQueue(), this.config.refillInterval);
        }
    }

    /**
     * Attempt to execute a request immediately or queue it
     * @param fn Function to execute when rate limit allows
     * @returns Promise that resolves with the function's result
     */
    async execute<T>(fn: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            const executeRequest = async () => {
                try {
                    const result = await fn();
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            };

            if (this.consumeToken()) {
                // Token available, execute immediately
                executeRequest();
            } else {
                // No tokens, add to queue
                this.queue.push(executeRequest);
                this.processQueue();
            }
        });
    }

    /**
     * Check if request would be rate limited
     */
    wouldBeRateLimited(): boolean {
        this.refillTokens();
        return this.state.tokens === 0;
    }

    /**
     * Get current state for debugging
     */
    getState(): {
        availableTokens: number;
        maxTokens: number;
        queuedRequests: number;
        timeUntilNextRefill: number;
    } {
        this.refillTokens();
        const now = Date.now();
        const timeSinceLastRefill = now - this.state.lastRefill;
        const timeUntilNextRefill = this.config.refillInterval - timeSinceLastRefill;

        return {
            availableTokens: this.state.tokens,
            maxTokens: this.config.maxTokens,
            queuedRequests: this.queue.length,
            timeUntilNextRefill: Math.max(0, timeUntilNextRefill),
        };
    }

    /**
     * Reset the rate limiter to initial state
     */
    reset(): void {
        this.state = {
            tokens: this.config.maxTokens,
            lastRefill: Date.now(),
        };
        this.queue = [];
    }
}

/**
 * Rate limiter manager for multiple endpoints
 */
export class RateLimiterManager {
    private limiters: Map<string, RateLimiter> = new Map();
    private defaultConfig: RateLimitConfig = {
        maxTokens: 10,
        refillRate: 2, // 2 tokens per second
        refillInterval: 1000,
    };

    /**
     * Create or get a rate limiter for an endpoint
     */
    private getLimiter(endpoint: string, config?: RateLimitConfig): RateLimiter {
        if (!this.limiters.has(endpoint)) {
            this.limiters.set(endpoint, new RateLimiter(config || this.defaultConfig));
        }
        return this.limiters.get(endpoint)!;
    }

    /**
     * Execute a request with rate limiting for a specific endpoint
     */
    async execute<T>(endpoint: string, fn: () => Promise<T>, config?: RateLimitConfig): Promise<T> {
        const limiter = this.getLimiter(endpoint, config);
        return limiter.execute(fn);
    }

    /**
     * Check if an endpoint would be rate limited
     */
    wouldBeRateLimited(endpoint: string): boolean {
        const limiter = this.limiters.get(endpoint);
        return limiter ? limiter.wouldBeRateLimited() : false;
    }

    /**
     * Get state for all endpoints
     */
    getAllStates(): Record<string, ReturnType<RateLimiter['getState']>> {
        const states: Record<string, ReturnType<RateLimiter['getState']>> = {};
        this.limiters.forEach((limiter, endpoint) => {
            states[endpoint] = limiter.getState();
        });
        return states;
    }

    /**
     * Reset all rate limiters
     */
    resetAll(): void {
        this.limiters.forEach((limiter) => limiter.reset());
    }

    /**
     * Reset specific endpoint
     */
    reset(endpoint: string): void {
        this.limiters.get(endpoint)?.reset();
    }
}

// Export singleton instance
export const rateLimiterManager = new RateLimiterManager();
