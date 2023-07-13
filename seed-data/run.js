require('dotenv').config()
const bcrypt = require('bcrypt')

const connectDB = require('../config/connectDB')
const User = require('../models/User')
const Product = require('../models/Product')

const products = require('./productData.json')

connectDB()

const importData = async () => {
  try {
    const hashedPwd = await bcrypt.hash('admin', 10)
    const userAdmin = {
      email: 'admin@iansucode.com',
      password: hashedPwd,
      roles: ['User', 'Admin'],
      active: true
    }

    await User.deleteMany({})
    await User.create(userAdmin)

    await Product.deleteMany({})
    await Product.insertMany(products)

    console.log('Seed Data Import Success')

    process.exit()
  } catch (error) {
    console.error('Error with data import', error)
    process.exit(1)
  }
}

importData()
