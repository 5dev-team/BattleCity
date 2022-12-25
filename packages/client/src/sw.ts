export type {}
const sw = self as ServiceWorkerGlobalScope & typeof globalThis

const CACHE_NAME = 'my-pwa-cache-v1'
  // write path manually after build from dist/
const urlsToCache = [
  '/',
  '/src/main.tsx',
  '/src/app.tsx',
  '/assets/'
  
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
