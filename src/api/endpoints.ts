/**
 * API Endpoints Configuration
 * Centralized configuration for all API endpoints
 */

export const ENDPOINTS = {
    CONTACT: {
        SUBMIT: '/contact',
    },
    PORTFOLIO: {
        LIST: '/portfolio',
        DETAILS: (id: string) => `/portfolio/${id}`,
    },
    SERVICES: {
        LIST: '/services',
        DETAILS: (id: string) => `/services/${id}`,
    },
    TEAM: {
        LIST: '/team',
    },
    ANALYTICS: {
        EVENT: '/analytics/event',
        WEB_VITALS: '/analytics/web-vitals',
    },
} as const;
