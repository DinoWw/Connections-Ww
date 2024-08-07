
import { emoji } from "./resultsLogger.js";
import { gameData } from "./globals.js";

export { winScreen, copyToClipboard, removeWinScreen };


function winScreen() {
   // remove if existingrAll(".endscreen").forEach(elem => elem.classList.remove("show"))

   document.querySelector(".endscreen").classList.add("show")
   document.querySelector(".overlay").classList.add("show")
   document.getElementById("copypasta").innerHTML = emoji();
   // ? document.getElementById("game-author").textContent = 

   //document.querySelector(".win-text").textContent = won ? "WIN" : "LOSS";

   // current workaround until global variable won implemented
   if (gameData.won == true) {
      document.querySelector(".win-text").textContent = "WIN"
   }
   else if (gameData.lost == true) {
      document.querySelector(".win-text").textContent = "LOSS"
   }
   else {
      document.querySelector(".win-text").textContent = "SCORE"

   }
}

function copyToClipboard() {
   let text =
      `${document.querySelector(".gameTitle").textContent}
${document.querySelector("#copypasta").innerHTML.replaceAll("<br>", "\n")}
netwwork.duckdns.org/connections\
`

   navigator.clipboard.writeText(text);

   const button = document.querySelector(".copy-button")
   button.classList.remove("black-button")
   button.classList.add("white-button")
   button.textContent = "Copied!"

}

function removeWinScreen() {
   if (document.querySelector(".endscreen").classList.contains("show")) {
      document.querySelector(".overlay").classList.remove("show")
      document.querySelector(".endscreen").classList.remove("show")
   }
}