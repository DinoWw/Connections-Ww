
import { wrongInput, checkIfRepeatingWords } from "./modules/wrongInputHandler.js";

const game = {}

// should be a global var or in a .json
const colors = ["#FFF78D", "#A4DCFF", "#A173BC", "pink"]
let existingNames = null

async function onLoad() {
   document.getElementById("submit-game").addEventListener("click", checkForErrors)
   let i = 0
   document.querySelectorAll(".category-input").forEach(c => {
      c.style.backgroundColor = colors[i]
      i++
   })

   existingNames = await fetch("./data/metaData.json").then(res => res.json())
   existingNames = existingNames.visibleGames
}

function checkForErrors() {

   // refreshing
   if (Object.values(game).length != 0) Object.keys(game).forEach(key => delete game[key])
   document.querySelectorAll("input").forEach(inp => inp.style.backgroundColor = "white")

   // setting initial vars
   let index = 0
   let success = true
   game.categories = []

   // each category and its items
   document.querySelectorAll(".category-input").forEach(cat => {
      let itemlist = cat.querySelector(".items-inp").value.split(",").map(item => item.trim().toUpperCase())
      //itemlist = itemlist.map(item => item.trim())

      if (itemlist.length != 4) {
         wrongInput(cat.querySelector(".items-inp"))
         success = false
      }

      let catname = cat.querySelector(".category-inp").value.trim().toUpperCase()
      if (!catname) {
         wrongInput(cat.querySelector(".category-inp"))
         success = false
      }
      game.categories.push({
         "title": catname,
         "color": colors[index],
         "elements": itemlist
      })
      index++
   })
   if (checkIfRepeatingWords(game.categories)) {
      // wrongInput() // sve cateogry inputs ? 
      success = false
   }

   // custom order
   let order = document.querySelector(".custom-order")
   if (order.value) {
      game.initial = order.value.split(",")
   } else {
      game.initial = []
   }

   // game name
   let name = document.querySelector(".game-name").value
   console.log(existingNames)
   if (!name || Object.keys(existingNames).includes(name)) {
      wrongInput(document.querySelector(".game-name"))
      success = false
   }
   else game.title = name

   // game author
   let author = document.querySelector(".author").value
   if (!author) {
      wrongInput(document.querySelector(".author"))
      success = false
   }
   else game.author = author


   if (success) correctInput(game)

}


async function correctInput(gameObj) {
   const res = await fetch("/connections/addGame", {
      mode: 'cors',
      method: "post",
      headers: {
         "Content-type": "application/json",
         //"Content-type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({ game: gameObj })
   })
   console.log("response", res)
}


onLoad();
