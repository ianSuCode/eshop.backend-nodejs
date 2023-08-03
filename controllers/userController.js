const User = require('../models/User')
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res) => {
  const result = await User.aggregate([
    {
      $lookup: {
        from: 'orders', // The name of the "orders" collection in the database
        localField: '_id', // Field from the "users" collection to match with the "userId" in the "orders" collection
        foreignField: 'userId', // Field from the "orders" collection to match with the "_id" in the "users" collection
        pipeline: [
          {
            $project: {
              _id: 0,
              id: '$_id', // Include the _id field and rename to id
              state: 1
            }
          }
        ],
        as: 'orders' // The field name to store the matched orders
      }
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        email: 1,
        roles: 1,
        createdAt: 1,
        active: 1,
        orders: 1
      }
    }
  ])

  res.json(result)
}

const createNewUser = async (req, res) => {
  const { email, password } = req.body // app.use(express.json())

  if (!email || !password) {
    return res.status(400).json({ message: 'email and passowrd are required' })
  }

  const duplicate = await User.findOne({ email }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate email' })
  }

  const hashedPwd = await bcrypt.hash(password, 10)

  const userObject = { email, password: hashedPwd }

  const user = await User.create(userObject)

  if (user) {
    res.status(201).json({ message: `New user ${email} created` })
  } else {
    res.status(400).json({ message: 'Invalid user data recevied' })
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'User ID Required' })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ messaage: 'User not found' })
  }

  await user.deleteOne()

  res.status(200).json({ message: 'success' })
}

const updateUserActive = async (req, res) => {
  const { id, active } = req.body
  if (!id) {
    return res.status(400).json({ message: 'User ID Required' })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ messaage: 'User not found' })
  }

  user.active = active
  const updatedUser = await user.save()
  res.json({ message: `${updatedUser.email} active updated to ${active}` })
}

module.exports = {
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserActive
}
