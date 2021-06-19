const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

// install the service worker
self.addEventListener("install", e => {
  // add all the pages to our local cache
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// listen for requests
self.addEventListener("fetch", e => {
  /*
        For every request that we receive, we need to check if that request is part of the cache.
        If it is, then we are simply 'forwarding' the request and fetching it. While fetching, if
        there is an error, then we need to load 'offline.html'
    */
  //  uncomment below line if you want to only store certain pages in the cache
  e.respondWith(
    caches.match(e.request).then(() => {
      return fetch(e.request).catch(() => caches.match("offline.html"));
    })
  );

  // this will cache all the requests in the cache.
  // e.respondWith(
  //   fetch(e.request)
  //     .then(res => {
  //       const resClone = res.clone();

  //       // cache any oncoming request
  //       caches.open(CACHE_NAME).then(cacheName => {
  //         cacheName.put(e.request, resClone);
  //       });

  //       // serve the request afterwards
  //       return res;
  //     })
  //     .catch(() => caches.match("offline.html"))
  // );
});

// activate the service worker
self.addEventListener("activate", e => {
  // caches to keep
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  // loops through all the caches and removes all that are not present in the whitelist
  e.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
