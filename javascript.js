const square = [...document.querySelectorAll('.square')];

let takenFields = []; //*need this to ai program to avoid two signs on one place.

let numIndex = 0; //*need this to close program.

let userCounter = [];

let aiCounter = [];


let tabCompare = true;


const winningMatches = [
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 4, 8],
   [2, 4, 6]
];

function createXOXO(clickedElement, fieldNumber, aiChoose) {
   // PROGRAM MA SPRAWDZAC KTO KLIKA I DODAWAC X LUB 0 NA PLANSZE

}
const counter = (tabCompare) => {

   const userFields = userCounter.sort();
   const aiFields = aiCounter.sort();
   console.log(aiFields)
   for (let i = 0; i < winningMatches.length; i++) {

      if (tabCompare) {

         if (JSON.stringify(userFields) == JSON.stringify(winningMatches[i])) { //!poczytaj o tym
            console.log("wygrałeś Ty!")
            tabCompare = false;
         }
      } else if (!tabCompare) {
         if (JSON.stringify(aiFields) == JSON.stringify(winningMatches[i])) {
            console.log("wygrał Ai!")
            tabCompare = true;
         }
         //! przy czterech ruchach program nie działa gdyż porównóje całe tabelki a one wtedy nie sa równe
      }

   }
}

const userChoice = (e) => {
   let clickedElement = e.target;

   for (let i = 0; i <= square.length; i++) {

      if (clickedElement === square[i]) {
         userCounter.push(i);

         takenFields.push(i);

         tabCompare = true;

         counter(tabCompare);

         // createXOXO(clickedElement, i);
         const div = document.createElement("div");
         clickedElement.appendChild(div);
         div.classList.add('circle')

         numIndex++;
         ai(i);
      }

   }
}

const ai = (myChoice) => {

   // console.log(`stan tabelki przed wylosowaniem liczby przez ai(przed sprawdzeniem w pętli): ja ${i}, nic , ${takenFields}`)
   let aiChoose = Math.floor(Math.random() * (square.length - 0)) + 0;

   // console.log(`stan tabelki po wylosowaniu liczby przez ai(przed sprawdzeniem w pętli): ja ${i}, ai ${aiChoose}, ${takenFields}`)
   if (numIndex <= 8) {

      while (aiChoose === myChoice || takenFields.indexOf(aiChoose) !== -1) { // || zwraca (jeśli znajdzie) index liczby, 
         // jesli nie to -1 więc !== -1 będzie zawsze gdy znajdzie taką samą liczbę w tabeli (odwrotność do -1)
         //? === aiChoose // === myChoice // po drugim losowaniu aichoose nie jest już 'i' więc się nie równa 'i', nie jest true

         aiChoose = Math.floor(Math.random() * (square.length - 0)) + 0;
      }

      aiCounter.push(aiChoose);

      counter();

      takenFields.push(aiChoose);
      const div = document.createElement("div");
      square[aiChoose].appendChild(div);
      div.classList.add('cross');

      // createXOXO(aiChoose)

      numIndex++;
      // ? można kliknąć koło krzyżyka albo koła żeby wykonało ruch
   } else console.log('program zatrzymany')
}


square.forEach((area) => {
   area.addEventListener('click', userChoice);
})