import { selected } from "./globals.js";

export { addToSelected, remAllFromSelected, remFromSelected };



function addToSelected(str) {
    selected.add(str)
    let deselectButton = document.querySelector("#deselect")
    let submitButton = document.querySelector("#submit")
    if (deselectButton.classList.contains("unclickable")) {
       deselectButton.classList.toggle("unclickable");
    }
    if (selected.size == 4 && submitButton.classList.contains("unclickable")) {
       submitButton.classList.toggle("unclickable");
    }
 }

 function remFromSelected(str) {
    selected.delete(str);
    updateButtonClickability();
 }
 function remAllFromSelected() {
    selected.clear();
    updateButtonClickability();
 }
 function updateButtonClickability() {
    let deselectButton = document.querySelector("#deselect")
    let submitButton = document.querySelector("#submit")
 
    if (selected.size == 4) {
       submitButton.classList.remove("unclickable");
       deselectButton.classList.remove("unclickable");
    }
    else if (selected.size == 0) {
       submitButton.classList.add("unclickable")
       deselectButton.classList.add("unclickable");
    }
    else {
       submitButton.classList.add("unclickable")
       deselectButton.classList.remove("unclickable");
    }
 }
  