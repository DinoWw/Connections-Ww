import { loadGame } from "./gameLoader.js";
import { removeWinScreen } from "./endScreen.js";
import { metaData } from "./globals.js";
import { returnButtons } from "./buttons.js";

export { toggleMenu, loadMenu };

function toggleMenu() {

   if (document.querySelector(".endscreen").classList.contains("show"))
      removeWinScreen()

   let menuContainer = document.querySelector(".menu-container")
   menuContainer.classList.toggle("menu-show")
   if (menuContainer.classList.contains("menu-show")) {
      document.querySelector(".overlay").classList.add("show")
   }
   else {
      document.querySelector(".overlay").classList.remove("show");
   }

}

function collapseMenu() {
   document.querySelector(".menu-container").classList.remove("menu-show")
   document.querySelector(".overlay").classList.remove("show");
}

function loadMenu() {
   document.querySelector(".menu-button").addEventListener("click", toggleMenu)
   //document.querySelector(".menu-button").addEventListener("click", removeWinScreen)
   document.querySelector(".overlay").addEventListener("click", collapseMenu)

   // fill game manager
   const gameHome = document.getElementById("game-menu");

   // TODO: metaData
   for (const gameNameAndJson of Object.entries(metaData.visibleGames).reverse()) {
      const btn = newGameButton(gameNameAndJson[0], gameNameAndJson[1]);
      gameHome.appendChild(btn);
   }

}


function newGameButton(text, fileName) {
   const p = document.createElement('p');
   // TODO: not text but title... but it's stored in a different file so maybe fix that
   p.innerText = text
   const div = document.createElement('div')
   div.classList.add("menu-option")
   div.appendChild(p);
   div.gameToLoad = fileName;
   // TODO: implement
   div.addEventListener("click", loadGameHandler);

   return div;
}

async function loadGameHandler(e) {
   returnButtons()
   loadGame(e.target.gameToLoad);
}
