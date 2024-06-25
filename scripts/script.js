const tiles = document.querySelectorAll(".tile")


const items = new Array()
const selected = new Set()
let json

async function onLoad() {

   fetch('data/game.json').then(async response => {

      json = (await response.json())

      init();
   })

   // append event listeners on buttons

   const deselectButton = document.querySelector("#deselect")
   deselectButton.addEventListener("click", deselectAll)

   const submitButton = document.querySelector("#submit")
   submitButton.addEventListener("click", submit)


   const shuffleButton = document.querySelector("#shuffle")
   shuffleButton.addEventListener("click", shuffle)

}


function clickAction(target) {
   let text = target.firstElementChild.textContent

   if (selected.has(text)) {
      // unselect
      remFromSelected(text)

      target.classList.toggle("selected")
   }
   else {
      if (selected.size < 4) {
         //selects
         addToSelected(text);
         target.classList.toggle("selected")

      }
   }
}

function init() {

   const tileHome = document.getElementById("tiles");
   json.categories.forEach((category, ic) => {
      category.elements.forEach((term, it) => {

         const newTile = createTile(term, it, ic, false);
         tileHome.appendChild(newTile);
      })
   })
   // TODO: implement, changes element css order property to reflext x and y coords
   fixTileOrder();

}

function fixTileOrder() {
   const tiles = document.getElementById("tiles");

   for (let tile of tiles.children) {
      tile.style.order = tile.x + tile.y * 4;
   }
}

function createTile(title, x, y, solved) {
   // TODO: stavit negdje da se ne ucitava svaki put, ne zelim globalno
   const tileTemplate = document.getElementById("tile_template");

   const newTile = tileTemplate.content.firstElementChild.cloneNode(true);
   //console.log(newTile)

   newTile.x = x;
   newTile.y = y;

   newTile.firstElementChild.firstElementChild.innerText = title;
   if (!solved) {
      newTile.addEventListener("click", e => clickAction(e.target))
      //newTile.addEventListener("click", e => console.log(newTile.x, newTile.y, newTile.style.order))
   }
   else {
      newTile.classList.add("solved");
      newTile.style.order = -1;
   }
   return newTile
}


function addToSelected(str) {
   selected.add(str)
   let deselectButton = document.querySelector("#deselect")
   let submitButton = document.querySelector("#submit")
   if (deselectButton.classList.contains("unclickable")) {
      deselectButton.classList.toggle("unclickable");
   }
   if (selected.size == 4 && submitButton.classList.contains("unclickable")) {
      submitButton.classList.toggle("unclickable");
   }
}
function remFromSelected(str) {
   selected.delete(str)
   let deselectButton = document.querySelector("#deselect")
   let submitButton = document.querySelector("#submit")
   if (selected.size == 0 && !deselectButton.classList.contains("unclickable")) {
      deselectButton.classList.toggle("unclickable");
   }
   if (!submitButton.classList.contains("unclickable")) {
      submitButton.classList.toggle("unclickable");
   }
}
onLoad()
// nyt official colors: #A0C359 #F8DF6E #B2C4E5 #B881B9
