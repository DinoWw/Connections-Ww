export { toggleMenu, loadMenu };

function toggleMenu() {
   document.querySelector(".menu-container").classList.toggle("menu-show")

}

function loadMenu() {
   document.querySelector(".menu-button").addEventListener("click", toggleMenu)
   /* myb dynamically fill depending on number of lvls*/

}