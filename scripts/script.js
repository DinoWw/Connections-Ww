import { gameData } from "./modules/globals.js"
import { shuffle, deselectAllHandler, submit } from "./modules/buttons.js";
import { createTile, fixTileOrder } from "./modules/tiles.js";
import { removeWinScreen, copyToClipboard } from "./modules/endScreen.js";
import { toggleMenu, loadMenu } from "./modules/menu.js";
import { categoryByElement } from "./modules/globals.js";


// TODO: trebamo napravit da ova funkcija bude re-callable sa argumentom gamea
//    mayb, mayb ne, discuss
//    msm moze se handleat i sa dodatnim funkcijama
async function onLoad() {

   init();
   if (!localStorage.guesses) {
      localStorage.setItem("guesses", "")
   }

   // append event listeners on buttons

   const deselectButton = document.querySelector("#deselect")
   deselectButton.addEventListener("click", deselectAllHandler)

   const submitButton = document.querySelector("#submit")
   submitButton.addEventListener("click", submit)


   const shuffleButton = document.querySelector("#shuffle")
   shuffleButton.addEventListener("click", shuffle)


   // win screen 

   document.querySelector(".copy-button").addEventListener("click", copyToClipboard)

   document.querySelector(".overlay").addEventListener("click", removeWinScreen)

   // mozda staviti jednu istu klasu oboma elementima
   document.querySelector(".popup").addEventListener("animationend", event => {
      event.target.style.visibility = "visible"
   })
   document.querySelector(".overlay").addEventListener("animationend", event => {
      event.target.style.visibility = "visible"
   })

   // one away
   document.querySelector(".one-away").addEventListener("animationend", event => {
      event.target.classList.remove("show")
   })


   loadMenu()

}



function init() {

   // TODO: refactor into separate file
   const tileHome = document.getElementById("tiles");


   if (!gameData.initial || gameData.initial == []) {
      gameData.categories.forEach((category, ic) => {
         category.elements.forEach((term, it) => {
            const newTile = createTile(term, category.title, it, ic, false);

            tileHome.appendChild(newTile);
         })
      })
      // annoying for testing
      shuffle();
   }
   else {
      gameData.initial.forEach((row, i) => {
         row.forEach((title, j) => {
            tileHome.appendChild(createTile(title, categoryByElement(title), j, i, false));
         })
      })
   }
   fixTileOrder();

   // TODO: handle if title is undefined
   document.querySelectorAll(".gameTitle").forEach(el => el.textContent = gameData.title);

}


console.log("HERE : (")
window.addEventListener("gamedataloaded", () => {
   console.log("event recieved")
   onLoad();
}
);

// nyt official colors: #A0C359 #F8DF6E #B2C4E5 #B881B9
