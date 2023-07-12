const { writeError } = require('../utils/logger')

const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  writeError(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`)
  res.status(500).json({ message: err.message })
}

module.exports = errorHandler