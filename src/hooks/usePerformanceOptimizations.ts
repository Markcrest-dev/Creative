import { useState, useEffect, useCallback, useRef } from 'react';

// Type for timeout reference
type Timeout = ReturnType<typeof setTimeout>;

// Custom hook for performance optimizations
export const usePerformanceOptimizations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Check if user prefers reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, []);

  // Track user interactions
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasInteracted(true);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  // Memoized function for expensive calculations
  const memoizedCalculation = useCallback((callback: () => any) => {
    return callback();
  }, []);

  // Throttled function for performance
  const useThrottle = (callback: (...args: any[]) => void, delay: number) => {
    const lastCall = useRef(0);
    const timeout = useRef<Timeout | null>(null);

    return useCallback(
      (...args: any[]) => {
        const now = Date.now();

        if (timeout.current) {
          clearTimeout(timeout.current);
        }

        if (now - lastCall.current >= delay) {
          lastCall.current = now;
          callback(...args);
        } else {
          timeout.current = setTimeout(
            () => {
              lastCall.current = Date.now();
              callback(...args);
            },
            delay - (now - lastCall.current)
          );
        }
      },
      [callback, delay]
    );
  };

  // Debounced function for performance
  const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timeout = useRef<Timeout | null>(null);

    return useCallback(
      (...args: any[]) => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => {
          callback(...args);
        }, delay);
      },
      [callback, delay]
    );
  };

  return {
    isVisible,
    hasInteracted,
    prefersReducedMotion,
    elementRef,
    memoizedCalculation,
    useThrottle,
    useDebounce,
  };
};
