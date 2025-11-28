import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';
import { logger } from '../services/logger';

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
          logger.performance('CLS (Cumulative Layout Shift)', metric.value);
          sendToAnalytics(metric);
        });

        onINP((metric) => {
          logger.performance('INP (Interaction to Next Paint)', metric.value, 'ms');
          sendToAnalytics(metric);
        });

        onFCP((metric) => {
          logger.performance('FCP (First Contentful Paint)', metric.value, 'ms');
          sendToAnalytics(metric);
        });

        onLCP((metric) => {
          logger.performance('LCP (Largest Contentful Paint)', metric.value, 'ms');
          sendToAnalytics(metric);
        });

        onTTFB((metric) => {
          logger.performance('TTFB (Time to First Byte)', metric.value, 'ms');
          sendToAnalytics(metric);
        });

        logger.info('Web Vitals tracking initialized');
      } catch (error) {
        logger.error('Failed to initialize Web Vitals', error);
      }
    }
  }, []);

  return null; // This component doesn't render anything
};

/**
 * Send metrics to analytics service
 */
const sendToAnalytics = (metric: any) => {
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
