export { toggleMenu, loadMenu };

function toggleMenu() {
   document.querySelector(".menu-container").classList.toggle("menu-show")
   document.querySelector(".overlay").classList.toggle("show");
}

function collapseMenu(){
   document.querySelector(".menu-container").classList.remove("menu-show")
   document.querySelector(".overlay").classList.remove("show");
}

function loadMenu() {
   document.querySelector(".menu-button").addEventListener("click", toggleMenu)
   document.querySelector(".overlay").addEventListener("click", collapseMenu)

   /* myb dynamically fill depending on number of lvls*/

}