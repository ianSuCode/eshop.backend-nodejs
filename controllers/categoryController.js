const Category = require('../models/Category')

const getCategories = async (req, res) => {
  const categories = await Category.find().lean().exec()

  if (!categories?.length) {
    return res.status(400).json({ message: 'No categories found' })
  }

  return res.json(categories)
}

module.exports = {
  getCategories,
}
