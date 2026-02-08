const CACHE_NAME = 'aikido-app-v3.0';
const urlsToCache = [
    'index.html',
    'manifest.json',
    'aikido_data.json'
];

// Install: App-Dateien cachen
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

// Fetch: aus Cache oder Netzwerk
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            return fetch(event.request);
        })
    );
});

// Activate: alte Caches löschen
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
});
