const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
  .get(cartController.getCartProducts)
  .post(cartController.createOrUpdateToCart)

router.route('/:id').delete(cartController.deleteCart)

module.exports = router
