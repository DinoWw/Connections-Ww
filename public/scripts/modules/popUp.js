export { popUp }

document.querySelector(".popup").addEventListener("animationend", event => {
   event.target.classList.remove("show");
});

function popUp(text) {
   let popup = document.querySelector(".popup")
   popup.textContent = text
   popup.classList.add("show")

}