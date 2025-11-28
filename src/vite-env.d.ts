/// <reference types="vite/client" />

interface ImportMetaEnv {
    // API Configuration
    readonly VITE_API_BASE_URL?: string;
    readonly VITE_CONTACT_FORM_ENDPOINT?: string;
    readonly VITE_MOCK_API?: string;

    // Google Maps
    readonly VITE_GOOGLE_MAPS_API_KEY?: string;

    // Feature Flags
    readonly VITE_ENABLE_ANALYTICS?: string;
    readonly VITE_ENABLE_3D_ANIMATIONS?: string;
    readonly VITE_ENABLE_PERFORMANCE_MONITORING?: string;

    // Application Settings
    readonly VITE_APP_NAME?: string;
    readonly VITE_APP_VERSION?: string;
    readonly VITE_CONTACT_EMAIL?: string;
    readonly VITE_CONTACT_PHONE?: string;

    // Development
    readonly VITE_DEBUG_MODE?: string;
    readonly VITE_LOG_LEVEL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
