import { winScreen } from "./endScreen.js";
import { gameData } from "./globals.js";
import { resolveCategory } from "./resolveCategory.js";
import { tileByTitle } from "./tiles.js";

export { addMistake };

function addMistake() {
   let mistakes_cont = document.querySelector("#mistakes")
   let children = mistakes_cont.children
   for (let i = children.length - 1; i > 0; i--) {
      if (!children[i].firstElementChild.classList.contains("smallerdot")) {

         children[i].firstElementChild.classList.add("smallerdot")
         if (i == 1) {
            console.log("loss")
            endGame();
         }
         return
      }
   }
}


function endGame(){
   const categoryTiles = []
   for(let category of gameData.categories){
      const tiles = [];
      for(let title of category.elements){
         tiles.push(tileByTitle(title));
      }
      categoryTiles.push(tiles);
   }

   let i = 0;
   function nextAnimation(e) {
      const cT = categoryTiles[i];
      console.log(cT)
      if(cT == undefined) {
         // All categories have been merged so display end screen
         winScreen();
         return;
      }
      if(cT[0] != undefined) {
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