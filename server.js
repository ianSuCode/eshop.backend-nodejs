require('dotenv').config()
require('express-async-errors') // catch errors without using try/catch blocks
const express = require('express')
const app = express()
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./config/connectDB')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB(() => {
  const message = `Server running on port ${PORT}`
  app.listen(PORT, () => console.log(message))
})

app.use(cors())

app.use(express.json())

app.use(cookieParser())

app.get('/api/hello', (req, res) =>
  res.json({ message: 'Hello iansucode.eshop.backend-nodejs!' })
)

app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/product', require('./routes/productRoute'))
app.use('/api/category', require('./routes/categoryRoute'))
app.use('/api/cart', require('./routes/cartRoute'))

app.all('*', (req, res) => res.status(404).json({ message: '404 Not Found' }))

app.use(errorHandler)
