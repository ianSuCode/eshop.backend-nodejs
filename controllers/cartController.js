const Cart = require('../models/Cart')

const getCartProducts = async (req, res) => {
  const carts = await Cart.find({ userId: req.UserInfo.id })
    .populate('productId', 'name category price imageUrl')
    .lean()
    .exec()
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

const deleteCart = async (req, res) => {
  await Cart.findByIdAndRemove(req.params.id)
  res.status(200).json({status: 'ok'})
}

module.exports = {
  getCartProducts,
  createOrUpdateToCart,
  deleteCart
}
