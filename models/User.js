const mongoose = require('mongoose')

const idTransformPlugin = require('../utils/idTransformPlugin')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    roles: {
      type: [String],
      default: ['User']
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

userSchema.plugin(idTransformPlugin)

module.exports = mongoose.model('user', userSchema)
