const User = require('../models/User')
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').lean() // .select('-password'): do not return the password field
  if (!users?.length) {
    return res.status(400).json({ message: 'No users found' })
  }
  res.json(users)
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

const updateUser = async (req, res) => {
  const { id, email, password, roles, active } = req.body
  if (
    !id ||
    !email ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== 'boolean'
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  if (user.email !== email) {
    return res.status(400).json({ message: 'id and email did not match' })
  }

  user.roles = roles
  user.active = active
  if (password) {
    user.password = await bcrypt.hash(password, 10)
  }

  const updatedUser = await user.save()

  res.json({ message: `${updatedUser.email} updated` })
}

const deleteUser = async (req, res) => {
  const { id } = req.body
  if (!id) {
    return res.status(400).json({ message: 'User ID Required' })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ messaage: 'User not found' })
  }

  const result = await user.deleteOne()

  const reply = `${result.email} with ID ${result._id} deleted`

  res.json(reply)
}

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser
}
