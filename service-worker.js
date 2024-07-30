const CACHE_NAME = 'driva-cache-v1';
const urlsToCache = [
  'https://scoilcax.github.io/Navigo-WebApp/webapp/',
  'https://scoilcax.github.io/Navigo-WebApp/webapp/index.html',
  'https://scoilcax.github.io/Navigo-WebApp/webapp/style.css',
  'https://scoilcax.github.io/Navigo-WebApp/manifest.json',
  'https://scoilcax.github.io/Navigo-WebApp/webapp/img/icons/icon-192x192.png',
  'https://scoilcax.github.io/Navigo-WebApp/webapp/img/icons/icon-512x512.png',
  'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css',
  'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js',
  'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

var firstMove;

window.addEventListener('touchstart', function (e) {
    firstMove = true;
});

window.addEventListener('touchmove', function (e) {
    if (firstMove) {
        e.preventDefault();

        firstMove = false;
    }
});
