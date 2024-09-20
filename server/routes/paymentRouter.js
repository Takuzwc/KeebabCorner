const express = require('express');
const paymentController = require('./../controllers/paymentController');
const router = express.Router();

router.route('/save-payment').post(paymentController.createPayment);

module.exports = router;
