const express = require('express');
const orderController = require('./../controllers/orderController');
const router = express.Router();

router.route('/payment').post(orderController.createPayment);

module.exports = router;
