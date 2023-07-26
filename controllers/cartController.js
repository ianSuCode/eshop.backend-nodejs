const Cart = require('../models/Cart')

const getCartProducts = async (req, res) => {
  const carts = await Cart.find({ userId: req.UserInfo.id })
    .populate('product', 'id name categoryId description price imageUrl')
    .select('-createdAt -updatedAt -userId')
  res.json(carts)
}

const createOrUpdateToCart = async (req, res) => {
  const { productId, count } = req.body
  const cart = await Cart.findOneAndUpdate(
    { productId, userId: req.UserInfo.id },
    { productId, count, userId: req.UserInfo.id },
    { upsert: true }
  )

  res.status(201).json({ status: 'ok' })
}

const deleteByProductid = async (req, res) => {
  await Cart.findOneAndDelete({productId: req.params.productid})
  res.status(200).json({status: 'ok'})
}

const clear = async(req, res) => {
  await Cart.deleteMany({ userId: req.UserInfo.id })
  res.status(200).json({status: 'ok'})
}

module.exports = {
  getCartProducts,
  createOrUpdateToCart,
  deleteByProductid,
  clear
}
