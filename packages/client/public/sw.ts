export type {}
declare const self: ServiceWorkerGlobalScope

const CACHE_NAME = 'my-pwa-cache-v1'
const urlsToCache = [
  '/index.html',
  '/src/main.tsx'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      // Open a cache and cache our files
      console.log(cache.addAll(urlsToCache))
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('activate', function(event) {
  // активация
  console.log('activate', event)
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // ищем запрашиваемый ресурс в хранилище кэша
    caches.match(event.request).then(function(cachedResponse) {

      // выдаём кэш, если он есть
      if (cachedResponse) {
        return cachedResponse
      }
      // иначе запрашиваем из сети как обычно
      return fetch(event.request)
    })
  )
})
