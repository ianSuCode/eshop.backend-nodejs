const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUserInfo = (user) => ({
  id: user.id,
  email: user.email,
  roles: user.roles
})

const getAccessToken = (userInfo) => {
  return jwt.sign({ UserInfo: userInfo }, process.env.JWT_SECRET, {
    expiresIn: '15m'
  })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const foundUser = await User.findOne({ email }).exec()

  const match = await bcrypt.compare(password, foundUser.password)
  if (!match) return res.status(401).json({ message: 'Wrong email or password' })

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: 'Inactive' })
  }

  const userInfo = createUserInfo(foundUser)
  const accessToken = getAccessToken(userInfo)

  res.json({ accessToken, userInfo })
}

const getUserInfo = (req, res) => {
  jwt.verify(req.params.jwt, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' })
    const { id, email } = decoded.UserInfo
    const foundUser = await User.findOne({ _id: id, email }).exec()

    if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

    const userInfo = createUserInfo(foundUser)
    res.json(userInfo)
  })
}

module.exports = {
  login,
  getUserInfo
}
