// Service Worker para PWA - CSMM APPS
const CACHE_NAME = 'csmm-contrato-v1.0.0';
const RUNTIME_CACHE = 'csmm-runtime-v1';

// Recursos para cache offline
const OFFLINE_URLS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Cacheando recursos offline');
        // Cachear apenas recursos locais
        return Promise.allSettled(
          OFFLINE_URLS.map(url => {
            return fetch(url)
              .then(response => {
                if (response.ok) {
                  return cache.put(url, response);
                }
              })
              .catch(err => {
                console.log(`[Service Worker] Erro ao cachear ${url}:`, err);
              });
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Instalação concluída');
      })
      .catch(err => {
        console.log('[Service Worker] Erro na instalação:', err);
      })
  );
  self.skipWaiting();
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[Service Worker] Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Estratégia: Network First, fallback para Cache
self.addEventListener('fetch', (event) => {
  // Ignorar requisições que não são GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Ignorar requisições de chrome-extension e outros protocolos
  if (event.request.url.startsWith('chrome-extension://') || 
      event.request.url.startsWith('chrome://') ||
      !event.request.url.startsWith('http')) {
    return;
  }

  const url = new URL(event.request.url);

  // Para recursos externos (CDN), usar cache-first
  if (url.origin !== self.location.origin) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request)
            .then((response) => {
              // Cachear apenas se for bem-sucedido
              if (response.ok) {
                const responseToCache = response.clone();
                caches.open(RUNTIME_CACHE).then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              }
              return response;
            })
            .catch(() => {
              // Se falhar e não tiver cache, retornar erro
              return new Response('Recurso não disponível offline', {
                status: 503,
                headers: new Headers({ 'Content-Type': 'text/plain' })
              });
            });
        })
    );
    return;
  }

  // Para recursos locais, usar network-first
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar a resposta para cache
        const responseToCache = response.clone();

        // Cachear recursos estáticos
        if (response.ok && (
            event.request.destination === 'document' || 
            event.request.destination === 'script' ||
            event.request.destination === 'style' ||
            event.request.destination === 'font' ||
            url.pathname.endsWith('.json') ||
            url.pathname.endsWith('.js')
          )) {
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      })
      .catch(() => {
        // Se a rede falhar, tentar buscar do cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Se for uma navegação e não houver cache, retornar página offline
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html') || 
                   caches.match('/') ||
                   new Response('App offline. Por favor, verifique sua conexão.', {
                     status: 503,
                     headers: new Headers({ 'Content-Type': 'text/html; charset=utf-8' })
                   });
          }

          // Retornar resposta vazia para outros tipos de requisição
          return new Response('Recurso não disponível offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// Mensagens do cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
