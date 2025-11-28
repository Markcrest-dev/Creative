/**
 * Environment Configuration
 * Centralized configuration for environment variables
 * with type safety and fallback values
 */

interface Config {
    // API Configuration
    apiBaseUrl: string;
    contactFormEndpoint: string;
    mockApi: boolean;

    // Google Maps
    googleMapsApiKey: string;

    // Feature Flags
    enableAnalytics: boolean;
    enable3DAnimations: boolean;
    enablePerformanceMonitoring: boolean;

    // Application Settings
    appName: string;
    appVersion: string;
    contactEmail: string;
    contactPhone: string;

    // Environment
    isDevelopment: boolean;
    isProduction: boolean;
    debugMode: boolean;
    logLevel: 'info' | 'warn' | 'error' | 'debug';
}

/**
 * Get environment variable with fallback
 */
const getEnvVar = (key: string, fallback: string = ''): string => {
    return import.meta.env[key] || fallback;
};

/**
 * Get boolean environment variable
 */
const getBoolEnvVar = (key: string, fallback: boolean = false): boolean => {
    const value = import.meta.env[key];
    if (value === undefined) return fallback;
    return value === 'true' || value === '1';
};

/**
 * Application configuration object
 * All environment variables are accessed through this object
 */
export const config: Config = {
    // API Configuration
    apiBaseUrl: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3000/api'),
    contactFormEndpoint: getEnvVar('VITE_CONTACT_FORM_ENDPOINT', '/api/contact'),
    mockApi: getBoolEnvVar('VITE_MOCK_API', true),

    // Google Maps
    googleMapsApiKey: getEnvVar('VITE_GOOGLE_MAPS_API_KEY', ''),

    // Feature Flags
    enableAnalytics: getBoolEnvVar('VITE_ENABLE_ANALYTICS', false),
    enable3DAnimations: getBoolEnvVar('VITE_ENABLE_3D_ANIMATIONS', true),
    enablePerformanceMonitoring: getBoolEnvVar('VITE_ENABLE_PERFORMANCE_MONITORING', false),

    // Application Settings
    appName: getEnvVar('VITE_APP_NAME', 'Creative★ Agency'),
    appVersion: getEnvVar('VITE_APP_VERSION', '1.0.0'),
    contactEmail: getEnvVar('VITE_CONTACT_EMAIL', 'hello@creative-star.com'),
    contactPhone: getEnvVar('VITE_CONTACT_PHONE', '+1 (555) 123-4567'),

    // Environment
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    debugMode: getBoolEnvVar('VITE_DEBUG_MODE', false),
    logLevel: (getEnvVar('VITE_LOG_LEVEL', 'error') as Config['logLevel']),
};

/**
 * Validate critical configuration on app start
 */
export const validateConfig = (): void => {
    const errors: string[] = [];

    // Add validation rules for production
    if (config.isProduction) {
        if (!config.googleMapsApiKey) {
            errors.push('VITE_GOOGLE_MAPS_API_KEY is required in production');
        }
        if (config.mockApi) {
            errors.push('VITE_MOCK_API should be false in production');
        }
    }

    if (errors.length > 0) {
        console.error('Configuration errors:', errors);
        throw new Error(`Configuration validation failed: ${errors.join(', ')}`);
    }
};

// Log configuration in development
if (config.isDevelopment && config.debugMode) {
    console.log('App Configuration:', {
        ...config,
        googleMapsApiKey: config.googleMapsApiKey ? '***' : 'not set',
    });
}
