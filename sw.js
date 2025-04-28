

const CACHE_NAME = 'V5';
const urlsToCache= [
  '/',
  '/index.html',
  '/snake.html',
]

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
