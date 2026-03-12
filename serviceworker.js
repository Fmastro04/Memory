const CACHE_NAME = 'memory-gameapp-v1';

self.addEventListener("install", e => {
    e.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll([
           './',
    'index.html',
    'mem.js',
    'style.css',
    'unnamed.png', // Aggiungi anche l'icona per l'offline
    'manifest.json'
        ]);
    })());
});

self.addEventListener("fetch", e => {
    e.respondWith((async()=>{
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(e.request);
        if(cachedResponse){
            return cachedResponse;
        }
        else{
            try{
                const fetchResponse = await fetch(e.request);
                cache.put(e.request,fetchResponse.clone());
                return fetchResponse;
            } catch(e){
                console.log("errore:(");
            }
        }
    })());
});



