
function addMistake() {
   let mistakes_cont = document.querySelector("#mistakes")
   let children = mistakes_cont.children
   for (let i = children.length - 1; i > 0; i--) {
      if (!children[i].firstElementChild.classList.contains("smallerdot")) {

         children[i].firstElementChild.classList.add("smallerdot")
         if (i == 1) {
            console.log("loss")
         }
         return
      }
   }
}