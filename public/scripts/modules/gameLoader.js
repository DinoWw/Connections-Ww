import { categoryByElement, gameData, fillGameStructures, categoryId, loseGame } from "./globals.js";
import { createTile, fixTileOrder } from "./tiles.js";
import { replaceButtons, shuffle } from "./buttons.js";
import { checkTextOverflow } from "./globals.js"
import * as local from "./localStorageInterface.js";
import { resolveCategory } from "./resolveCategory.js";
import { initMistakes } from "./addMistake.js";


export { loadGame };




async function loadGame(fileName) {
   const game = local.loadGame(fileName);
   if (game === undefined || game === null) {
      await fetch(`data/${fileName}`).then(async response => {
         await response.json().then((data) => {
            // TODO: connect somehow
            // normalizeFormat(data);
            fillGameStructures(data);
         });
      });
   }
   else {
      fillGameStructures(game);
   }


   clearDOM();
   fillTiles();
   initMistakes();

   // ako ce se mijenjat gameData je problem

}

function clearDOM() {
   document.getElementById("tiles").querySelectorAll(".tile").forEach(tile => tile.remove());
   document.querySelectorAll(".dot").forEach(dot => dot.classList.remove("smallerdot"));
   if (gameData.guesses.length == 4) {
      replaceButtons()
   }
}

function fillTiles() {

   const tileHome = document.getElementById("tiles");


   if (!gameData.initial || gameData.initial.length == 0) {
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

   // redo guesses from localstorage
   if (gameData.guesses.length != 0) {
      for (let guess of gameData.guesses) {
         const potentialTitle = categoryByElement(guess[0]).title;
         if (!guess.every((tileText) => categoryByElement(tileText).title == potentialTitle)) continue;
         //else 
         //resolveCategory(gameData.categories.find(c => c.title == selectedEls[0].category), selectedEls, false);

         const els =
            guess.map(title =>
               [...tileHome.querySelectorAll('.tile')].find(el =>
                  el.querySelector('p').textContent == title
               )
            );
         resolveCategory(gameData.categories[categoryId[potentialTitle]], els, false);
      }
   }

   // TODO: if endless mode gets implemented, change the 4 to some global
   if(gameData.mistakes >= 4){
      replaceButtons();
   }





   fixTileOrder();

   //maybe perma remove
   checkTextOverflow()

   // TODO: handle if title is undefined
   document.querySelectorAll(".gameTitle").forEach(el => el.textContent = gameData.title);

}

