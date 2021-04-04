/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
// Set a name for the current cache
var cacheName = 'v1';
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';
const offlineUrl = './offline.html';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  './', // Alias for index.html
  './submit.html',
  './termos&condicoes.html',
  './manifest.json',
  offlineUrl
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Installed');
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

/*
// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});
*/

/*
self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        // Enable navigation preload if it's supported.
        // See https://developers.google.com/web/updates/2017/02/navigation-preload
        if ('navigationPreload' in self.registration) {
            await self.registration.navigationPreload.enable();
        }
    })());
    // Tell the active service worker to take control of the page immediately.
    self.clients.claim();
});
*/


self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activated');
  e.waitUntil(
    // Get all the cache keys (cacheName)
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (thisCacheName) {
        // If a cached item is saved under a previous cacheName
        if (thisCacheName !== cacheName) {
          // Delete that cached file
          console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
          return caches.delete(thisCacheName);
        }
      }));
    })
  ); // end e.waitUntil
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
/*
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
*/

this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        // Return the offline page
        return caches.match(offlineUrl);
      })
    );
  }
  else {
    // Respond with everything else if we can
    event.respondWith(caches.match(event.request)
      .then(function (response) {
        return response || fetch(event.request);
      })
    );
  }
});





/**** START notificationclose ****/
self.addEventListener('notificationclose', function (e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

/**** END notificationclose ****/




/**** START notificationActionClickEvent ****/
self.addEventListener('notificationclick', function (event) {
  if (!event.action) {
    // Was a normal notification click

    console.log('Notification Click.');
    clients.openWindow('https://orcamentosgraficos.pt/').then(function (client) {
      client.navigate('https://orcamentosgraficos.pt/');
    });
    return;
  }

  switch (event.action) {
    case 'coffee-action':
      console.log('User ❤️️\'s coffee.');
      // self.open('https://orcamentosgraficos.pt/', '_blank');
      clients.openWindow('https://instagram.com/_u/orcamentos_graficos_consult/');

      break;
    case 'doughnut-action':
      console.log('User ❤️️\'s doughnuts.');

      // clients.openWindow('https://orcamentosgraficos.pt/').then(function (client) {
      //  client.navigate('https://orcamentosgraficos.pt/'); });

      clients.openWindow(' https://www.linkedin.com/in/or%C3%A7amentos-gr%C3%A1ficos/');
      break;
    case 'gramophone-action':
      console.log('User ❤️️\'s music.');
      break;
    case 'atom-action':
      console.log('User ❤️️\'s science.');
      break;
    default:
      console.log(`Unknown action clicked: '${event.action}'`);
      break;
  }
});
/**** END notificationActionClickEvent ****/


