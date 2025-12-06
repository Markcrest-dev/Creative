/**
 * Analytics Service
 * Centralized service for tracking user events and behavior
 */

import { config } from '../config/env';
import { logger } from './logger';

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp?: number;
}

interface AnalyticsConfig {
  enabled: boolean;
  debug: boolean;
  endpoint?: string;
}

class Analytics {
  private config: AnalyticsConfig;
  private queue: AnalyticsEvent[] = [];
  private isInitialized = false;

  constructor() {
    this.config = {
      enabled: config.enableAnalytics,
      debug: config.isDevelopment,
      endpoint: `${config.apiBaseUrl}/analytics/events`,
    };
  }

  /**
   * Initialize analytics service
   */
  init(): void {
    if (this.isInitialized) {
      logger.warn('Analytics already initialized');
      return;
    }

    this.isInitialized = true;

    // Process any queued events
    this.processQueue();

    // Set up page view tracking
    this.trackPageView();

    // Set up visibility change tracking
    this.setupVisibilityTracking();

    logger.info('Analytics initialized', { enabled: this.config.enabled });
  }

  /**
   * Track a custom event
   */
  trackEvent(event: AnalyticsEvent): void {
    const enrichedEvent: AnalyticsEvent = {
      ...event,
      timestamp: event.timestamp || Date.now(),
      properties: {
        ...event.properties,
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      },
    };

    if (!this.config.enabled) {
      if (this.config.debug) {
        logger.debug('[Analytics] Event (disabled):', enrichedEvent);
      }
      return;
    }

    if (!this.isInitialized) {
      // Queue event if not initialized yet
      this.queue.push(enrichedEvent);
      return;
    }

    this.sendEvent(enrichedEvent);
  }

  /**
   * Track page view
   */
  trackPageView(url?: string): void {
    this.trackEvent({
      name: 'page_view',
      properties: {
        page: url || window.location.pathname,
        title: document.title,
      },
    });
  }

  /**
   * Track user interaction
   */
  trackClick(element: string, properties?: Record<string, unknown>): void {
    this.trackEvent({
      name: 'click',
      properties: {
        element,
        ...properties,
      },
    });
  }

  /**
   * Track form submission
   */
  trackFormSubmit(formName: string, success: boolean, properties?: Record<string, unknown>): void {
    this.trackEvent({
      name: 'form_submit',
      properties: {
        form: formName,
        success,
        ...properties,
      },
    });
  }

  /**
   * Track user errors
   */
  trackError(error: Error, context?: string): void {
    this.trackEvent({
      name: 'error',
      properties: {
        message: error.message,
        stack: error.stack,
        context,
      },
    });
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metric: string, value: number, unit: string = 'ms'): void {
    this.trackEvent({
      name: 'performance',
      properties: {
        metric,
        value,
        unit,
      },
    });
  }

  /**
   * Track user timing
   */
  trackTiming(category: string, variable: string, time: number): void {
    this.trackEvent({
      name: 'timing',
      properties: {
        category,
        variable,
        time,
      },
    });
  }

  /**
   * Send event to analytics endpoint
   */
  private async sendEvent(event: AnalyticsEvent): Promise<void> {
    try {
      if (this.config.debug) {
        logger.debug('[Analytics] Sending event:', event);
      }

      const response = await fetch(this.config.endpoint!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error(`Analytics request failed: ${response.status}`);
      }

      if (this.config.debug) {
        logger.debug('[Analytics] Event sent successfully');
      }
    } catch (error) {
      logger.error('Failed to send analytics event', error);

      // Re-queue the event for retry
      if (this.queue.length < 100) {
        // Limit queue size
        this.queue.push(event);
      }
    }
  }

  /**
   * Process queued events
   */
  private processQueue(): void {
    if (this.queue.length === 0) return;

    logger.info(`Processing ${this.queue.length} queued analytics events`);

    const eventsToProcess = [...this.queue];
    this.queue = [];

    eventsToProcess.forEach((event) => this.sendEvent(event));
  }

  /**
   * Set up visibility change tracking
   */
  private setupVisibilityTracking(): void {
    let visibilityStartTime = Date.now();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        const timeSpent = Date.now() - visibilityStartTime;
        this.trackTiming('engagement', 'time_on_page', timeSpent);
      } else {
        visibilityStartTime = Date.now();
      }
    });
  }

  /**
   * Flush all pending events
   */
  flush(): void {
    this.processQueue();
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  // Initialize after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => analytics.init());
  } else {
    analytics.init();
  }
}
