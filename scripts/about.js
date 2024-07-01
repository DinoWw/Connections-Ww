import { popUp } from "./modules/popUp.js"

function setUp() {
   let red = document.querySelector("#redakcija")
   red.addEventListener("click", e => {
      navigator.clipboard.writeText(red.textContent);
      popUp("Copied to clipboard")
   })
}


setUp()

