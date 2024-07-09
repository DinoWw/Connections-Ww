export { popUp }


function popUp(text) {
   document.querySelectorAll(".newpopup").forEach(p => p.remove())

   let popup = document.createElement("p")
   popup.innerHTML = document.querySelector(".popup").innerHTML
   popup.classList.add("popup", "newpopup")
   popup.textContent = text

   setTimeout(() => popup.classList.add("show"), 1)

   setTimeout(() => removePopUp(popup), 3000)
   document.body.appendChild(popup)
}

function removePopUp(popup) {
   if (!popup) return
   popup.classList.remove("show")

   setTimeout(() => popup.remove(), 2000)
}