const CACHE_NAME = 'licni-kalendar-smena-v2';
const urlsToCache = [
    './licni-kalendar-smena.html',
    './manifest.json',
    './icon-512.png'
];

// Instalacija - keširanje fajlova
self.addEventListener('install', function (event) {
    // NOVO: skipWaiting() - novi SW preuzima kontrolu odmah
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// NOVO: Aktivacija - preuzimanje svih otvorenih tabova
self.addEventListener('activate', function (event) {
    event.waitUntil(
        clients.claim()
    );
});

// Fetch - odgovaranje na zahteve
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );
});
