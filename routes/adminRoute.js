const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const verifyJWT = require('../middleware/verifyJWT')
const adminOnly = require('../middleware/adminOnly')

router.use([verifyJWT, adminOnly])

router
  .route('/order')
  .get(orderController.getAllOrders)

router.post('/order/change-state', orderController.changeOrderState)
router.delete('/order/:id', orderController.deleteOrder)

module.exports = router
