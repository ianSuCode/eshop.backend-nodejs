const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(
    token, 
    process.env.JWT_SECRET, 
    (err, decoded) => {
      if (err) return res.status(401).json({ message: err.message })
      req.UserInfo = decoded.UserInfo
      next()
    })
}

module.exports = verifyJWT
