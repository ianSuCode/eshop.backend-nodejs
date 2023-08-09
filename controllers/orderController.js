const Order = require('../models/Order')
const CartItem = require('../models/CartItem')

const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.UserInfo.id }).populate(
    'product',
    'id name price'
  )
  res.json(orders)
}

const getAllOrders = async (req, res) => {
  const result = await Order.aggregate([
    {
      $lookup: {
        // performs a left outer
        from: 'users', // collection to join
        localField: 'userId',
        foreignField: '_id', // field from the documents of the "from" collection
        as: 'user' // output array field
      }
    },
    {
      $unwind: '$user' // deconstructs an array field (the order only have one user, as they have a one-to-many relationship)
    },
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'product'
      }
    },
    {
      $unwind: '$product'
    },
    {
      $group: {
        _id: '$userId',
        userId: { $first: '$userId' }, // 保留第一個userId字段
        user: { $first: '$user' }, // 保留第一個user字段，包含user資訊
        orders: {
          $push: {
            id: '$_id',
            userId: '$userId',
            productId: '$productId',
            product: { name: '$product.name', price: '$product.price' }, // 包含部分的product字段
            count: '$count',
            state: '$state',
            createdAt: '$createdAt',
            updatedAt: '$updatedAt'
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        userId: 1,
        userEmail: '$user.email',
        orders: 1
      }
    }
  ])

  res.json(result)
}

const createOrders = async (req, res) => {
  const productIds = req.body
  const carts = await CartItem.find({ productId: { $in: productIds } })
    .lean()
    .exec()

  const newOrders = carts.map((cart) => {
    const { productId, count } = cart
    return { productId, count, userId: req.UserInfo.id, state: 'new' }
  })
  await Order.insertMany(newOrders)
  await CartItem.deleteMany({ productId: { $in: productIds } })
  res.status(201).json({ status: 'success' })
}

const changeOrderState = async (req, res) => {
  try {
    const { id, state } = req.body
    const filter = { _id: id }
    const update = { $set: { state: state } }
    const options = { new: true }
    const updatedOrder = await Order.findOneAndUpdate(
      filter,
      update,
      options
    )
    if (updatedOrder) {
      // Successfully updated, return the newest updated data back to the user
      res.json({ message: 'success', updatedAt: updatedOrder.updatedAt })
    } else {
      res.status(404).json({ message: 'document not found.' })
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

const deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id)
  res.status(200).json({ message: 'success' })
}

module.exports = {
  getOrders,
  getAllOrders,
  createOrders,
  changeOrderState,
  deleteOrder
}
