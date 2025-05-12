
// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "V16";

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
  console.log("Agregó la primer URL");
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(urlToCache2))
      
  );
  console.log("Agregó la segunda URL");
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
        console.log("Hizo el Try");
        return networkResp;
      } catch (error) {

        var cache = await caches.open(CACHE);
        var cachedResp = await cache.match(urlToCache);
        
        cache = await caches.open(CACHE);
         cachedResp = await cache.match(urlToCache2);
        return cachedResp;
      }
    })());
  }
});