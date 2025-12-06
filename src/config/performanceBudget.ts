/**
 * Performance Budget Configuration
 * Defines thresholds for build size, runtime performance, and web vitals
 */

export interface PerformanceBudget {
  // Build Size Budgets (in KB)
  bundleSize: {
    maxTotalSize: number;
    maxJsSize: number;
    maxCssSize: number;
    maxAssetSize: number;
    warnThreshold: number; // Percentage before hitting max
  };

  // Runtime Performance Budgets
  runtime: {
    // Time to Interactive (ms)
    maxTTI: number;
    // First Contentful Paint (ms)
    maxFCP: number;
    // Largest Contentful Paint (ms)
    maxLCP: number;
    // Total Blocking Time (ms)
    maxTBT: number;
    // Speed Index (ms)
    maxSpeedIndex: number;
  };

  // Core Web Vitals Thresholds
  webVitals: {
    // Cumulative Layout Shift (score)
    maxCLS: number;
    // Interaction to Next Paint (ms)
    maxINP: number;
    // Largest Contentful Paint (ms)
    maxLCP: number;
    // First Contentful Paint (ms)
    maxFCP: number;
    // Time to First Byte (ms)
    maxTTFB: number;
  };

  // Resource Budgets
  resources: {
    maxRequests: number;
    maxImages: number;
    maxScripts: number;
    maxStylesheets: number;
    maxFonts: number;
  };
}

/**
 * Default Performance Budget
 * Based on industry best practices and Google's recommendations
 */
export const performanceBudget: PerformanceBudget = {
  // Build Size Budgets
  bundleSize: {
    maxTotalSize: 1000, // 1MB total (uncompressed)
    maxJsSize: 500, // 500KB JavaScript (uncompressed)
    maxCssSize: 100, // 100KB CSS
    maxAssetSize: 400, // 400KB for images and other assets
    warnThreshold: 80, // Warn at 80% of budget
  },

  // Runtime Performance (Mobile 3G)
  runtime: {
    maxTTI: 3800, // Time to Interactive
    maxFCP: 1800, // First Contentful Paint
    maxLCP: 2500, // Largest Contentful Paint
    maxTBT: 200, // Total Blocking Time
    maxSpeedIndex: 3400, // Speed Index
  },

  // Core Web Vitals (Good thresholds)
  webVitals: {
    maxCLS: 0.1, // Cumulative Layout Shift
    maxINP: 200, // Interaction to Next Paint
    maxLCP: 2500, // Largest Contentful Paint
    maxFCP: 1800, // First Contentful Paint
    maxTTFB: 800, // Time to First Byte
  },

  // Resource Budgets
  resources: {
    maxRequests: 50, // Maximum HTTP requests
    maxImages: 15, // Maximum image files
    maxScripts: 10, // Maximum JavaScript files
    maxStylesheets: 5, // Maximum CSS files
    maxFonts: 3, // Maximum font files
  },
};

/**
 * Check if a metric exceeds the budget
 */
export const exceedsBudget = (
  category: keyof PerformanceBudget,
  metric: string,
  value: number
): { exceeds: boolean; threshold: number; percentage: number } => {
  const budget = performanceBudget[category] as Record<string, number>;
  const maxKey = `max${metric.charAt(0).toUpperCase()}${metric.slice(1)}`;
  const threshold = budget[maxKey];

  if (!threshold) {
    return { exceeds: false, threshold: 0, percentage: 0 };
  }

  const percentage = (value / threshold) * 100;
  return {
    exceeds: value > threshold,
    threshold,
    percentage,
  };
};

/**
 * Get performance budget warnings
 */
export const getBudgetWarnings = (metrics: Record<string, number>): string[] => {
  const warnings: string[] = [];
  const warnThreshold = performanceBudget.bundleSize.warnThreshold;

  Object.entries(metrics).forEach(([key, value]) => {
    // Check bundle size
    const bundleCheck = exceedsBudget('bundleSize', key, value);
    if (bundleCheck.percentage >= warnThreshold) {
      warnings.push(
        `${key}: ${value}KB (${bundleCheck.percentage.toFixed(1)}% of ${bundleCheck.threshold}KB budget)`
      );
    }

    // Check web vitals
    const vitalCheck = exceedsBudget('webVitals', key, value);
    if (vitalCheck.exceeds) {
      warnings.push(
        `${key}: ${value}ms exceeds budget of ${vitalCheck.threshold}ms`
      );
    }
  });

  return warnings;
};

/**
 * Log performance budget status
 */
export const logBudgetStatus = (metrics: Record<string, number>): void => {
  const warnings = getBudgetWarnings(metrics);

  if (warnings.length === 0) {
    console.log('✅ All metrics within performance budget');
  } else {
    console.warn('⚠️ Performance Budget Warnings:');
    warnings.forEach((warning) => console.warn(`  - ${warning}`));
  }
};

export default performanceBudget;
