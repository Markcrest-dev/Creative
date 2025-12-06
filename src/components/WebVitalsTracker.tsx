import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';
import { logger } from '../services/logger';
import type { PerformanceMetric } from '../types/components';

/**
 * Format metric for consistent reporting
 */
const formatMetric = (metric: Metric): PerformanceMetric => {
  const thresholds: Record<string, { good: number; poor: number }> = {
    CLS: { good: 0.1, poor: 0.25 },
    INP: { good: 200, poor: 500 },
    LCP: { good: 2500, poor: 4000 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
  };

  const threshold = thresholds[metric.name];
  let rating: 'good' | 'needs-improvement' | 'poor' = 'good';

  if (threshold) {
    if (metric.value > threshold.poor) {
      rating = 'poor';
    } else if (metric.value > threshold.good) {
      rating = 'needs-improvement';
    }
  }

  return {
    name: metric.name,
    value: metric.value,
    rating,
    delta: metric.delta,
    id: metric.id,
  };
};

/**
 * Send metrics to analytics service
 */
const sendToAnalytics = (metric: PerformanceMetric) => {
  // In production, send to your analytics service
  if (import.meta.env.PROD) {
    // Example: Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
};

/**
 * Web Vitals Performance Tracker Component
 * Tracks Core Web Vitals safely inside a React component
 */
export const WebVitalsTracker = () => {
  useEffect(() => {
    // Only track in production or when explicitly enabled
    if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true') {
      try {
        onCLS((metric) => {
          const formatted = formatMetric(metric);
          logger.performance('CLS (Cumulative Layout Shift)', metric.value);
          sendToAnalytics(formatted);
        });

        onINP((metric) => {
          const formatted = formatMetric(metric);
          logger.performance('INP (Interaction to Next Paint)', metric.value, 'ms');
          sendToAnalytics(formatted);
        });

        onFCP((metric) => {
          const formatted = formatMetric(metric);
          logger.performance('FCP (First Contentful Paint)', metric.value, 'ms');
          sendToAnalytics(formatted);
        });

        onLCP((metric) => {
          const formatted = formatMetric(metric);
          logger.performance('LCP (Largest Contentful Paint)', metric.value, 'ms');
          sendToAnalytics(formatted);
        });

        onTTFB((metric) => {
          const formatted = formatMetric(metric);
          logger.performance('TTFB (Time to First Byte)', metric.value, 'ms');
          sendToAnalytics(formatted);
        });

        logger.info('Web Vitals tracking initialized');
      } catch (error) {
        logger.error('Failed to initialize Web Vitals', error);
      }
    }
  }, []);

  return null; // This component doesn't render anything
};
