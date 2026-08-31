const CACHE_NAME = "qr-attendance-v1";
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "https://cdn.tailwindcss.com",
  "https://unpkg.com/html5-qrcode",
  "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js",
  "https://cdn.jsdelivr.net/npm/chart.js",
  "https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js",
  "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"
];

// Cài đặt bộ nhớ đệm
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Chặn các yêu cầu mạng và trả về dữ liệu từ bộ nhớ đệm nếu mất mạng
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});