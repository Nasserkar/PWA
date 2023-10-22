const self = this;
const cacheName = "my-cache"
// sw.js

self.addEventListener("install", (event) => {
  // Cache static assets
  const cacheWhitelist = [
    "./index.htmll",
    "./style.css",
    "./script.js",
    "./icons/logo.png",
    "./icons/splash.png",
  ];

  event.waitUntil(
    caches.open("my-cache").then((cache) => cache.addAll(cacheWhitelist))
  );
});

self.addEventListener("activate", (event) => {
  // Delete old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== "my-cache") {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
