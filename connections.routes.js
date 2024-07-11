const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require("path")


// write metaData.json on server boot

let dir = fs.readdirSync(path.resolve(__dirname, "./public/data"), "utf8")
let metaDataContents = { visibleGames: {}, invisibleGames: {} }
dir.forEach(file => {
   if (file.startsWith("game")) {
      filedata = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./public/data", file)))
      metaDataContents.visibleGames[(filedata.title)] = file
   }
})
// write to metadata file
fs.writeFileSync(path.resolve(__dirname, "./public/data/metaData.json"), JSON.stringify(metaDataContents), (err) => {
   if (err) throw err;
   console.log('MetaData has been written');
}, { flag: "w" })



router.use(express.static(path.join(__dirname, 'public')));


router.post("/addGame", function (req, res) {
   let body = req.body.game

   // check 
   let goodInput = true
   if (body.title && body.author) {

      let items = new Set()
      let titles = new Set()
      for (cat of body.categories) {
         titles.add(cat.title)
         cat.elements.forEach(elem => items.add(elem))
         if (!cat.color) {
            goodInput = false
            break
         }
      };
      if (items.size != 16 || titles.size != 4) goodInput = false

   } else {
      goodInput = false

   }

   // creating game file
   if (goodInput) {
      let gameJSON = JSON.stringify(body)
      let metaData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./public/data/metaData.json"), "utf8"))
      let gameName = body.title
      let numOfGames = Object.keys(metaData.visibleGames).length
      let gameFileName = "game_" + numOfGames + ".json"
      //let gameFileName = "game_" + gameName.replace(/\s+/g, '') + "_" + body.author.replace(/\s+/g, '') + ".json"

      // checks if filename already exists
      let existsAlready = fs.readdirSync(path.resolve(__dirname, "./public/data")).includes(gameFileName)
      while (existsAlready) {
         numOfGames++
         gameFileName = "game_" + numOfGames + ".json"
         existsAlready = fs.readdirSync(path.resolve(__dirname, "./public/data")).includes(gameFileName)

      }

      // create file
      fs.writeFile(path.resolve(__dirname, "./public/data/", gameFileName), gameJSON, (err) => {
         if (err) throw err;
         console.log('The file has been saved! Filename: ' + gameFileName);
      })


      // edit metaData visible games
      metaData.visibleGames[gameName] = gameFileName
      fs.writeFile(path.resolve(__dirname, "./public/data/metaData.json"), JSON.stringify(metaData), (err) => {
         if (err) throw err;
         console.log('MetaData has been altered');
      })


      res.sendStatus(200)
      return
   }

   res.sendStatus(404)


})



module.exports = { "path": "/connections", "router": router }