const square = [...document.querySelectorAll('.square')];

const clickedArea = (e) => {
   console.log(square.length)
   let clickedElement = e.target;

   for (let i = 0; i <= square.length; i++) {

      if (clickedElement === square[i]) {
         const div = document.createElement("div");
         clickedElement.appendChild(div);
         div.classList.add('circle')
      }
   }
}




square.forEach((area) => {
   area.addEventListener('click', clickedArea);
})