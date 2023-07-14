const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'product',
      required: true
    },
    count: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('cart', cartSchema)
