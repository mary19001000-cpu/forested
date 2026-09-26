const CACHE_NAME = 'forest-shield-v5.0.0';
const MAX_CACHE_ITEMS = 200;
const PRECACHE = [
  './',
  './index.html',
  './observer.html',
  './driver.html',
  './ops.html',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

const RUNTIME = /unpkg\.com|gstatic\.com|openstreetmap\.org|open-meteo\.com|firms\.modaps\.eosdis\.nasa\.gov|arcgisonline\.com|basemaps\.cartocdn\.com|opentopomap\.org|nominatim\.openstreetmap\.org|router\.project-osrm\.org|jsdelivr\.net/;

async function trimCache(cache) {
  try {
    const keys = await cache.keys();
    if (keys.length > MAX_CACHE_ITEMS) {
      await cache.delete(keys[0]);
    }
  } catch(e) {}
}

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        PRECACHE.map(url =>
          cache.add(url).catch(err => {
            console.warn('[SW] Precache failed for:', url, err.message);
          })
        )
      );
    }).catch(() => {})
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  if (url.hostname.includes('firestore') ||
      (url.hostname.includes('googleapis.com') && !url.hostname.includes('gstatic'))) {
    return;
  }

  if (url.origin === location.origin || RUNTIME.test(url.hostname)) {
    e.respondWith(
      caches.match(e.request).then(hit => {
        if (hit) return hit;
        return fetch(e.request).then(res => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(e.request, copy).then(() => trimCache(cache));
            }).catch(() => {});
          }
          return res;
        }).catch(() => {
          if (e.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
      })
    );
  }
});