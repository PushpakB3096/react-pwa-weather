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

// activate the service worker
