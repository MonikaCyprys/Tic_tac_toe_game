const square = [...document.querySelectorAll('.square')];

const winnerInfo = document.querySelector('.winners-info');

let takenFields = []; //need this to ai program to avoid two signs on one place.

let stopTheProgram = 0; //stop the proogram if equal 8

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


square.forEach((area) => {
   area.addEventListener('click', userChoice);
})

let stopTurn = false;

function userChoice(e) {

   let clickedElement = e.target;

   for (let i = 0; i <= square.length; i++) {

      if (clickedElement === square[i] && !takenFields.includes(i)) {

         userCounter.push(i);

         takenFields.push(i);

         if (!stopTurn) {
            createO(clickedElement);
            stopTurn = checkUserNumbers() ? true : false;
            stopTheProgram++;
         }

         if (!stopTurn) {
            ai(i);
         } //ogarnąć to ^--- ten sam warunek
         //need to stop the ai turns
      }

   }
}

function createO(clickedElement) {

   const div = document.createElement("div");
   clickedElement.appendChild(div);
   div.classList.add('circle')
   // const circles = document.querySelectorAll('.circle');
}

function checkUserNumbers() {

   for (let i = 0; i < winningMatches.length; i++) {

      if (winningMatches[i].every(userCheck)) {

         showUserResults();

         return true;
      }
   }
   return false;

}
function userCheck(element) {

   return userCounter.includes(element);

}

function showUserResults() {
   winnerInfo.textContent = "Wygrałeś!";
   const wins = document.querySelector(".wins");
   wins.textContent++

}

function ai(myChoice) {

   let aiChoose = Math.floor(Math.random() * (square.length - 0)) + 0;

   if (stopTheProgram < 8) {

      while (aiChoose === myChoice || takenFields.indexOf(aiChoose) !== -1) { //takenFields.includes(aiChoose))

         //? === aiChoose // === myChoice // po drugim losowaniu aichoose nie jest już 'i' więc się nie równa 'i', nie jest true

         aiChoose = Math.floor(Math.random() * (square.length - 0)) + 0;

      }

      aiCounter.push(aiChoose);

      takenFields.push(aiChoose);

      createX(aiChoose);

      stopTurn = checkAiNumbers() ? true : false;

      stopTheProgram++;
   } else {
      const remis = document.querySelector(".remis");
      remis.textContent++
      winnerInfo.textContent = "Remis!";

   }
}

function createX(aiChoose) {

   const div = document.createElement("div");
   square[aiChoose].appendChild(div);
   div.classList.add('cross');

}

function checkAiNumbers() {

   for (let i = 0; i < winningMatches.length; i++) {


      if (winningMatches[i].every(aiCheck)) {

         showAiResults();

         return true;
      }
   }
   return false;
}

function aiCheck(element) { //element?

   return aiCounter.includes(element);

}

function showAiResults() {
   winnerInfo.textContent = "Przegrałeś!";
   const loses = document.querySelector(".loses");
   loses.textContent++

}

//CLEAR BOARD
document.querySelector('.play').addEventListener('click', clearBoard);

function clearBoard() {

   const circleSigns = document.querySelectorAll('.circle');
   const crossSigns = document.querySelectorAll('.cross')


   circleSigns.forEach((elem) => {

      elem.remove();
   })
   crossSigns.forEach((elem) => {

      elem.remove();
   })

   takenFields = [];
   stopTheProgram = 0;
   userCounter = [];
   aiCounter = [];
   stopTurn = false;
}



