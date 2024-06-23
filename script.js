const tiles = document.querySelectorAll(".tile")


const items = new Array()
const selected = new Set()
let json

async function onLoad() {

   fetch('./game.json').then(async response => {

      json = (await response.json())

      shuffle()
   })

   const deselectButton = document.querySelector("#deselect")
   deselectButton.addEventListener("click", deselectAll)

   const submitButton = document.querySelector("#submit")
   submitButton.addEventListener("click", submit)


   const shuffleButton = document.querySelector("#shuffle")
   shuffleButton.addEventListener("click", shuffle)






}


function clickAction(target) {

   console.log(selected.size)
   if (selected.has(target.textContent)) {
      // unselect
      selected.delete(target.textContent)

      target.classList.toggle("selected")
   }
   else {
      if (selected.size < 4) {
         //selects
         selected.add(target.textContent);
         target.classList.toggle("selected")

      }
   }
}

function shuffle() {
   // mozemo i s metodom flex orderinga
   json.forEach(obj => obj.elements.forEach(e => {
      items.push(e)
   }))


   for (let tile of tiles) {
      tile.addEventListener("click", e => clickAction(e.target))
      let index = Math.floor(Math.random() * items.length)
      let itemSelected = items[index];
      tile.textContent = itemSelected
      items.splice(index, 1)
   }
}

function deselectAll() {

   for (let tile of tiles) {
      if (selected.has(tile.textContent)) {
         tile.classList.toggle("selected")
      }
   }
   selected.clear()
}

function submit() {
   let selectedArr = Array.from(selected)
   for (let category of json) {
      if (category.elements.every(e => selectedArr.includes(e))) {
         console.log(category.title)
         selected.clear()
      }
   }
   if (selected.size != 0) {
      console.log("fail")
      deselectAll() //? 
      // locsk elements, animation
   }



}

onLoad()