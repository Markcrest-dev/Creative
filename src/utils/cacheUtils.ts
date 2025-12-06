interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

interface CacheOptions {
  ttl?: number; // Default TTL in milliseconds
  storage?: 'memory' | 'localStorage' | 'both';
}

class CacheManager {
  private memoryCache: Map<string, CacheEntry<unknown>> = new Map();
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutes

  /**
   * Generate a cache key from a string or object
   */
  generateKey(input: string | Record<string, unknown>): string {
    if (typeof input === 'string') {
      return input;
    }
    return JSON.stringify(input);
  }

  /**
   * Check if a cache entry is still fresh
   */
  isFresh(entry: CacheEntry<unknown>): boolean {
    const age = Date.now() - entry.timestamp;
    return age < entry.ttl;
  }

  /**
   * Get data from cache
   */
  get<T>(key: string, options: CacheOptions = {}): T | null {
    const storage = options.storage || 'both';

    // Try memory cache first (fastest)
    if (storage === 'memory' || storage === 'both') {
      const memEntry = this.memoryCache.get(key);
      if (memEntry && this.isFresh(memEntry)) {
        return memEntry.data as T;
      }
    }

    // Try localStorage (persistent)
    if (storage === 'localStorage' || storage === 'both') {
      try {
        const stored = localStorage.getItem(`cache_${key}`);
        if (stored) {
          const entry: CacheEntry<T> = JSON.parse(stored);
          if (this.isFresh(entry)) {
            // Restore to memory cache for faster subsequent access
            this.memoryCache.set(key, entry);
            return entry.data;
          } else {
            // Clean up expired entry
            localStorage.removeItem(`cache_${key}`);
          }
        }
      } catch (error) {
        console.warn('Error reading from localStorage:', error);
      }
    }

    return null;
  }

  /**
   * Set data in cache
   */
  set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const ttl = options.ttl || this.defaultTTL;
    const storage = options.storage || 'both';

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };

    // Store in memory
    if (storage === 'memory' || storage === 'both') {
      this.memoryCache.set(key, entry);
    }

    // Store in localStorage
    if (storage === 'localStorage' || storage === 'both') {
      try {
        localStorage.setItem(`cache_${key}`, JSON.stringify(entry));
      } catch (error) {
        console.warn('Error writing to localStorage:', error);
      }
    }
  }

  /**
   * Remove specific cache entry
   */
  remove(key: string, options: CacheOptions = {}): void {
    const storage = options.storage || 'both';

    if (storage === 'memory' || storage === 'both') {
      this.memoryCache.delete(key);
    }

    if (storage === 'localStorage' || storage === 'both') {
      try {
        localStorage.removeItem(`cache_${key}`);
      } catch (error) {
        console.warn('Error removing from localStorage:', error);
      }
    }
  }

  /**
   * Clear all cache entries
   */
  clearAll(options: CacheOptions = {}): void {
    const storage = options.storage || 'both';

    if (storage === 'memory' || storage === 'both') {
      this.memoryCache.clear();
    }

    if (storage === 'localStorage' || storage === 'both') {
      try {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.startsWith('cache_')) {
            localStorage.removeItem(key);
          }
        });
      } catch (error) {
        console.warn('Error clearing localStorage:', error);
      }
    }
  }

  /**
   * Clear expired cache entries
   */
  clearExpired(): void {
    // Clear expired memory cache
    this.memoryCache.forEach((entry, key) => {
      if (!this.isFresh(entry)) {
        this.memoryCache.delete(key);
      }
    });

    // Clear expired localStorage
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith('cache_')) {
          const stored = localStorage.getItem(key);
          if (stored) {
            try {
              const entry: CacheEntry<unknown> = JSON.parse(stored);
              if (!this.isFresh(entry)) {
                localStorage.removeItem(key);
              }
            } catch {
              // Invalid entry, remove it
              localStorage.removeItem(key);
            }
          }
        }
      });
    } catch (error) {
      console.warn('Error clearing expired localStorage entries:', error);
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      memoryCacheSize: this.memoryCache.size,
      localStorageKeys: Object.keys(localStorage).filter((k) => k.startsWith('cache_')).length,
    };
  }
}

// Export singleton instance
export const cacheManager = new CacheManager();

// Periodically clean up expired entries (every 5 minutes)
if (typeof window !== 'undefined') {
  setInterval(
    () => {
      cacheManager.clearExpired();
    },
    5 * 60 * 1000
  );
}
