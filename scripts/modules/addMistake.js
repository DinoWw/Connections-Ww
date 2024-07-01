import { winScreen } from "./endScreen.js";
import { gameData } from "./globals.js";
import { storeGame } from "./localStorageInterface.js";
import { resolveCategory } from "./resolveCategory.js";
import { clickAction, tileByTitle } from "./tiles.js";
import { replaceButtons } from "./buttons.js";
import { shuffle, deselectAllHandler, submit } from "./buttons.js"; // za remEventListners


export { addMistake, initMistakes };

function addMistake() {
   if (gameData.mistakes >= 4) return;
   gameData.mistakes ++;
   storeGame();

   let mistakes_cont = document.querySelector("#mistakes")
   let children = mistakes_cont.children
   for (let i = children.length - 1; i > 0; i--) {
      if (!children[i].firstElementChild.classList.contains("smallerdot")) {

         children[i].firstElementChild.classList.add("smallerdot")
         if (i == 1) {
            console.log("loss")
            setTimeout(endGame, 750);
         }
         return
      }
   }
}

// makes dots reflect gameData.mistakes
function initMistakes(){;
   let mistakes_cont = document.querySelector("#mistakes")
   let children = mistakes_cont.querySelectorAll(".dot-container");
   console.log(children, gameData.mistakes)
   
   for (let i = 0; i < children.length - gameData.mistakes; i++) {
      console.log(children[i])
      children[i].firstElementChild.classList.remove("smallerdot")
   }
   for (let i = children.length - gameData.mistakes; i < children.length; i++) {
      children[i].firstElementChild.classList.add("smallerdot")
   }
   
}


function endGame() {

   //make unclickable
   console.log("endgame")
   removeEventListeners()

   const categoryTiles = []
   for (let category of gameData.categories) {
      const tiles = [];
      for (let title of category.elements) {
         tiles.push(tileByTitle(title));
      }
      categoryTiles.push(tiles);
   }

   let i = 0;
   function nextAnimation(e) {
      const cT = categoryTiles[i];
      console.log(cT)
      if (cT == undefined) {
         // All categories have been merged so display end screen
         setTimeout(() => {
            winScreen(false);
            replaceButtons();
         }, 750);
         return;
      }
      if (cT[0] != undefined) {
         resolveCategory(gameData.categories[i], cT);
         cT[0].addEventListener("animationend", () => {
            // This delay controls how long the user is left to read 
            //    a merged category before the next one starts merging.
            //    at least some delay IS neccesary
            setTimeout(nextAnimation, 500);
         });
         i++;
      }
      else {
         i++;
         nextAnimation();
      }
   }
   nextAnimation();

}

function removeEventListeners() {

   console.log("removin    ")
   document.querySelector("#deselect").removeEventListener("click", deselectAllHandler);

   document.querySelector("#submit").removeEventListener("click", submit);

   document.querySelector("#shuffle").removeEventListener("click", shuffle);

   //  ne radi : (
   let tiles = document.querySelectorAll(".tile-innerdiv")
   tiles.forEach(t => t.removeEventListener("click", e => clickAction(e.target)))

}