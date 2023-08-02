const mongoose = require('mongoose')

const idTransformPlugin = require('../utils/idTransformPlugin')

const cartItemSchema = new mongoose.Schema(
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

cartItemSchema.plugin(idTransformPlugin)

cartItemSchema.virtual('product', {
  ref: 'product',
  localField: 'productId', 
  foreignField: '_id',
  justOne: true 
});

module.exports = mongoose.model('cartItem', cartItemSchema)
