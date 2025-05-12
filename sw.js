
// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "V14";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const urlsToCache= [
  '/',
  '/index.html',
  '/snake.html',
]

const urlToCache='index.html';
const urlToCache2='snake.html';
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(urlToCache))
  );
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(urlToCache2))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(urlToCache);
        
        cache = await caches.open(CACHE);
         cachedResp = await cache.match(urlToCache2);
        return cachedResp;
      }
    })());
  }
});