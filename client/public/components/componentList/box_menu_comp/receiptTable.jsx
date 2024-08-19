import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './box_menu.css';
import './boxMenuSize_section.css';
import { cards } from './box_menu_data.js';
import { meatTypes } from './box_menu_data.js';
import { sauceType } from './box_menu_data.js';
import { suaceTargetValue } from './KebabCard.jsx';
import './box_menuReceipt.css';

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
