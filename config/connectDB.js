const mongoose = require('mongoose')

const { writeInfo, writeError } = require('../utils/logger')

mongoose.connection.on('connecting', () =>
  console.log(`MongoDB connection is Connecting at ${process.env.DATABASE_URI}`)
)
mongoose.connection.on('connected', () =>
  console.log('MongoDB connection established')
)
mongoose.connection.once('open', () => console.log('MongoDB connection open'))

const connectDB = async (cb) => {
  try {
    await mongoose.connect(process.env.DATABASE_URI)
    console.log('mongoose.connect success')
    writeInfo('Server start running')
    if (cb && typeof cb === 'function') cb()
  } catch (err) {
    console.error(err)
    writeError(err)
  }
}

module.exports = connectDB
