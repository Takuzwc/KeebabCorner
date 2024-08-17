import { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './box_menu.css';
import './boxMenuSize_section.css';
import { cards } from './box_menu_data.js';
import { meatTypes } from './box_menu_data.js';
import { sauceType } from './box_menu_data.js';
import './box_menuReceipt.css';
import { KebabCard } from './KebabCard.jsx';
import { KebabList } from './kebabList.jsx';
// ReceiptTable Component
export function ReceiptTable({ orders, onCheckout }) {
  const handleCostSize = orders.reduce(
    (orderSum, order) =>
      orderSum + cards.find(e => e.name === order.size)?.cost || 0,
    0
  );

  const handleCostMeat = orders.reduce(
    (orderSum, order) =>
      orderSum + meatTypes.find(e => e.name === order.size)?.cost || 0,
    0
  );

  const handleCostSaurce = orders.reduce(
    (orderSum, order) =>
      orderSum + sauceType.find(e => e.name === order.size)?.cost || 0,
    0
  );

  const handleCost = handleCostSize + handleCostMeat + handleCostSaurce;
  const totalCost = orders.reduce(
    (total, order) =>
      total +
      order.quantity *
        (cards.find(card => card.name === order.size)?.cost || 0),
    0
  );
  return (
    <div>
      <table className="receipt-table">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Order</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr key={index}>
                <td>{order.quantity}</td>
                <td>{order.size}</td>
                <td>{(order.quantity * handleCost).toFixed(2)}</td>
              </tr>
            );
          })}
          <tr>
            <td>-</td>
            <td>Total</td>
            <td>{totalCost.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={onCheckout} className="btn-checkout">
        CHECKOUT <FontAwesomeIcon icon={faCartShopping} />
      </button>
    </div>
  );
}

ReceiptTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onCheckout: PropTypes.func.isRequired,
};

// PaymentForm Component
const PaymentForm = ({ onPayment }) => {
  return (
    <div className="payment-form">
      <h2>Payment</h2>
      <div className="sum-total">
        <FontAwesomeIcon className="cart-icon" icon={faCartShopping} />
        <h3>$43.99</h3>
      </div>

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
};

PaymentForm.propTypes = {
  onPayment: PropTypes.func.isRequired,
};

// KebabCard.propTypes = {
//   kebab: PropTypes.shape({
//     size: PropTypes.string.isRequired,
//     sauce: PropTypes.string,
//     meat: PropTypes.string,
//     quantity: PropTypes.number,
//   }).isRequired,
//   index: PropTypes.number.isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };

// ToggleMenuComponent Component
export function ToggleMenuComponent() {
  const [isOriginal, setIsOriginal] = useState(true);
  const [kebabs, setKebabs] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  const handleKebabUpdate = (index, updatedKebab) => {
    const newKebabs = kebabs.map((kebab, i) =>
      i === index ? updatedKebab : kebab
    );
    setKebabs(newKebabs);
  };

  const handleAddKebab = size => {
    if (kebabs.length < 3) {
      setKebabs([...kebabs, { size, sauce: '', meat: '', quantity: 1 }]);
    } else {
      alert('You can only order 3 types of kebabs');
    }
  };

  const handleCheckout = () => {
    setIsCheckout(true);
    setIsOriginal(false);
  };

  const handlePayment = () => {
    alert('Payment Successful');
    setKebabs([]);
    setIsOriginal(true);
    setIsCheckout(false);
  };

  return (
    <div className="menu-parent">
      <div className="ingredients-section">
        <h2 className="menu-title">MENU</h2>
        <h3>Place Your Order Below</h3>
      </div>
      <div className="menu-container">
        <div className="kebab-list">
          {isOriginal ? (
            <KebabList
              kebabs={kebabs}
              onUpdate={handleKebabUpdate}
              addKebab={handleAddKebab}
            />
          ) : (
            <ReceiptTable orders={kebabs} onCheckout={handleCheckout} />
          )}
          {!isCheckout && (
            <button
              className="order-control-btn"
              onClick={() => setIsOriginal(!isOriginal)}
            >
              {isOriginal ? 'View Order Summary' : 'Back to Kebab Selection'}
            </button>
          )}
        </div>
        {isCheckout && <PaymentForm onPayment={handlePayment} />}
      </div>
    </div>
  );
}

// BoxMenu Component
export default class BoxMenu extends Component {
  render() {
    return <ToggleMenuComponent />;
  }
}
