// public/service-worker.js

// Встановлення Service Worker
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  self.skipWaiting();
});

// Активація Service Worker
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  clients.claim();
});

// Кешування запитів (Workbox вставить свої кеш-стратегії нижче)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// Цей рядок буде замінений Workbox'ом при білді
// workbox-webpack-plugin вставить сюди свою логіку при build
