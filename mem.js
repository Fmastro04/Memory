const carte = document.querySelectorAll('.sfondo');
const imm = document.querySelectorAll('.img');
const dispMosse = document.querySelector('.mosse')

let carteGirate = [];
let mosse = 0;
let coppieTrovate = 0;
let coppieTot = carte.length/2;

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
        
       carteGirate[0].classList.toggle('indovinata');
        carteGirate[1].classList.toggle('indovinata');
        coppieTrovate++;
        if(coppieTrovate === coppieTot){
            setTimeout(function() {
       
                alert("Hai vinto! 🎉\nHai completato il gioco in " + mosse + "🎉 mosse.")
        
    }, 500);
        }
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

