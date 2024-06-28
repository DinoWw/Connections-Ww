
import { emoji } from "./resultsLogger.js";

export { winScreen, copyToClipboard, removeWinScreen };

function winScreen() {
   console.log("pop")
   document.querySelector(".popup").classList.toggle("show")
   document.querySelector(".overlay").classList.toggle("show")
   document.getElementById("copypasta").innerHTML = emoji();
}

function copyToClipboard() {
   let text = document.querySelector("#copypasta").innerHTML
   text = text.replaceAll("<br>", "\n");
   text = text.concat(
`
netwwork.duckdns.org/connections\
`
   );
   navigator.clipboard.writeText(text);

   const button = document.querySelector(".copy-button")
   button.style.backgroundColor = "white"
   button.style.color = "black"
   button.textContent = "Copied!"

}

function removeWinScreen() {
   // malo ruzno
   document.querySelector(".overlay").classList.toggle("show")
   document.querySelector(".popup").classList.toggle("show")
   document.querySelector(".overlay").style.visibility = "hidden"
   document.querySelector(".popup").style.visibility = "hidden"
}