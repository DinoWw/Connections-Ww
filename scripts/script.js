import { json } from "./modules/globals.js"
import { shuffle, deselectAllHandler, submit } from "./modules/buttons.js";
import { createTile, fixTileOrder } from "./modules/tiles.js";
import { removeWinScreen, copyToClipboard } from "./modules/endScreen.js";
import { toggleMenu } from "./modules/menu.js";


async function onLoad() {

   fetch('data/game.json').then(async response => {

      // update so reference passed to buttonFunctions doesn't break
      await response.json().then((data) => {
         for (let key in data) {
            json[key] = data[key];
         }
      });

      init();
   })

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

   document.querySelector(".copy-button").addEventListener("click", copyToClipboard)

   document.querySelector(".overlay").addEventListener("click", removeWinScreen)

   // mozda staviti jednu istu klasu oboma elementima
   document.querySelector(".popup").addEventListener("animationend", event => {
      event.target.style.visibility = "visible"
   })
   document.querySelector(".overlay").addEventListener("animationend", event => {
      event.target.style.visibility = "visible"
   })

   document.querySelector(".menu-button").addEventListener("click", toggleMenu)

}



function init() {

   const tileHome = document.getElementById("tiles");
   json.categories.forEach((category, ic) => {
      category.elements.forEach((term, it) => {

         const newTile = createTile(term, category.title, it, ic, false);

         if(json.initial){
            // TODO: if initial order is present, handle positions differently
         }

         tileHome.appendChild(newTile);
      })
   })

   if(!json.initial || json.initial == []){
      // TODO: uncomment, its just annoying for testing
      //shuffle();
   }


   fixTileOrder();

}


onLoad()
// nyt official colors: #A0C359 #F8DF6E #B2C4E5 #B881B9
