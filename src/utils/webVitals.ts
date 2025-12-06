/**
 * Web Vitals Performance Monitoring
 * Tracks Core Web Vitals and reports to analytics
 */

import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';
import { logger } from '../services/logger';
import { config } from '../config/env';

/**
 * Report web vitals metric
 * @param metric The web vital metric to report.
 */
const reportMetric = (metric: Metric) => {
  // Log in development
  if (config.isDevelopment) {
    logger.performance(metric.name, metric.value, 'ms');
  }

  // Send to analytics in production
  if (config.isProduction && config.enablePerformanceMonitoring) {
    sendToAnalytics(metric);
  }
};

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

/**
 * Send metric to analytics service
 * Integrate with Google Analytics, DataDog, New Relic, etc.
 * @param metric The performance metric to send.
 */
const sendToAnalytics = (metric: Metric) => {
  // Example: Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Example: Custom analytics endpoint
  if (config.enableAnalytics) {
    fetch(`${config.apiBaseUrl}/analytics/vitals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        id: metric.id,
        timestamp: Date.now(),
      }),
    }).catch((error) => {
      logger.error('Failed to send web vitals', error);
    });
  }
};

/**
 * Initialize web vitals tracking
 * Call this once when the app starts
 */
export const initWebVitals = () => {
  if (typeof window === 'undefined') return;

  onCLS(reportMetric); // Cumulative Layout Shift
  onINP(reportMetric); // Interaction to Next Paint (replaces FID)
  onFCP(reportMetric); // First Contentful Paint
  onLCP(reportMetric); // Largest Contentful Paint
  onTTFB(reportMetric); // Time to First Byte

  logger.info('Web Vitals tracking initialized');
};

/**
 * Get performance marks for custom measurements
 * @param markName The name of the performance mark to create.
 */
export const measurePerformance = (markName: string) => {
  if (typeof window === 'undefined' || !window.performance) return;

  try {
    window.performance.mark(markName);
  } catch (error) {
    logger.error('Failed to create performance mark', error);
  }
};

/**
 * Measure duration between two marks
 * @param name The name for the performance measure.
 * @param startMark The name of the starting performance mark.
 * @param endMark The name of the ending performance mark.
 */
export const measureDuration = (name: string, startMark: string, endMark: string) => {
  if (typeof window === 'undefined' || !window.performance) return;

  try {
    window.performance.measure(name, startMark, endMark);
    const measure = window.performance.getEntriesByName(name)[0];

    if (measure) {
      logger.performance(name, measure.duration);

      // Clean up
      window.performance.clearMarks(startMark);
      window.performance.clearMarks(endMark);
      window.performance.clearMeasures(name);
    }
  } catch (error) {
    logger.error('Failed to measure performance', error);
  }
};

/**
 * Get navigation timing information
 */
export const getNavigationTiming = () => {
  if (typeof window === 'undefined' || !window.performance) return null;

  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  const connectTime = perfData.responseEnd - perfData.requestStart;
  const renderTime = perfData.domComplete - perfData.domLoading;

  return {
    pageLoadTime,
    connectTime,
    renderTime,
    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
    timeToFirstByte: perfData.responseStart - perfData.navigationStart,
  };
};
