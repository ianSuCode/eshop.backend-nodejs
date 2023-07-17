const Product = require('../models/Product')

const getProducts = async (req, res) => {
  const products = await Product.find(req.query).lean().exec()

  if (!products?.length) {
    return res.status(400).json({ message: 'No products found' })
  }

  return res.json(products)
}

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).lean().exec()
  if (!product) {
    return res.status(400).json({ message: 'Product not found' })
  }
  res.json(product)
}

module.exports = {
  getProducts,
  getProductById,
}
