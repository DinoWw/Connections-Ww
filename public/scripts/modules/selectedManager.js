import { gameData } from "./globals.js";

export { addToSelected, remAllFromSelected, remFromSelected };



function addToSelected(str) {
   gameData.selected.add(str)
   let deselectButton = document.querySelector("#deselect")
   let submitButton = document.querySelector("#submit")
   if (deselectButton.classList.contains("button-unclickable")) {
      deselectButton.classList.toggle("button-unclickable");
   }
   if (gameData.selected.size == 4 && submitButton.classList.contains("button-unclickable")) {
      submitButton.classList.toggle("button-unclickable");
   }
}

function remFromSelected(str) {
   gameData.selected.delete(str);
   updateButtonClickability();
}
function remAllFromSelected() {
   gameData.selected.clear();
   updateButtonClickability();
}
function updateButtonClickability() {
   let deselectButton = document.querySelector("#deselect")
   let submitButton = document.querySelector("#submit")

   if (gameData.selected.size == 4) {
      submitButton.classList.remove("button-unclickable");
      deselectButton.classList.remove("button-unclickable");
   }
   else if (gameData.selected.size == 0) {
      submitButton.classList.add("button-unclickable")
      deselectButton.classList.add("button-unclickable");
   }
   else {
      submitButton.classList.add("button-unclickable")
      deselectButton.classList.remove("button-unclickable");
   }
}
