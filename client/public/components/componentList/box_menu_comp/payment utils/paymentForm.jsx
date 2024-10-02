import PropTypes from 'prop-types';
import React, { useState } from 'react';
import '../.././box_menu_comp/box_menu.css';
import '../.././box_menu_comp/boxMenuSize_section.css';
import '../.././box_menu_comp/box_menuReceipt.css';
import successlogo from './../../../../images/success.png';

export function PaymentForm({ onPayment, orders, totalCost }) {
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Track payment success state
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const { cardName, cardNumber, expiryDate, cvv } = formData;
    const paymentData = {
      cardName,
      cardNumber,
      expiryDate,
      cvv,
      orders, // Include receipt (orders) in the payment data
      totalCost, // Include total cost in the payment data
    };

    try {
      const response = await fetch('http://localhost:8000/api/v1/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData), // Send both payment and receipt data
      });

      if (response.ok) {
        setFormData({
          cardName: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          orders: '',
          totalCost: '',
        });
        setPaymentSuccess(true); // Set payment success to true upon successful payment
      } else {
        alert('Payment failed.');
      }
    } catch (err) {
      console.error('Error submitting payment information.', err);
      alert('Payment failed.');
    }
  };

  return (
    <div className="payment-form">
      {paymentSuccess ? (
        <div className="success-message">
          <img
            src={successlogo}
            alt="Payment success"
            className="success-logo"
          />
          <p>
            Payment successful❗️ Your food will be ready in 15 minutes max😊
          </p>
        </div>
      ) : (
        <div>
          <h2>Payment</h2>
          <form className="paymentform-group" onSubmit={handleSubmit}>
            <div className="form-children">
              <label htmlFor="cardName">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-children">
              <label htmlFor="cardNumber">
                <input
                  type="text"
                  placeholder="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-children">
              <label htmlFor="expiryDate">
                <input
                  type="text"
                  placeholder="Expiry Date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-children">
              <label htmlFor="cvv">
                <input
                  type="text"
                  placeholder="CVV"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <button type="submit" onClick={onPayment} className="btn-payment">
              Pay
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

PaymentForm.propTypes = {
  onPayment: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired, // Expect orders to be passed
  totalCost: PropTypes.number.isRequired, // Expect total cost to be passed
};
