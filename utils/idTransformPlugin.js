module.exports = function (schema) {
  schema.set('toJSON', {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    },
    virtuals: true
  })
}

/*
example:

  const categorySchema = mongoose.Schema({})
  categorySchema.plugin(idTransformPlugin)
*/
