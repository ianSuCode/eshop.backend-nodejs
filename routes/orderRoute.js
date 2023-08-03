const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router
  .route('/')
  .get(orderController.getOrders)
  .post(orderController.createOrders)

module.exports = router
