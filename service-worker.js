const cacheName = "school-vegetable-app-v10";
const appFiles = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js?v=20260528-cloud-orders-1",
  "./manifest.webmanifest",
  "./icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(appFiles)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))))
  );
});

self.addEventListener("fetch", (event) => {
  if (new URL(event.request.url).pathname.endsWith("/orders.json")) {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    return;
  }

  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
