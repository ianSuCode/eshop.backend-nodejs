const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUserInfo = (user) => ({
  id: user.id,
  email: user.email,
  roles: user.roles
})

const getAccessToken = (userInfo) => {
  return jwt.sign({ UserInfo: userInfo }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
  })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const foundUser = await User.findOne({ email }).exec()

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const match = await bcrypt.compare(password, foundUser.password)

  if (!match) return res.status(401).json({ message: 'Unauthorized' })

  const userInfo = createUserInfo(foundUser)
  const accessToken = getAccessToken(userInfo)

  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  )

  // Create secure cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: 'None', //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match expiresIn of refreshToken
  })

  // Send accessToken containing email and roles
  res.json({ accessToken, userInfo })
}

const refresh = (req, res) => {
  const cookies = req.cookies // app.use(cookieParser())

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

  const refreshToken = cookies.jwt

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' })

      const foundUser = await User.findOne({ email: decoded.email }).exec()

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

      const userInfo = createUserInfo(foundUser)
      const accessToken = getAccessToken(userInfo)

      res.json({ accessToken, userInfo })
    }
  )
}

const logout = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie cleared' })
}

module.exports = {
  login,
  refresh,
  logout
}
