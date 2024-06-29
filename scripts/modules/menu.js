import { loadGame } from "./gameLoader.js";

export { toggleMenu, loadMenu };

function toggleMenu() {
   document.querySelector(".menu-container").classList.toggle("menu-show")
   document.querySelector(".overlay").classList.toggle("show");
}

function collapseMenu(){
   document.querySelector(".menu-container").classList.remove("menu-show")
   document.querySelector(".overlay").classList.remove("show");
}

function loadMenu() {
   document.querySelector(".menu-button").addEventListener("click", toggleMenu)
   document.querySelector(".overlay").addEventListener("click", collapseMenu)

   // fill game manager
   const gameHome = document.getElementById("game-menu");

   // TODO: metaData
   for(const gameName of ["game", "game2"]){//of metaData.visibleGames){
      const btn = newGameButton(gameName);
      gameHome.appendChild(btn);
   }

}


function newGameButton(text){
   const p = document.createElement('p');
   // TODO: not text but title... but it's stored in a different file so maybe fix that
   p.innerText = text
   const div = document.createElement('div')
   div.classList.add("menu-options")
   div.appendChild(p);
   div.gameToLoad = text;
   // TODO: implement
   div.addEventListener("click", loadGameHandler);
   
   return div;
}

async function loadGameHandler(e) {
   loadGame(e.target.gameToLoad);
}
