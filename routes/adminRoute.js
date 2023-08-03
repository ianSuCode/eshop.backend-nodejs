const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const orderController = require('../controllers/orderController')
const verifyJWT = require('../middleware/verifyJWT')
const adminOnly = require('../middleware/adminOnly')

router.use([verifyJWT, adminOnly])

// user
router.get('/user', userController.getAllUsers)
router.patch('/user/active', userController.updateUserActive)
router.delete('/user/:id', userController.deleteUser)

// order
router.get('/order', orderController.getAllOrders)
router.patch('/order/change-state', orderController.changeOrderState)
router.delete('/order/:id', orderController.deleteOrder)

module.exports = router
