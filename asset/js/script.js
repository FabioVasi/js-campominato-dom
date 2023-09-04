/*
Consegna:

Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).

- Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: **nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

- In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

- La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

- Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS:

Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

Consigli del giorno:

Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
pensiamo a quali strumenti ci servono, ad esempio: Di cosa ho bisogno per generare i numeri?
Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
Eventuali validazioni e i controlli possiamo farli anche in un secondo momento.

Strumenti

- alert
- this
- const/let
- addEventListener
- querrySelector
- console.log
- fot/while
- function/arrow function
- append
- createElement
- array
- classList
- style
*/



const formElement = document.querySelector('form');

const fieldElement = document.querySelector('.field');

let bombs;

formElement.addEventListener('submit', function(ev) {

    ev.preventDefault();

    console.log(ev);

    fieldElement.innerHTML = ''

    const difficult = document.getElementById('difficult').value;

    console.log(difficult);

    let limit = 100;

    if (difficult == 'Difficoltà 1') {

        limit = 100;
        
    } else if(difficult == 'Difficoltà 2') {

        limit = 81;

    } else if(difficult == 'Difficoltà 3') {

        limit = 49;

    }

    bombs = generateBombs(limit);
    
    fieldOfBattle(limit, fieldElement);

})



function fieldOfBattle(limit, fieldElement) {

    for (let i = 0; i < limit; i++) {
        
        const cellMarkupElement = cellGenerator(i + 1, 'div', 'cell', limit);

        fieldElement.append(cellMarkupElement);
        
    }

}



function generateBombs(limit) {

    let cellBombNumbers = [];

    while (cellBombNumbers.length < 16) {

        const cellBombNumber = Math.floor(Math.random() * limit) + 1;

        if ( ! cellBombNumbers.includes(cellBombNumber)) {
            
            cellBombNumbers.push(cellBombNumber);

        }

    }

    return cellBombNumbers;

}



function cellGenerator(numb, el, cssClass, limit) {

    console.log(this);

    const cellMarkupElement = document.createElement(el);

    cellMarkupElement.append(numb);

    cellMarkupElement.classList.add(cssClass);

    cellMarkupElement.style.width = `calc(100% / ${Math.sqrt(limit)})`

    cellMarkupElement.addEventListener('click', function() {

        console.log(bombs);

        console.log(numb);

        if(bombs.includes(numb)) {

            this.classList.add('bg-danger');

            alert('You lost, refresh the page')

        } else {

            this.classList.toggle('bg-skyblue');

            console.log(numb);

        }
        
    })

    return cellMarkupElement
    
}