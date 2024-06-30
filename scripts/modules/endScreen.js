
import { emoji } from "./resultsLogger.js";

export { winScreen, copyToClipboard, removeWinScreen };

function winScreen(won) {
   document.querySelector(".endscreen").classList.add("show")
   document.querySelector(".overlay").classList.add("show")
   document.getElementById("copypasta").innerHTML = emoji();

   document.querySelector(".win-text").textContent = won ? "WIN" : "LOSS";
}

function copyToClipboard() {
   let text = document.querySelector("#copypasta").innerHTML
   text = text.replaceAll("<br>", "\n");
   text = text.concat(
      `
netwwork.duckdns.org/Connections-Ww\
`
   );
   navigator.clipboard.writeText(text);

   const button = document.querySelector(".copy-button")
   button.classList.remove("black-button")
   button.classList.add("white-button")
   button.textContent = "Copied!"

}

function removeWinScreen() {
   // malo ruzno
   document.querySelector(".overlay").classList.remove("show")
   document.querySelector(".endscreen").classList.remove("show")
}