require('dotenv').config()
const bcrypt = require('bcrypt')

const connectDB = require('../config/connectDB')
const CartItem = require('../models/CartItem')
const Order = require('../models/Order')
const User = require('../models/User')
const Category = require('../models/Category')
const Product = require('../models/Product')

const categoryData = require('./categoryData.json')
let productData = require('./productData.json')

connectDB(() => console.log('Start seeding data'))

const importData = async () => {
  try {
    await CartItem.deleteMany({})
    await Order.deleteMany({})

    const hashedPwd = await bcrypt.hash('0000', 10)
    const userAdmin = {
      email: 'iansucode@mail.com',
      password: hashedPwd,
      roles: ['User', 'Admin'],
      active: true
    }

    await User.deleteMany({})
    await User.create(userAdmin)

    await Category.deleteMany({})
    const categories = await Category.insertMany(categoryData)
    const categoryMap = {}
    categories.forEach((c) => {
      categoryMap[c.name] = c.id
    })

    productData = productData.map((p) => {
      const { category, ...newObject } = p
      newObject['categoryId'] = categoryMap[category]
      return newObject
    })

    await Product.deleteMany({})
    await Product.insertMany(productData)

    console.log('Seed Data Import Success')

    process.exit()
  } catch (error) {
    console.error('Error with data import', error)
    process.exit(1)
  }
}

importData()
