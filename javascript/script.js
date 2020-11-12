const square = [...document.querySelectorAll('.game-area__square')];

const winnerInfo = document.querySelector('.game-panel__winners-info');

let values = {
   takenFields: [], //need this for ai program to avoid two signs on one place.
   stopTheProgram: 0, //if is equal to square.length (8) stop the program 
   userCounter: [],
   aiCounter: [],
}

const initialValues = {
   takenFields: [],
   stopTheProgram: 0,
   userCounter: [],
   aiCounter: [],
}
function reset() {
   values = { takenFields: [], stopTheProgram: 0, userCounter: [], aiCounter: [] }
}
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

      if (clickedElement === square[i] && !values.takenFields.includes(i)) {

         values.userCounter.push(i);

         values.takenFields.push(i);

         if (!stopTurn) {
            createO(clickedElement);
            stopTurn = checkUserNumbers() ? true : false;
            values.stopTheProgram++;
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

   for (let winningMatch of winningMatches) {

      if (winningMatch.every(userCheck)) {

         showUserResults();

         return true;
      }
   }
   return false;
}

function userCheck(element) {
   return values.userCounter.includes(element);
}

function showUserResults() {
   winnerInfo.textContent = "Wygrałeś!";
   const wins = document.querySelector(".wins");
   wins.textContent++;
}

function ai(userChoice) {

   let aiChoice = Math.floor(Math.random() * square.length);

   if (values.stopTheProgram < 8) {

      while (aiChoice === userChoice || values.takenFields.indexOf(aiChoice) !== -1) { //values.takenFields.includes(aiChoice))

         //? === aiChoice // === userChoice // po drugim losowaniu aiChoice nie jest już 'i' więc się nie równa 'i', nie jest true

         aiChoice = Math.floor(Math.random() * (square.length - 0)) + 0;
      }

      values.aiCounter.push(aiChoice);

      values.takenFields.push(aiChoice);

      createX(aiChoice);

      stopTurn = checkAiNumbers() ? true : false;

      values.stopTheProgram++;
   } else {
      const remis = document.querySelector(".remis");
      remis.textContent++
      winnerInfo.textContent = "Remis!";
   }
}

function createX(aiChoice) {
   const div = document.createElement("div");
   square[aiChoice].appendChild(div);
   div.classList.add('cross');
}

function checkAiNumbers() {

   for (let winningMatch of winningMatches) {

      if (winningMatch.every(aiCheck)) {

         showAiResults();

         return true;
      }
   }
   return false;
}

function aiCheck(element) { //element?
   return values.aiCounter.includes(element);
}

function showAiResults() {
   winnerInfo.textContent = "Przegrałeś!";
   const loses = document.querySelector(".loses");
   loses.textContent++;
}

//CLEAR BOARD
document.querySelector('.game-panel__play').addEventListener('click', clearBoard);

function clearBoard() {

   const circleSigns = document.querySelectorAll('.circle');
   const crossSigns = document.querySelectorAll('.cross')

   circleSigns.forEach((elem) => {

      elem.remove();
   })
   crossSigns.forEach((elem) => {

      elem.remove();
   })
   reset();
   stopTurn = false;
   winnerInfo.textContent = "";
}

// SIGN CHANGE COLOR 
const colors = document.querySelectorAll('.colors__color');
const changeColorSign = (e) => {
   let clickedElement = e.target;

   const sign = [...document.querySelectorAll('.circle')];

   if (clickedElement.className === '.colors__color is-blue') {

      sign.forEach((elem) => {

         elem.style.borderColor = "var(--green)";
      })
   }
   //  else if((clickedElement.className === 'color green')) {
   //    sign.forEach((elem) => {

   //       elem.style.borderColor = "$green";
   //    })
   //  } else {
   //    sign.forEach((elem) => {

   //       elem.style.borderColor = `$yellow`;
   //    })
   //  }
}

colors.forEach((dot) => {
   dot.addEventListener('click', changeColorSign);
})



