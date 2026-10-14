const CACHE_NAME = "hz-live-demo-v2";
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/styles.css",
  "/app.js",
  "/icon-192.png",
  "/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(APP_SHELL);
        await self.skipWaiting();
      } catch (error) {
        console.error("Service worker install failed:", error);
        throw error;
      }
    })()
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

function isSameOrigin(request) {
  try {
    return new URL(request.url).origin === self.location.origin;
  } catch {
    return false;
  }
}

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const acceptHeader = event.request.headers.get("accept") || "";
  const isNavigation = event.request.mode === "navigate" || acceptHeader.includes("text/html");

  if (isNavigation) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(event.request);
          if (response && response.ok && isSameOrigin(event.request)) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, response.clone());
          }
          return response;
        } catch (error) {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          return caches.match("/index.html");
        }
      })()
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;

      try {
        const response = await fetch(event.request);
        if (response && response.ok && isSameOrigin(event.request)) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, response.clone());
        }
        return response;
      } catch (error) {
        return new Response("Offline", {
          status: 503,
          statusText: "Service Unavailable"
        });
      }
    })()
  );
});
