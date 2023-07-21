const mongoose = require('mongoose')

const idTransformPlugin = require('../utils/idTransformPlugin')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String
  }
})

productSchema.plugin(idTransformPlugin)

module.exports = mongoose.model('product', productSchema)
