const carte = document.querySelectorAll('.sfondo');
const imm = document.querySelectorAll('.img');
const dispMosse = document.querySelector('.mosse')
const CACHE_NAME = 'memory-game-v1'

let carteGirate = [];
let mosse = 0;

carte.forEach(function(carta) {
    carta.addEventListener("click", function() {
        if (this.classList.contains('visibile') || carteGirate.length === 2) return;    
        
        this.classList.toggle('visibile');
        carteGirate.push(this);
        if (carteGirate.length === 2) {
            mosse++;
            dispMosse.innerText = mosse;
            controllaCoppia();
        }
    });
});

function controllaCoppia(){
    const img1 = carteGirate[0].querySelector('.img').innerHTML;
    const img2 = carteGirate[1].querySelector('.img').innerHTML;

    if(img1 === img2){
        carteGirate = [];
    }
    else {
        setTimeout(function() {
        carteGirate[0].classList.remove('visibile');
        carteGirate[1].classList.remove('visibile');
        carteGirate = [];
        
    }, 1000);
}
}

function reset(){
    mosse = 0
    dispMosse.innerText = mosse;
    carteGirate = []; 

    carte.forEach(function(carta) {
       if (carta.classList.contains('visibile') ){
            carta.classList.remove('visibile')
       }
    });
}

self.addEventListener("install", e => {
    e.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll([
            '/',
            '/mem.js',
            '/style.css'
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

            }
        }
    })());
});

if('serviceWorker' in navigator) {
navigator.serviceWorker.register('/mem.js', { scope: '/' });
}
