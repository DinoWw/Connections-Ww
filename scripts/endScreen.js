
function winScreen() {
   console.log("pop")
   document.querySelector(".popup").classList.toggle("show")
   document.querySelector(".overlay").classList.toggle("show")

}

function copyToClipboard() {
   const text = document.querySelector("#copypasta").textContent
   navigator.clipboard.writeText(text);

   const button = document.querySelector(".copy-button")
   button.style.backgroundColor = "white"
   button.style.color = "black"
   button.textContent = "Copied!"

}

function removeWinScreen() {
   console.log("rem")
   document.querySelector(".overlay").classList.toggle("show")
   document.querySelector(".popup").classList.toggle("show")
}