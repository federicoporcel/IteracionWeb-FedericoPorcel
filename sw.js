

const CACHE_NAME = 'Version 1';
const urlsToCache= [
  '/',
  '/index.html',
  '/snake.html',
]

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});
