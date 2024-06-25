const tiles = document.querySelectorAll(".tile")


const items = new Array()
const selected = new Set()
let json

async function onLoad() {

   fetch('./game.json').then(async response => {

      json = (await response.json())

      init();
      addEventListeners();
   })

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
      selected.delete(text)

      target.classList.toggle("selected")
   }
   else {
      if (selected.size < 4) {
         //selects
         selected.add(text);
         target.classList.toggle("selected")

      }
   }
}

function init() {

   const tileHome = document.getElementById("tiles");
   json.forEach((category, ic) => {
      category.elements.forEach((term, it) => {

         const newTile = createTile(term, it, ic, false);

         tileHome.appendChild(newTile);
      })
   })
   // TODO: implement, changes element css order property to reflext x and y coords
   fixTileOrder();

}


function addEventListeners() {
   json.forEach(obj => obj.elements.forEach(e =>
      items.push(e)
   ))


   for (let tile of tiles) {
      let index = Math.floor(Math.random() * items.length)
      let itemSelected = items[index];
      tile.textContent = itemSelected
      items.splice(index, 1)
   }
}

function deselectAll() {
   const tiles = document.querySelectorAll(".tile")
   for (let tile of tiles) {
      if (selected.has(tile.firstElementChild.firstElementChild.textContent)) {
         tile.firstElementChild.classList.toggle("selected")
      }
   }
   selected.clear()
}

function submit() {
   if (selected.size = 4) {
      let selectedArr = Array.from(selected)

      //TODO: rework, would be nice if selectedArr contined DOM objects
      for (let category of json) {
         if (category.elements.every(e => selectedArr.includes(e))) {

            console.log("success")
            // visually
            resolveCategory(category);

         }
      }
      if (selected.size != 0) {
         // Dino_ww: mislim da se ovaj kod slucajno runa zbog mene
         console.log("fail")
         deselectAll() //? 
         // locsk elements, animation
      }
   }
}

function fixTileOrder(){
   const tiles = document.getElementById("tiles");

   for(let tile of tiles.children) {
      tile.style.order = tile.x + tile.y*4;
   }
}

function shuffle(){
   const tiles = document.querySelectorAll(".tile:not(solved)");

   const available = [...Array(tiles.length).keys()];
   // shuffle code. It IS correct, https://blog.codinghorror.com/the-danger-of-naivete/
   for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
   }
  

   [...tiles].forEach((tile) => {
      let order = available.pop();
      tile.style.order = order + 1;
      tile.x = order % 4;
      tile.y = Math.floor(order / 4);
   });


}

function createTile(title, x, y, solved){
   // TODO: stavit negdje da se ne ucitava svaki put, ne zelim globalno
   const tileTemplate = document.getElementById("tile_template");

   const newTile = tileTemplate.content.firstElementChild.cloneNode(true);
   //console.log(newTile)
   
   newTile.x = x;
   newTile.y = y;

   newTile.firstElementChild.firstElementChild.innerText = title;
   if(!solved){
      newTile.addEventListener("click", e => clickAction(e.target))
   }
   else {
      newTile.classList.add("solved");
   }
   return newTile
}

onLoad()