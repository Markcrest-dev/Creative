/* eslint-env serviceworker */

const CACHE_VERSION = 'v1';
const CACHE_NAME = `creative-agency-${CACHE_VERSION}`;

// Assets to cache on install (app shell)
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/favicon.svg',
];

// Cache strategies
const CACHE_FIRST_PATHS = [/\.(?:js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|webp|ico)$/];
const NETWORK_FIRST_PATHS = [/\.html$/];

/**
 * Install event - cache static assets
 */
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(STATIC_ASSETS);
        }).then(() => {
            // Force the waiting service worker to become the active service worker
            return self.skipWaiting();
        })
    );
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[ServiceWorker] Removing old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Claim clients immediately
            return self.clients.claim();
        })
    );
});

/**
 * Fetch event - serve from cache or network based on strategy
 */
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }

    // Determine strategy based on request path
    if (shouldUseCacheFirst(request)) {
        event.respondWith(cacheFirstStrategy(request));
    } else if (shouldUseNetworkFirst(request)) {
        event.respondWith(networkFirstStrategy(request));
    } else {
        // Default: Stale-While-Revalidate
        event.respondWith(staleWhileRevalidateStrategy(request));
    }
});

/**
 * Check if request should use cache-first strategy
 */
function shouldUseCacheFirst(request) {
    const url = new URL(request.url);
    return CACHE_FIRST_PATHS.some((pattern) => pattern.test(url.pathname));
}

/**
 * Check if request should use network-first strategy
 */
function shouldUseNetworkFirst(request) {
    const url = new URL(request.url);
    return NETWORK_FIRST_PATHS.some((pattern) => pattern.test(url.pathname));
}

/**
 * Cache First Strategy - try cache, fallback to network
 * Best for static assets that rarely change
 */
async function cacheFirstStrategy(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    if (cached) {
        return cached;
    }

    try {
        const response = await fetch(request);
        // Cache successful responses
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        console.error('[ServiceWorker] Fetch failed:', error);
        throw error;
    }
}

/**
 * Network First Strategy - try network, fallback to cache
 * Best for HTML to ensure latest app version
 */
async function networkFirstStrategy(request) {
    const cache = await caches.open(CACHE_NAME);

    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        console.log('[ServiceWorker] Network failed, trying cache');
        const cached = await cache.match(request);
        if (cached) {
            return cached;
        }
        throw error;
    }
}

/**
 * Stale While Revalidate - serve from cache, update in background
 * Best balance of speed and freshness
 */
async function staleWhileRevalidateStrategy(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    // Fetch fresh version in background
    const fetchPromise = fetch(request).then((response) => {
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    }).catch((error) => {
        console.error('[ServiceWorker] Background fetch failed:', error);
    });

    // Return cached version immediately if available
    return cached || fetchPromise;
}

/**
 * Message event - handle messages from clients
 */
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_STATS') {
        caches.open(CACHE_NAME).then((cache) => {
            cache.keys().then((keys) => {
                event.ports[0].postMessage({
                    cacheSize: keys.length,
                    cacheName: CACHE_NAME,
                });
            });
        });
    }
});
