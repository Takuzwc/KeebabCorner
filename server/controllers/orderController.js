const Payment = require('../models/paymentModel');

exports.createPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    await newPayment.save();
    res.status(201).send('Successfully paid');
  } catch (err) {
    res.status(400).send(`Error paying, ${err.message}`);
  }
};
