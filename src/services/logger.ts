/**
 * Logger Service
 * Centralized logging with different levels and production monitoring integration
 */

import { config } from '../config/env';

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: Date;
  context?: string;
}

class Logger {
  private isDevelopment = config.isDevelopment;
  private debugMode = config.debugMode;
  private logLevel = config.logLevel;

  /**
   * Determine if a log should be output based on current log level
   */
  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  }

  /**
   * Main logging method
   */
  private log(level: LogLevel, message: string, data?: any, context?: string): void {
    if (!this.shouldLog(level)) return;

    const logEntry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date(),
      context,
    };

    // Console output in development
    if (this.isDevelopment || this.debugMode) {
      const contextPrefix = context ? `[${context}]` : '';
      const fullMessage = `${contextPrefix} ${message}`;

      switch (level) {
        case 'debug':
          console.debug(fullMessage, data || '');
          break;
        case 'info':
          console.info(fullMessage, data || '');
          break;
        case 'warn':
          console.warn(fullMessage, data || '');
          break;
        case 'error':
          console.error(fullMessage, data || '');
          break;
      }
    }

    // Send to monitoring service in production
    if (config.isProduction && level === 'error') {
      this.sendToMonitoring(logEntry);
    }

    // Store in local storage for debugging (last 50 logs)
    if (this.debugMode) {
      this.storeLog(logEntry);
    }
  }

  /**
   * Send error logs to monitoring service
   * Integrate with Sentry, DataDog, LogRocket, etc.
   */
  private sendToMonitoring(logEntry: LogEntry): void {
    if (!config.enablePerformanceMonitoring) return;

    try {
      // TODO: Integrate with your monitoring service
      // Example: Sentry.captureException(logEntry);
      // Example: LogRocket.log(logEntry);

      // For now, store it for later processing
      console.error('[MONITORING]', logEntry);
    } catch (error) {
      // Fail silently to avoid breaking the app
      console.error('Failed to send log to monitoring:', error);
    }
  }

  /**
   * Store logs in localStorage for debugging
   */
  private storeLog(logEntry: LogEntry): void {
    try {
      const storedLogs = localStorage.getItem('app_logs');
      const logs: LogEntry[] = storedLogs ? JSON.parse(storedLogs) : [];

      logs.push(logEntry);

      // Keep only last 50 logs
      if (logs.length > 50) {
        logs.shift();
      }

      localStorage.setItem('app_logs', JSON.stringify(logs));
    } catch (error) {
      // Fail silently if localStorage is not available
    }
  }

  /**
   * Get stored logs from localStorage
   */
  public getStoredLogs(): LogEntry[] {
    try {
      const storedLogs = localStorage.getItem('app_logs');
      return storedLogs ? JSON.parse(storedLogs) : [];
    } catch (error) {
      return [];
    }
  }

  /**
   * Clear stored logs
   */
  public clearLogs(): void {
    try {
      localStorage.removeItem('app_logs');
    } catch (error) {
      // Fail silently
    }
  }

  /**
   * Public logging methods
   */
  public debug(message: string, data?: any, context?: string): void {
    this.log('debug', message, data, context);
  }

  public info(message: string, data?: any, context?: string): void {
    this.log('info', message, data, context);
  }

  public warn(message: string, data?: any, context?: string): void {
    this.log('warn', message, data, context);
  }

  public error(message: string, data?: any, context?: string): void {
    this.log('error', message, data, context);
  }

  /**
   * Log API calls
   */
  public apiCall(method: string, url: string, data?: any): void {
    this.debug(`API ${method} ${url}`, data, 'API');
  }

  /**
   * Log API errors
   */
  public apiError(method: string, url: string, error: any): void {
    this.error(`API ${method} ${url} failed`, error, 'API');
  }

  /**
   * Log performance metrics
   */
  public performance(metric: string, value: number, unit: string = 'ms'): void {
    this.info(`${metric}: ${value}${unit}`, { metric, value, unit }, 'PERFORMANCE');
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for testing
export { Logger };
