const mongoose = require('mongoose')

const idTransformPlugin = require('../utils/idTransformPlugin')

const orderSchema = mongoose.Schema(
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
    },
    state: { // new -> processing -> shipping -> done; cancel
      type: String
    }
  },
  {
    timestamps: true
  }
)

orderSchema.plugin(idTransformPlugin)

orderSchema.virtual('user', {
  ref: 'user',
  localField: 'userId', 
  foreignField: '_id',
  justOne: true 
});

orderSchema.virtual('product', {
  ref: 'product',
  localField: 'productId', 
  foreignField: '_id',
  justOne: true 
});

module.exports = mongoose.model('order', orderSchema)
