const tiles = document.querySelectorAll(".tile")


const items = new Array()
const selected = new Set()
let json

async function onLoad() {

   fetch('./game.json').then(async response => {

      json = (await response.json())

      init();
      //shuffle();
   })

   const deselectButton = document.querySelector("#deselect")
   deselectButton.addEventListener("click", deselectAll)

   const submitButton = document.querySelector("#submit")
   submitButton.addEventListener("click", submit)


   const shuffleButton = document.querySelector("#shuffle")
   shuffleButton.addEventListener("click", shuffle)

}


function clickAction(target) {
   let text = target.textContent

   console.log(target)
   if (selected.has(text)) {
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

function init() {

   json.forEach((category) => {
      category.elements.forEach((term) => {

         const tileHome = document.getElementById("tiles");
         const tileTemplate = document.getElementById("tile_template");

         const newTile = document.importNode(tileTemplate.content, true);
         newTile.firstElementChild.firstElementChild.firstElementChild.innerText = term //.firstElementChild.innerHtml = term);
         newTile.firstElementChild.addEventListener("click", e => clickAction(e.target))
         tileHome.appendChild(newTile);
      })
   })

}


function shuffle() {
   // mozemo i s metodom flex orderinga

}

function deselectAll() {
   const tiles = document.querySelectorAll(".tile")
   for (let tile of tiles) {
      if (selected.has(tile.firstElementChild.textContent)) {
         tile.firstElementChild.classList.toggle("selected")
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