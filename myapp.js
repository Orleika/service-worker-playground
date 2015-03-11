importScripts('javascripts/serviceworker-cache-polyfill.js');

var CACHE_NAME = 'service-worker-playground-v1',
  urlToCache = [
    '/index.html',
    '/stylesheets/print.css',
    '/stylesheets/pygment_trac.css',
    '/stylesheets/stylesheet.css',
    '/images/white_eye.jpg',
    '/images/sparrow.jpg',
    '/images/lesser_panda.jpg',
    '/images/camellia.jpg',
    '/images/body-bg.png',
    '/images/highlight-bg.jpg',
    '/images/hr.png',
    '/images/octocat-icon.png',
    '/images/octocat-icon.png',
    '/images/zip-icon.png'
  ];

self.oninstall = function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      return cache.addAll(urlToCache);
    })
  );
};

// self.onactivate = function (event) {};

self.onfetch = function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      console.log(response);
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
};
