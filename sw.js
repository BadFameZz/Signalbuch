const CACHE_NAME = 'signalbuch-v2'; // Version erhöht für Update
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://unpkg.com/feather-icons'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
  // Neuen Service Worker sofort aktivieren
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Alte Caches löschen
          if (cacheName !== CACHE_NAME) {
            console.log('Lösche alten Cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Sofort Kontrolle übernehmen
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    // Immer erst vom Netzwerk versuchen, dann Cache als Fallback
    fetch(event.request)
      .then(response => {
        // Response klonen, da sie nur einmal verwendet werden kann
        const responseClone = response.clone();

        // Im Cache speichern
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });

        return response;
      })
      .catch(() => {
        // Bei Fehler (z.B. offline) aus Cache laden
        return caches.match(event.request);
      })
  );
});
