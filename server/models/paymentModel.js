const mongoose = require('mongoose');
const slugify = require('slugify');

const paymentSchema = new mongoose.Schema({
  cardName: String,
  cardNumber: String,
  expiryDate: String,
  cvv: String,
  orders: [],
  totalCost: String,
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
