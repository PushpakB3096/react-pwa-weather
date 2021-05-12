const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

// install the service worker
self.addEventListener("install", (e) => {
  // loads the given urls from the cache, if cache is available
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// listen for requests
self.addEventListener("fetch", (e) => {
  /*
        For every request that we receive, we need to check if that request is part of the cache.
        If it is, then we are simply 'forwarding' the request and fetching it. While fetching, if
        there is an error, then we need to load 'offline.html'
    */
  e.respondWith(
    caches.match(e.request).then(() => {
      return fetch(e.request).catch(() => caches.match("offline.html"));
    })
  );
});

// activate the service worker
