/**
 * SERVICE WORKER
 * --------------
 * En service worker er et script der kører "bag" siden og kan opfange alle netværkskald.
 * Vi bruger to strategier (som på tavlen):
 *
 *  1) STATISKE FILER (HTML, CSS, JS)  -> CACHE FIRST
 *     Tjek cachen først. Kun hvis filen ikke er der, hentes den fra nettet.
 *     Hurtigt, og siden virker offline.
 *
 *  2) API-KALD (Open-Meteo)           -> NETWORK FIRST (med cache som backup)
 *     Prøv nettet først, så vejret altid er friskt.
 *     Gem svaret i cachen. Er man offline, bruges det senest gemte svar.
 *
 * VIGTIGT: Når du ændrer i en fil, så hæv versionsnummeret (v1 -> v2),
 * ellers bliver brugerne ved med at få den gamle fil fra cachen.
 */

const VERSION = 'v1';
const STATIC_CACHE = `vejr-static-${VERSION}`;
const API_CACHE = `vejr-api-${VERSION}`;

// Alle filer appen skal bruge for at kunne starte offline
const STATIC_FILES = [
  './',
  './index.html',

  // CSS
  './css/main.css',
  './css/base.css',
  './css/atoms.css',
  './css/molecules.css',
  './css/organisms.css',
  './css/templates.css',

  // JS – MVC
  './js/app.js',
  './js/models/weatherModel.js',
  './js/views/weatherView.js',
  './js/controllers/weatherController.js',

  // JS – hjælpere
  './js/utils/dom.js',
  './js/utils/formatters.js',
  './js/utils/weatherCodes.js',

  // JS – atomic design komponenter
  './js/components/atoms/button.js',
  './js/components/atoms/heading.js',
  './js/components/atoms/input.js',
  './js/components/atoms/message.js',
  './js/components/atoms/temperature.js',
  './js/components/atoms/weatherIcon.js',
  './js/components/atoms/windArrow.js',
  './js/components/molecules/dataItem.js',
  './js/components/molecules/dayCard.js',
  './js/components/molecules/hourItem.js',
  './js/components/molecules/searchForm.js',
  './js/components/molecules/windInfo.js',
  './js/components/organisms/dayDetail.js',
  './js/components/organisms/forecastList.js',
  './js/components/organisms/siteHeader.js',
  './js/components/templates/weatherTemplate.js',
];

/* ---------- INSTALL: gem alle statiske filer i cachen ---------- */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_FILES))
      .then(() => self.skipWaiting()) // tag over med det samme
  );
});

/* ---------- ACTIVATE: slet gamle caches fra tidligere versioner ---------- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== API_CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim()) // styr åbne faner med det samme
  );
});

/* ---------- FETCH: vælg strategi ud fra hvad der hentes ---------- */
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Kun GET-kald kan caches
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (url.hostname.endsWith('open-meteo.com')) {
    // API-kald -> network first
    event.respondWith(networkFirst(request));
  } else if (url.origin === self.location.origin) {
    // Vores egne filer -> cache first
    event.respondWith(cacheFirst(request));
  }
  // Alt andet lader vi browseren klare helt normalt
});

/* ---------- Strategi 1: CACHE FIRST ---------- */
async function cacheFirst(request) {
  // ignoreSearch: "index.html?x=1" matcher stadig "index.html"
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;

  // Ikke i cachen -> hent fra nettet og gem til næste gang
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, response.clone()); // clone: et svar kan kun læses én gang
  }
  return response;
}

/* ---------- Strategi 2: NETWORK FIRST (+ cache) ---------- */
async function networkFirst(request) {
  const cache = await caches.open(API_CACHE);

  try {
    // Prøv nettet først
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    // Offline -> brug sidst gemte svar
    const cached = await cache.match(request);
    if (cached) return cached;

    // Intet i cachen heller -> send et fejl-svar, som modellen kan håndtere
    return new Response(JSON.stringify({ error: 'offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
