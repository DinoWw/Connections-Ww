export { wrongInput, checkIfRepeatingWords }

function checkInput(divElement) {

}

function wrongInput(inpElement) {
   console.log("error at", inpElement)
   popUp("cringe")
   if (inpElement.classList.contains("category-input")) popUp("4 categories, comma-separated!")
   inpElement.style.backgroundColor = "#ff8888"
}


function checkIfRepeatingWords(categories) {
   console.log("checking")
   let set = new Set()
   console.log(set)

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