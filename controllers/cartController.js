const CartItem = require('../models/CartItem')

const getItems = async (req, res) => {
  const carts = await CartItem.find({ userId: req.UserInfo.id })
    .populate('product', 'id name categoryId description price imageUrl')
    .select('-createdAt -updatedAt -userId')
  res.json(carts)
}

const createOrUpdateItem = async (req, res) => {
  const { productId, count } = req.body
  await CartItem.findOneAndUpdate(
    { productId, userId: req.UserInfo.id },
    { productId, count, userId: req.UserInfo.id },
    { upsert: true }
  )
  res.status(200).json({ status: 'success' })
}

const deleteItem = async (req, res) => {
  await CartItem.findOneAndDelete({ productId: req.params.productid })
  res.status(200).json({ status: 'success' })
}

const clear = async (req, res) => {
  await CartItem.deleteMany({ userId: req.UserInfo.id })
  res.status(200).json({ status: 'success' })
}

module.exports = {
  getItems,
  createOrUpdateItem,
  deleteItem,
  clear
}
