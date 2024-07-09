const express = require('express')
const router = express.Router()
const fs = require('fs')


router.post("/addGame", function (req, res) {
   let body = req.body.game

   // check 
   // dodat check dal postocji isti game 
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
      let metaData = JSON.parse(fs.readFileSync("./public/data/metaData.json", "utf8"))
      let gameName = body.title
      let gameFileName = "game_" + Object.keys(metaData.visibleGames).length + ".json"

      // create file
      fs.writeFile("./public/data/" + gameFileName, gameJSON, (err) => {
         if (err) throw err;
         console.log('The file has been saved! Filename: ' + gameFileName);
      })


      // edit metaData visible games
      metaData.visibleGames[gameName] = gameFileName
      fs.writeFile("./public/data/metaData.json", JSON.stringify(metaData), (err) => {
         if (err) throw err;
         console.log('MetaData has been altered');
      })


      res.sendStatus(200)
   }
   else {
      res.sendStatus(404)
   }

})



module.exports = { /*"path": "/connections",*/ "router": router }