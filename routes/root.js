const express = require('express')
const router = express.Router()
const path = require('path')

// matches either the string "/" or the string "/index" (with or without the ".html" extension).
router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router
