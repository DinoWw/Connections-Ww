export { popUp }


function popUp(text) {
   console.log("pop")
   let popup = document.querySelector(".popup")
   popup.textContent = text
   popup.classList.add("show")

}