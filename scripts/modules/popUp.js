export { popUp }


function popUp(text) {
   let popup = document.querySelector(".popup")
   popup.textContent = text
   popup.classList.add("show")

}