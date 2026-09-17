const CACHE = 'aybuben-af41823024';
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./fonts/fonts.css", "./icons/icon-180.png", "./icons/icon-192.png", "./icons/icon-512.png", "./fonts/noto-sans-armenian-normal-400-armenian.woff2", "./fonts/noto-sans-armenian-normal-400-latin.woff2", "./fonts/noto-sans-armenian-normal-600-armenian.woff2", "./fonts/noto-sans-armenian-normal-600-latin.woff2", "./fonts/noto-sans-normal-400-cyrillic.woff2", "./fonts/noto-sans-normal-400-latin.woff2", "./fonts/noto-sans-normal-600-cyrillic.woff2", "./fonts/noto-sans-normal-600-latin.woff2", "./fonts/noto-serif-armenian-normal-100-900-armenian.woff2", "./fonts/noto-serif-armenian-normal-100-900-latin.woff2", "./fonts/noto-serif-italic-100-900-cyrillic.woff2", "./fonts/noto-serif-italic-100-900-latin.woff2", "./fonts/noto-serif-normal-100-900-cyrillic.woff2", "./fonts/noto-serif-normal-100-900-latin.woff2", "./propisi/urok-1.pdf", "./propisi/urok-2.pdf", "./propisi/urok-3.pdf", "./propisi/urok-4.pdf", "./propisi/urok-5.pdf", "./propisi/urok-6.pdf", "./propisi/urok-7.pdf"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {   // свежая версия, когда есть сеть; без сети — из кэша
    e.respondWith(fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put('./index.html', copy));
      return res;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
});
