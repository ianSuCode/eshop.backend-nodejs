const Order = require('../models/Order')
const CartItem = require('../models/CartItem')

const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.UserInfo.id })
    .populate('product', 'id name price')
  res.json(orders)
}

const getAllOrders = async (req, res) => {
  const orders = await Order.populate('product', 'id name price')
  res.json(orders)
}

const createOrders = async (req, res) => {
  const { productIds } = req.body
  const carts = await CartItem.find({ productId: { $in: productIds } }).lean().exec()

  const newOrders = carts.map(cart => {
    const { productId, count } = cart
    return { productId, count, userId: req.UserInfo.id, state: 'new' }
  })
  await Order.insertMany(newOrders)
  await CartItem.deleteMany({ productId: { $in: productIds } })
  res.status(201).json({ status: 'success' })
}

const deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id)
  res.status(200).json({ status: 'success' })
}

module.exports = {
  getOrders,
  createOrders,
  deleteOrder
}
