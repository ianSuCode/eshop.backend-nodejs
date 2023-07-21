const mongoose = require('mongoose')

const idTransformPlugin = require('../utils/idTransformPlugin')

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

cartSchema.plugin(idTransformPlugin)

cartSchema.virtual('product', {
  ref: 'product',
  localField: 'productId', 
  foreignField: '_id',
  justOne: true 
});

module.exports = mongoose.model('cart', cartSchema)
