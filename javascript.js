const square = [...document.querySelectorAll('.square')];
let takenFields = [];
let numIndex = 0;

const clickedArea = (e) => {
   let clickedElement = e.target;

   for (let i = 0; i <= square.length; i++) {

      if (clickedElement === square[i]) {

         takenFields.push(i);
         const div = document.createElement("div");
         clickedElement.appendChild(div);
         div.classList.add('circle')
         numIndex++
         ai(i)
      }

   }
}
const ai = (i) => {
   // console.log(`stan tabelki przed wylosowaniem liczby przez ai(przed sprawdzeniem w pętli): ja ${i}, nic , ${takenFields}`)
   let aiChoose = Math.floor(Math.random() * (square.length - 0)) + 0;
   // console.log(`stan tabelki po wylosowaniu liczby przez ai(przed sprawdzeniem w pętli): ja ${i}, ai ${aiChoose}, ${takenFields}`)
   if (numIndex <= 8) {
      while (aiChoose === i || takenFields.indexOf(aiChoose) !== -1) { // ! || zwraca (jeśli znajdzie) index liczby, 
         //!  jesli nie to -1 więc !== -1 będzie zawsze gdy znajdzie taką samą liczbę w tabeli (odwrotność do -1)
         //? === aiChoose // === i // po drugim losowaniu aichoose nie jest już 'i' więc się nie równa 'i', nie jest true
         console.log('zmieniło liczbę')
         aiChoose = Math.floor(Math.random() * (square.length - 0)) + 0;
         // console.log(aiChoose)
      }
      takenFields.push(aiChoose);
      const div = document.createElement("div");
      square[aiChoose].appendChild(div);
      div.classList.add('cross');
      console.log(`tabelka po dodaniu liczby przez ai: ${takenFields}`);
      numIndex++;
      // ? można kliknąć koło krzyżyka albo koła żeby wykonało ruch
   } else console.log('program zatrzymany')
}
square.forEach((area) => {
   area.addEventListener('click', clickedArea);
})