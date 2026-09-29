const CACHE_NAME = 'ivaj-portal-v3';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];


/* ============================================================
   INSTALL
============================================================ */

self.addEventListener(
  'install',
  event => {

    event.waitUntil(

      caches
        .open(CACHE_NAME)
        .then(
          cache =>
            cache.addAll(APP_SHELL)
        )
        .then(
          () =>
            self.skipWaiting()
        )

    );

  }
);


/* ============================================================
   ACTIVATE
============================================================ */

self.addEventListener(
  'activate',
  event => {

    event.waitUntil(

      caches
        .keys()
        .then(
          cacheNames => {

            return Promise.all(

              cacheNames
                .filter(
                  cacheName =>
                    cacheName !== CACHE_NAME
                )
                .map(
                  cacheName =>
                    caches.delete(
                      cacheName
                    )
                )

            );

          }
        )
        .then(
          () =>
            self.clients.claim()
        )

    );

  }
);


/* ============================================================
   FETCH
============================================================ */

self.addEventListener(
  'fetch',
  event => {

    const request =
      event.request;


    /*
     * Solo GET
     */

    if (
      request.method !== 'GET'
    ) {

      return;

    }


    /*
     * Navegación:
     * NETWORK FIRST
     */

    if (
      request.mode === 'navigate'
    ) {

      event.respondWith(

        fetch(request)

          .then(
            response => {

              const clone =
                response.clone();


              caches
                .open(CACHE_NAME)
                .then(
                  cache => {

                    cache.put(
                      './index.html',
                      clone
                    );

                  }
                );


              return response;

            }
          )

          .catch(
            () => {

              return caches.match(
                './index.html'
              );

            }
          )

      );

      return;

    }


    /*
     * Recursos:
     * CACHE FIRST
     */

    event.respondWith(

      caches.match(request)

        .then(
          cachedResponse => {

            if (cachedResponse) {

              return cachedResponse;

            }


            return fetch(request)

              .then(
                response => {

                  if (
                    !response ||
                    response.status !== 200
                  ) {

                    return response;

                  }


                  const clone =
                    response.clone();


                  caches
                    .open(CACHE_NAME)
                    .then(
                      cache => {

                        cache.put(
                          request,
                          clone
                        );

                      }
                    );


                  return response;

                }
              );

          }
        )

    );

  }
);


/* ============================================================
   MESSAGE
============================================================ */

self.addEventListener(
  'message',
  event => {

    if (
      event.data?.type ===
      'SKIP_WAITING'
    ) {

      self.skipWaiting();

    }

  }
);