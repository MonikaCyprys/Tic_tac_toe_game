const square = [...document.querySelectorAll('.square')];

let takenFields = []; //*need this to ai program to avoid two signs on one place.

let numIndex = 0; //*need this to close program.

let userCounter = [];

let aiCounter = [];


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

function createO(clickedElement, stopTurn) { //?if something is undefinded do something {}

   do {
      const div = document.createElement("div");
      clickedElement.appendChild(div);
      div.classList.add('circle')
      console.log("dodaje element")
      !stopTurn
   } while (!stopTurn === false) ///cały czas się wykonuje

}

function createX(aiChoose) {

   const div = document.createElement("div");
   square[aiChoose].appendChild(div);
   div.classList.add('cross');

}

function userCheck(element) {

   return userCounter.includes(element);

}

function aiCheck(element) {

   return aiCounter.includes(element);

}

function showUserResults() {
   console.log("wygrałes")
}

function showAiResults() {
   console.log("wygrał ai")
}


function checkUserNumbers() {

   let userWin = false;

   for (let i = 0; i < winningMatches.length; i++) {

      userWin = winningMatches[i].every(userCheck);

      if (userWin === true) {

         userWin = true;

         showUserResults();

         return true;
      }
   }

}

function checkAiNumbers() {

   let aiWin = false;

   for (let i = 0; i < winningMatches.length; i++) {

      aiWin = winningMatches[i].every(aiCheck);

      if (aiWin === true) {

         aiWin = true;

         showAiResults();

         return true;
      }
   }


}


const userChoice = (e) => {

   let stopTurn = false;
   let clickedElement = e.target;

   for (let i = 0; i <= square.length; i++) {

      if (clickedElement === square[i]) {

         userCounter.push(i);

         takenFields.push(i);

         stopTurn = checkUserNumbers() ? true : false;

         createO(clickedElement, stopTurn)

         numIndex++; //*need to stop the ai turns

         if (!stopTurn) {
            ai(i);
            stopTurn
         }
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


      checkAiNumbers();

      takenFields.push(aiChoose);

      createX(aiChoose);

      numIndex++;
      // ? można kliknąć koło krzyżyka albo koła żeby wykonało ruch
   } else console.log('program zatrzymany')
}


square.forEach((area) => {
   area.addEventListener('click', userChoice);
})