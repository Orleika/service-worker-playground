console.log("pass");
importScripts('serviceworker-cache-polyfill.js');

var CACHE_NAME = 'service-worker-playground-v1',
  urlToCache = [
    'images/white_eye.jpg',
    'images/sparrow.jpg',
    'images/lesser_panda.jpg',
    'images/camellia.jpg'
  ];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      return cache.addAll(urlToCache);
    })
  );
});

self.addEventListener('activate', function (event) {});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
