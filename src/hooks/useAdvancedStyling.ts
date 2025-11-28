import { useState, useEffect, useCallback } from 'react';

// Custom hook for advanced styling techniques
export const useAdvancedStyling = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  const [customColors, setCustomColors] = useState<Record<string, string>>({});
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Apply theme to document
  useEffect(() => {
    const applyTheme = (selectedTheme: 'light' | 'dark' | 'auto') => {
      const isDark =
        selectedTheme === 'dark' ||
        (selectedTheme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme(theme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'auto') {
        applyTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  // Set CSS variables for custom colors
  useEffect(() => {
    const root = document.documentElement;

    Object.entries(customColors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [customColors]);

  // Toggle animations based on user preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateAnimations = () => {
      setAnimationsEnabled(!mediaQuery.matches);
    };

    updateAnimations();
    mediaQuery.addEventListener('change', updateAnimations);

    return () => {
      mediaQuery.removeEventListener('change', updateAnimations);
    };
  }, []);

  // Set a custom color
  const setCustomColor = useCallback((name: string, value: string) => {
    setCustomColors((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Remove a custom color
  const removeCustomColor = useCallback((name: string) => {
    setCustomColors((prev) => {
      const newColors = { ...prev };
      delete newColors[name];
      return newColors;
    });
  }, []);

  // Get CSS variable value
  const getCssVariable = useCallback((name: string): string => {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
  }, []);

  // Apply gradient background
  const applyGradient = useCallback((elementId: string, colors: string[], angle = 45) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.background = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
    }
  }, []);

  // Apply text gradient
  const applyTextGradient = useCallback((elementId: string, colors: string[], angle = 45) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.background = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
      element.style.webkitBackgroundClip = 'text';
      element.style.webkitTextFillColor = 'transparent';
      element.style.backgroundClip = 'text';
    }
  }, []);

  // Apply CSS filter
  const applyFilter = useCallback((elementId: string, filter: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.filter = filter;
    }
  }, []);

  // Apply CSS transform
  const applyTransform = useCallback((elementId: string, transform: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.transform = transform;
    }
  }, []);

  return {
    theme,
    setTheme,
    customColors,
    setCustomColor,
    removeCustomColor,
    getCssVariable,
    animationsEnabled,
    applyGradient,
    applyTextGradient,
    applyFilter,
    applyTransform,
  };
};
