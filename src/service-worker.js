import urlsToCache from './lib/urlsToCache.js';

/**
 * Distance To App | © Nick Freear | License: GPL-3.0+.
 *
 * @see https://github.com/nfreear/breath/blob/master/docs/service-worker.js
 * @see https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 */

const { caches, self } = globalThis;
const cacheName = 'distance-to-app-cache';

let clientId;

self.addEventListener('install', (event) => {
  console.warn('Distance To App: install.', cacheName, event);

  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      const urlsForCache = urlsToCache();
      console.debug('sw.js ~ Opened cache:', urlsForCache);
      return cache.addAll(urlsForCache);
    })
  );
});

// https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker#3_serve_files_from_the_cache
// https://dev.to/buildwebcrumbs/why-your-website-should-work-offline-and-what-you-should-do-about-it-fck
// https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith
self.addEventListener('fetch', (event) => {
  clientId = event.clientId;

  // Prevent the default, and handle the request ourselves.
  event.respondWith(
    (async () => {
      // Try to get the response from a cache.
      const cachedResponse = await caches.match(event.request);
      // Return it if we found one.
      if (cachedResponse) {
        // clientId: 85c37f1a-9622-4930-b95f-89ca23eae578
        console.debug('sw.js ~ Cache hit - return response'); //, event.request.url);
        return cachedResponse;
      }
      // If we didn't find a match in the cache, use the network.
      return fetch(event.request);
    })()
  );
});

/**
 * Delete the cache.
 */
self.addEventListener('message', async (event) => {
  if (event.data !== 'cache:delete') {
    console.debug('sw.js ~ Other message:', event);
    return;
  }

  const cache = await caches.open(cacheName);
  const responses = await cache.matchAll();

  const promises = responses.map(({ url }) => cache.delete(url));

  Promise.all(promises).then(async () => {
    console.debug('sw.js ~ Cache:delete:', clientId, responses, event);

    const client = await self.clients.get(clientId);
    if (client) {
      client.postMessage('cache:delete:ok');
    }
  });
});

// End.
