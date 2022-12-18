export type {}
declare const self: ServiceWorkerGlobalScope

const CACHE_NAME = 'my-pwa-cache-v1'
const urlsToCache = [
  '/',
  '/src/main.tsx',
  '/src/app.tsx',
  '/assets/'
  
]

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install')
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME)
    console.log(cache)
    console.log('[Service Worker] Caching all: app shell and content')
    await cache.addAll(urlsToCache)
  })())
})

// self.addEventListener('install', function(event) {
//   console.log('installed SW')
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//     .then(function(cache) {
//       // Open a cache and cache our files
//       console.log(cache.addAll(urlsToCache))
//       return cache.addAll(urlsToCache)
//     })
//   )
// })

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
