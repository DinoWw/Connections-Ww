import { popUp } from "./modules/popUp.js";

const game = {}

// should be a global var or in a .json
const colors = ["#FFF78D", "#A4DCFF", "#A173BC", "pink"]

onLoad();

function onLoad() {
   document.getElementById("submit-game").addEventListener("click", checkForErrors)
   let i = 0
   document.querySelectorAll(".category-input").forEach(c => {
      c.style.backgroundColor = colors[i]
      i++
   })

}

function checkForErrors() {
   // currently not checking if theres repeating items or category names 

   // refreshing
   if (Object.values(game).length != 0) Object.keys(game).forEach(key => delete game[key])
   document.querySelectorAll("input").forEach(inp => inp.style.backgroundColor = "white")

   // setting initial vars
   let index = 0
   let success = true
   game.categories = []

   // each category and its items
   document.querySelectorAll(".category-input").forEach(cat => {
      let itemlist = cat.querySelector(".items-inp").value.split(",").map(item => item.trim())
      //itemlist = itemlist.map(item => item.trim())
      console.log(itemlist)
      if (itemlist.length != 4) {
         wrongInput(cat.querySelector(".items-inp"))
         success = false
      }

      let catname = cat.querySelector(".category-inp").value
      game.categories.push({
         "title": catname,
         "color": colors[index],
         "elements": itemlist
      })
      index++
   })

   // custom order
   let order = document.querySelector(".custom-order")
   if (order.value) {
      game.initial = order.value.split(",")
   } else {
      game.initial = []
   }

   // game name
   let name = document.querySelector(".game-name").value
   if (!name) wrongInput(document.querySelector(".game-name"))
   else game.title = name

   // game author
   let author = document.querySelector(".author").value
   if (!author) wrongInput(document.querySelector(".author"))
   else game.author = author

   console.log(game)

}

function wrongInput(inpElement) {
   console.log("error at", inpElement)
   popUp("cringe")
   if (inpElement.classList.contains("category-input")) popUp("4 categories, comma-separated!")
   inpElement.style.backgroundColor = "#ff8888"
}