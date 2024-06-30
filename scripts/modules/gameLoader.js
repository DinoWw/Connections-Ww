import { categoryByElement, gameData, fillGameStructures } from "./globals.js";
import { clearGuesses } from "./resultsLogger.js";
import { createTile, fixTileOrder } from "./tiles.js";
import { shuffle } from "./buttons.js";
import { checkTextOverflow } from "./globals.js"
import * as local from "./localStorageInterface.js";

export { loadGame };




async function loadGame(gameName) {

   //if(game === undefined || game === null){
      await fetch(`data/${gameName}.json`).then(async response => {
         await response.json().then((data) => {
            // TODO: connect somehow
            //normalizeFormat(data);
            fillGameStructures(data);
         });
      });
   // }
   // else {
      // fillGameStructures(game);
      // updateGuesses
   // }


   clearDOM();
   clearGuesses();

   fillTiles();


}

function clearDOM() {
   document.getElementById("tiles").querySelectorAll(".tile").forEach(tile => tile.remove());
   document.querySelectorAll(".dot").forEach(dot => dot.classList.remove("smallerdot"));
}

function fillTiles() {

   const tileHome = document.getElementById("tiles");

   if (!gameData.initial || gameData.initial == []) {
      gameData.categories.forEach((category, ic) => {
         category.elements.forEach((term, it) => {
            const newTile = createTile(term, category.title, it, ic, false);
            // check for text resizing
            tileHome.appendChild(newTile);
         })
      })
      // annoying for testing
      shuffle();
   }
   else {
      gameData.initial.forEach((row, i) => {
         row.forEach((title, j) => {
            tileHome.appendChild(createTile(title, categoryByElement(title).title, j, i, false));
         })
      })
   }
   fixTileOrder();

   //maybe perma remove
   checkTextOverflow()

   // TODO: handle if title is undefined
   document.querySelectorAll(".gameTitle").forEach(el => el.textContent = gameData.title);

}

