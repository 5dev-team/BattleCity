export type {}

// temp hack
const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis

const CACHE_NAME = 'my-pwa-cache-v1'
  // write path manually after build from dist/
const urlsToCache = [
  '/index.html',
  '/index.js',
  '/vite.svg',
  '/assets/avatarPlaceholder.png',
  '/assets/battleCityLogo.png',
  '/assets/index.css',
  '/assets/arrow.svg',
  '/assets/sprite_1.png',
]

sw.addEventListener('install', (e) => {
  console.log('[Service Worker] Install')
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME)
    await cache.addAll(urlsToCache)
  })())
})

sw.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      if (cachedResponse) {
        return cachedResponse
      }
      return fetch(event.request)
    })
  )
})
