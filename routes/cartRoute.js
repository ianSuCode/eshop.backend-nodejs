const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router
  .route('/')
  .get(cartController.getItems)
  .post(cartController.createOrUpdateItem)

router.route('/remove/:productid').delete(cartController.deleteItem)
router.route('/clear').delete(cartController.clear)

module.exports = router
