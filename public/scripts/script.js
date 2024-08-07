import { shuffle, deselectAllHandler, submit } from "./modules/buttons.js";
import { removeWinScreen, copyToClipboard } from "./modules/endScreen.js";
import { loadMenu, toggleMenu } from "./modules/menu.js";
import { loadGame } from "./modules/gameLoader.js";
import { winScreen } from "./modules/addMistake.js";
import { showTutorial } from "./modules/tutorial.js"
import { removeTutorial } from "./modules/tutorial.js";

// MAIN:
onLoad();



// TODO: trebamo napravit da ova funkcija bude re-callable sa argumentom gamea
//    mayb, mayb ne, discuss
//    msm moze se handleat i sa dodatnim funkcijama
async function onLoad() {
   // loads tiles and initializes gameState
   await loadGame("game2.json");

   // append event listeners on buttons

   const deselectButton = document.querySelector("#deselect");
   deselectButton.addEventListener("click", deselectAllHandler);

   const submitButton = document.querySelector("#submit");
   submitButton.addEventListener("click", submit);

   const shuffleButton = document.querySelector("#shuffle");
   shuffleButton.addEventListener("click", shuffle);

   document.querySelector("#view-results").addEventListener("click", e => winScreen())

   // win screen 

   document.querySelector(".copy-button").addEventListener("click", copyToClipboard);
   document.querySelector(".more-button").addEventListener("click", removeWinScreen);
   document.querySelector(".more-button").addEventListener("click", toggleMenu);

   // should be 1 function to remove all overlay elements but alas...
   document.querySelector(".overlay").addEventListener("click", removeWinScreen);
   document.querySelector(".overlay").addEventListener("click", removeTutorial);

   document.getElementById("tutorial-button").addEventListener("click", showTutorial);
   document.querySelector(".gotit-button").addEventListener("click", removeTutorial);

   loadMenu();

}





// nyt official colors: #A0C359 #F8DF6E #B2C4E5 #B881B9
