const CartItem = require('../models/CartItem')
const Product = require('../models/Product')

const getItems = async (req, res) => {
  const carts = await CartItem.find({ userId: req.UserInfo.id })
    .populate('product', 'id name categoryId description price imageUrl')
    .select('-createdAt -updatedAt -userId')
  res.json(carts)
}

const createOrUpdateItem = async (req, res) => {
  const { productId, count } = req.body
  const product = await Product.findById(productId)
  if (product) {
    await CartItem.findOneAndUpdate(
      { productId, userId: req.UserInfo.id },
      { productId, count, userId: req.UserInfo.id },
      { upsert: true }
    )
    res.status(200).json({ status: 'success' })
  } else {
    res.status(400).json({ message: 'Product not found' })
  }
}

const deleteItem = async (req, res) => {
  await CartItem.findOneAndDelete({ productId: req.params.productid, userId: req.UserInfo.id })
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
