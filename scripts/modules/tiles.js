import { selected } from "./globals.js";
import { addToSelected, remFromSelected } from "./selectedManager.js";

export { createTile, clickAction, fixTileOrder, tileByTitle };

function createTile(title, category, x, y, solved) {
   // TODO: stavit negdje da se ne ucitava svaki put, ne zelim globalno
   const tileTemplate = document.getElementById("tile_template");

   const newTile = tileTemplate.content.firstElementChild.cloneNode(true);
   //console.log(newTile)

   newTile.x = x;
   newTile.y = y;

   newTile.firstElementChild.firstElementChild.innerText = title;
   if (!solved) {
      newTile.category = category;
      console.log("newTile", newTile)
      newTile.addEventListener("click", e => clickAction(e.target))

      // removes class after wrong-animation
      // trebalo bi bit tile-innerdiv
      newTile.firstElementChild.addEventListener("animationend", e => {
         if (e.animationName == "wrongAnimation") {
            e.target.classList.remove("wrong")
         }
      })
      //newTile.addEventListener("click", e => console.log(newTile.x, newTile.y, newTile.style.order))
   }
   else {
      newTile.classList.add("solved");
      newTile.style.order = -1;
   }
   return newTile;
}


function clickAction(target) {

   let text = target.firstElementChild.textContent

   if (selected.has(text)) {
      // unselect
      remFromSelected(text)

      target.classList.remove("selected")
      target.classList.add("selectable")
   }
   else if (selected.size < 4 && target.classList.contains("selectable")) {
      //selects
      addToSelected(text);
      target.classList.add("selected")
      target.classList.remove("selectable")

   }

}

function fixTileOrder() {
   const tiles = document.getElementById("tiles");

   for (let tile of tiles.children) {
      if (tile.classList.contains("solved")) continue;
      tile.style.order = tile.x + tile.y * 4;
   }
}



function tileByTitle(title) {
   const tiles = [...document.querySelectorAll(".tile")];
   return tiles.find((tile) => tile.firstElementChild.firstElementChild.innerText == title);

}

