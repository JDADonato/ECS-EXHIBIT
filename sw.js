/**
 * Eloquente Catering System (ECS) — Capstone Exhibit Offline Service Worker
 * Pre-caches exhibit assets for resilient offline exhibition booth demos.
 */

const CACHE_NAME = 'ecs-exhibit-v5';
const PRECACHE_URLS = [
  './',
  './index.html',
  './css/style.css?v=2.6',
  './js/app.js?v=2.6',
  './manifest.json',
  './assets/favicon.svg',
  './assets/favicon.png',
  './assets/favicon-32x32.png',
  './assets/favicon-64x64.png',
  './assets/apple-touch-icon.png',
  './assets/4front-logo.png',
  './assets/4front-logo-dark.png',
  './assets/ecs-logo.png',
  './assets/ecs-logo-hero.png',
  './assets/hero-catering.png',
  './assets/team-photo-square.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
      .catch((err) => console.warn('[PWA SW] Precache error:', err))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          // Cache on the fly for subsequent offline visits
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // If offline and requesting navigation, return index.html
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
