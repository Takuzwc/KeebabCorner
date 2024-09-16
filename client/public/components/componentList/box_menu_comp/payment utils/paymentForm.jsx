import PropTypes from 'prop-types';
import '../.././box_menu_comp/box_menu.css';
import '../.././box_menu_comp/boxMenuSize_section.css';
import '../.././box_menu_comp/box_menuReceipt.css';

// PaymentForm Component
export function PaymentForm({ onPayment }) {
  return (
    <div className="payment-form">
      <h2>Payment</h2>

      <form className="paymentform-group">
        <div className="form-children">
          <label>
            <input
              type="text"
              placeholder="Cardholder Name"
              name="cardName"
              required
            />
          </label>
        </div>
        <div className="form-children">
          <label>
            <input
              type="text"
              placeholder="Card Number"
              name="cardNumber"
              required
            />
          </label>
        </div>
        <div className="form-children">
          <label>
            <input
              type="text"
              placeholder="Expiry Date"
              name="expiryDate"
              required
            />
          </label>
        </div>
        <div className="form-children">
          <label>
            <input type="text" placeholder="CVV" name="cvv" required />
          </label>
        </div>
        <button type="button" onClick={onPayment} className="btn-payment">
          Pay
        </button>
      </form>
    </div>
  );
}

PaymentForm.propTypes = {
  onPayment: PropTypes.func.isRequired,
};
