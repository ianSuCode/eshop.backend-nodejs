require('dotenv').config()
const express = require('express')
require('express-async-errors') // catch errors without using try/catch blocks
const app = express()
const { writeInfo, writeError } = require('./utils/logger')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/connectDB')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB()

app.use(express.json())

app.get('/api/hello', (req, res) =>
  res.json({ message: 'Hello iansucode.eshop.backend-nodejs!' })
)

app.use('/api/user', require('./routes/userRoute'))

app.all('*', (req, res) => res.status(404).json({ message: '404 Not Found' }))

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  const message = `Server running on port ${PORT}`
  app.listen(PORT, () => console.log(message))
  writeInfo(message)
})

mongoose.connection.on('error', (err) => {
  console.error(err)
  writeError(err)
})
