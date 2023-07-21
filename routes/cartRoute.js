const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
  .get(cartController.getCartProducts)
  .post(cartController.createOrUpdateToCart)

router.route('/remove-product/:productid').delete(cartController.deleteByProductid)

module.exports = router
