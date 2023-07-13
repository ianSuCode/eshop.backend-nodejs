require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const logger = require('./utils/logger')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/connectDB')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB()

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

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
  console.error(err)
  logger.writeError(err)
})
