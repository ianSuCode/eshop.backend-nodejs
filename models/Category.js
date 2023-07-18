const mongoose = require('mongoose')
const idTransformPlugin = require('../utils/idTransformPlugin')

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  }
})

categorySchema.plugin(idTransformPlugin)

module.exports = mongoose.model('category', categorySchema)
