export { showTutorial, removeTutorial }

function showTutorial() {

   document.querySelectorAll(".endscreen").forEach(elem => elem.classList.remove("show"))

   document.querySelector(".tutorial").classList.add("show")
   document.querySelector(".overlay").classList.add("show")

}

function removeTutorial() {

   document.querySelector(".tutorial").classList.remove("show")
   document.querySelector(".overlay").classList.remove("show")

}
