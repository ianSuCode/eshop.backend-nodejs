const express = require('express')
const app = express()
const path = require('path')
const logger = require('./utils/logger')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500

app.use(express.static('public'))

app.use('/', require('./routes/root'))

app.get('/hello', (req, res) => {
  logger.writeInfo('GET /hello')
  res.send('Hello iansucode.eshop.backend-nodejs!')
})

app.get('/broken', (req, res) => {
  throw new Error('BROKEN')
})

app.all('*', (req, res) => {
  logger.writeWarn(`404: ${req.method} ${req.url}`)
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('text', '404 Not Found')
  }
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
