import { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './box_menu.css';
import './boxMenuSize_section.css';
import { cards } from './box_menu_data.js';
import Boxfood from '/Users/Taku/Documents/git_Workspace/KeebabCorner/client/src/assets/images/box_food_img.png';
import './box_menuReceipt.css';

// ReceiptTable Component
export function ReceiptTable({ orders, onCheckout }) {
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
            const cost =
              cards.find(card => card.name === order.size)?.cost || 0;
            return (
              <tr key={index}>
                <td>{order.quantity}</td>
                <td>{order.size}</td>
                <td>{(order.quantity * cost).toFixed(2)}</td>
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

// KebabCard Component
const KebabCard = ({ kebab, index, onUpdate }) => {
  const [sauce, setSauce] = useState(kebab.sauce || '');
  const [meat, setMeat] = useState(kebab.meat || '');
  const [quantity, setQuantity] = useState(kebab.quantity || 1);

  const handleSauceChange = e => {
    setSauce(e.target.value);
    onUpdate(index, { ...kebab, sauce: e.target.value, quantity });
  };

  const handleMeatChange = e => {
    setMeat(e.target.value);
    onUpdate(index, { ...kebab, meat: e.target.value, quantity });
  };

  const handleQuantityChange = amount => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      onUpdate(index, { ...kebab, sauce, meat, quantity: newQuantity });
    }
  };

  return (
    <div className="kebab-card">
      <h3>
        {index + 1} {kebab.size}
      </h3>
      <img src={Boxfood} alt="kebab" className="food-image" />
      <div>
        <label>
          Select Sauce:
          <select
            value={sauce}
            className="select-sauce-section"
            onChange={handleSauceChange}
          >
            <option className="choices" value="">
              Select
            </option>
            <option className="choices" value="garlic">
              Garlic
            </option>
            <option className="choices" value="yogurt">
              Yogurt
            </option>
            <option className="choices" value="chili">
              Chili
            </option>
            <option className="choices" value="tahini">
              Tahini
            </option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Select Meat:
          <select
            value={meat}
            className="select-meat-section"
            onChange={handleMeatChange}
          >
            <option className="choices" value="">
              Select
            </option>
            <option className="choices" value="chicken">
              Chicken
            </option>
            <option className="choices" value="beef">
              Beef
            </option>
            <option className="choices" value="lamb">
              Lamb
            </option>
            <option className="choices" value="falafel">
              Falafel
            </option>
          </select>
        </label>
      </div>
      <div className="quantity-control">
        <button onClick={() => handleQuantityChange(-1)}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <span className="counter">{quantity}</span>
        <button onClick={() => handleQuantityChange(1)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

KebabCard.propTypes = {
  kebab: PropTypes.shape({
    size: PropTypes.string.isRequired,
    sauce: PropTypes.string,
    meat: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

// KebabList Component
const KebabList = ({ kebabs, onUpdate, addKebab }) => {
  return (
    <div className="kebab-builder">
      <div className="size-control">
        <button className="btn-size" onClick={() => addKebab('small')}>
          Small Kebab
        </button>
        <button className="btn-size" onClick={() => addKebab('medium')}>
          Medium Kebab
        </button>
        <button className="btn-size" onClick={() => addKebab('large')}>
          Large Kebab
        </button>
      </div>
      <ul>
        {kebabs.map((kebab, index) => (
          <li key={index}>
            <KebabCard kebab={kebab} index={index} onUpdate={onUpdate} />
          </li>
        ))}
      </ul>
    </div>
  );
};

KebabList.propTypes = {
  kebabs: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.string.isRequired,
      sauce: PropTypes.string,
      meat: PropTypes.string,
      quantity: PropTypes.number,
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  addKebab: PropTypes.func.isRequired,
};

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
