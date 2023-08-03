const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')
const adminOnly = require('../middleware/adminOnly')

router
  .route('/')
  .post(userController.createNewUser)

module.exports = router
