// Service worker minimal : permet l'installation de l'application du tableau de bord
const CACHE = "ruc-tableau-v1";
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(["stats.html", "icone-192.png", "icone-512.png", "manifest.json"]))); self.skipWaiting(); });
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return; // les données passent toujours par le réseau
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
