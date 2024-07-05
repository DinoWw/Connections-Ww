const express = require('express')
const router = express.Router()



router.post("/addGame", function (req, res) {
   console.log(req.body)
   res.sendStatus(200)
})


module.exports = { /*"path": "/connections",*/ "router": router }