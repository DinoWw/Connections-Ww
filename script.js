const tiles = document.querySelectorAll(".tile")

const selected = new Set()

function onLoad() {
   localStorage.selected = { items: [] }
   for (let tile of tiles) {
      tile.addEventListener("click", e => clickAction(e.target))
   }


}


function clickAction(target) {

   console.log(selected.size)
   if (selected.has(target.textContent)) {
      // unselect
      selected.delete(target.textContent)

      target.classList.toggle("selected")
      console.log("unselect")
   }
   else {
      if (selected.size < 4) {
         //selects
         selected.add(target.textContent);
         target.classList.toggle("selected")

         console.log("unselect")
      }
   }
}

onLoad()