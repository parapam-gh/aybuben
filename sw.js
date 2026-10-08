const CACHE = 'apres-e9df855e79';
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./fonts/fonts.css", "./icons/icon-180.png", "./icons/icon-192.png", "./icons/icon-512.png", "./fonts/noto-sans-armenian-normal-400-armenian.woff2", "./fonts/noto-sans-armenian-normal-400-latin.woff2", "./fonts/noto-sans-armenian-normal-600-armenian.woff2", "./fonts/noto-sans-armenian-normal-600-latin.woff2", "./fonts/noto-sans-normal-400-cyrillic.woff2", "./fonts/noto-sans-normal-400-latin.woff2", "./fonts/noto-sans-normal-600-cyrillic.woff2", "./fonts/noto-sans-normal-600-latin.woff2", "./fonts/noto-serif-armenian-normal-100-900-armenian.woff2", "./fonts/noto-serif-armenian-normal-100-900-latin.woff2", "./fonts/noto-serif-italic-100-900-cyrillic.woff2", "./fonts/noto-serif-italic-100-900-latin.woff2", "./fonts/noto-serif-normal-100-900-cyrillic.woff2", "./fonts/noto-serif-normal-100-900-latin.woff2", "./propisi/urok-1.pdf", "./propisi/urok-2.pdf", "./propisi/urok-3.pdf", "./propisi/urok-4.pdf", "./propisi/urok-5.pdf", "./propisi/urok-6.pdf", "./propisi/urok-7.pdf", "./pet/aralez.webp", "./pet/aralez_small.webp", "./pet/s1.webp", "./pet/s2.webp", "./pet/s3.webp", "./pet/s4_calm.webp", "./pet/s4_dusty.webp", "./pet/s4_happy.webp", "./pet/s4_sleepy.webp", "./pet/s5_calm.webp", "./pet/s5_dusty.webp", "./pet/s5_happy.webp", "./pet/s5_sleepy.webp", "./pet/s6_calm.webp", "./pet/s6_dusty.webp", "./pet/s6_happy.webp", "./pet/s6_sleepy.webp", "./pet/s7_calm.webp", "./pet/s7_dusty.webp", "./pet/s7_happy.webp", "./pet/s7_sleepy.webp", "./pet/s8_calm.webp", "./pet/s8_dusty.webp", "./pet/s8_happy.webp", "./pet/s8_sleepy.webp"];
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
