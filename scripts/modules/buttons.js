import { selected, json } from "./globals.js";
import { remAllFromSelected } from "./selectedManager.js";
import { resolveCategory } from "./resolveCategory.js";
import { addMistake } from "./addMistake.js";
import { logGuess } from "./resultsLogger.js";
import { winScreen } from "./endScreen.js";

export { shuffle, deselectAll, deselectAllHandler, submit };


// shuffle button
function shuffle() {
   const tiles = document.querySelectorAll(".tile:not(.solved)");

   // map compensates for solved tiles taking up space near top
   const available = [...Array(tiles.length).keys()].map(x => x + 16 - tiles.length);
   // shuffle code. It IS correct, https://blog.codinghorror.com/the-danger-of-naivete/
   for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
   }


   [...tiles].forEach((tile) => {
      let order = available.pop();
      tile.style.order = order;
      tile.x = order % 4;
      tile.y = Math.floor(order / 4);
   });


}

// deselect button
function deselectAllHandler() {
   if (document.querySelector("#deselect").classList.contains("unclickable")) return;
   deselectAll(true);
}

function deselectAll(visuallyDeselect) {
   if (visuallyDeselect) {
      const tiles = document.querySelectorAll(".tile")
      for (let tile of tiles) {
         if (selected.has(tile.firstElementChild.firstElementChild.textContent)) {
            tile.firstElementChild.classList.toggle("selected")
            //console.log('!:', tile.firstElementChild.firstElementChild.textContent)
         }
      }
   }
   remAllFromSelected();
}

// submit button 
let guessed = 0; // treba napravit pametno ali sad sam umorna

function submit() {
   if (!document.querySelector("#submit").classList.contains("unclickable")) {
      const selectedArr = Array.from(selected)
      const selectedEls = [];

      const tiles = document.querySelectorAll(".tile:not(.solved)");

      for (const tEl of tiles) {
         if (selectedArr.includes(tEl.firstElementChild.firstElementChild.innerHTML)) {
            selectedEls.push(tEl);
         }
      }

      if (selectedEls.length != 4) throw new Error("invalid submit");

      logGuess(selectedEls.map(x => x.category));

      if (selectedEls.every(e => e.category == selectedEls[0].category)) {

         console.log("success")
         // visually
         resolveCategory(json.categories.find(c => c.title == selectedEls[0].category), selectedEls);
         deselectAll(false);
         guessed = guessed + 1
         //if (guessed == 4) {
         winScreen()
         //}
      }
      else {
         if (selectedEls.some(e => selectedEls.filter(f => f.category == e.category).length == 3)) {
            console.log("one away")
            document.querySelector(".one-away").classList.toggle("show")
         }

         console.log("fail")
         document.querySelector("#submit").classList.toggle("unclickable")
         addMistake()
         deselectAll(true); //? 
         // locsk elements, animation
      }
   }
}

