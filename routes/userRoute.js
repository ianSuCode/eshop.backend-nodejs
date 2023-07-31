const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')
const adminOnly = require('../middleware/adminOnly')

router
  .route('/')
  .get([verifyJWT, adminOnly], userController.getAllUsers)
  .post(userController.createNewUser)
  .delete([verifyJWT, adminOnly], userController.deleteUser)

router.patch('/active', [verifyJWT, adminOnly], userController.updateUserActive)

module.exports = router
