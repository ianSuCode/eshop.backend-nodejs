const adminOnly = (req, res, next) => {
  if (!req.UserInfo?.roles?.includes('Admin')) {
    return res.status(403).json({ message: 'Forbidden (Admin only)' })
  }
  next()
}

module.exports = adminOnly