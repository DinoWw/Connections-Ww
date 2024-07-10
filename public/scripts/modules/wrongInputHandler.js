import { popUp } from "./popUp.js";

export { wrongInput, checkIfRepeatingWords }



function wrongInput(inpElement) {
   console.log("error at", inpElement)
   //popUp("cringe")
   if (inpElement.classList.contains("category-input")) popUp("Write 4 categories, comma separated!")
   else if (inpElement.classList.contains("game-name")) popUp("Can't be empty! Maybe name already exists.")
   else popUp("Incorrect input!")
   inpElement.style.backgroundColor = "#ff8888"
}


function checkIfRepeatingWords(categories) {
   console.log("checking")
   let set = new Set()

   categories.forEach(c => c.elements.forEach(elem => set.add(elem))) //uppercase bi trebalo bit zanemarivo 
   console.log(set)
   if (set.size != 16) {
      return true
   }
   set = new Set()
   categories.forEach(c => set.add(c.title))

   console.log(set)
   if (set.size != 4) {
      return true
   }

   return false
}