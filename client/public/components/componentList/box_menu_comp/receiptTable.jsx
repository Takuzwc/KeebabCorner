import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './box_menu.css';
import './boxMenuSize_section.css';
import { cards } from './box_menu_data.js';
import { meatTypes } from './box_menu_data.js';
import { sauceType } from './box_menu_data.js';
import './box_menuReceipt.css';

// ReceiptTable Component
export function ReceiptTable({ orders, onCheckout }) {
  const totalCost = orders.reduce((total, order) => {
    const handleCostSize = cards.find(e => e.name === order.size)?.cost || 0;

    const handleCostMeat =
      meatTypes.find(e => e.name === order.meat)?.cost || 0;

    const handleCostSauce =
      sauceType.find(e => e.name === order.sauce)?.cost || 0;

    const orderCost =
      order.quantity * (handleCostSize + handleCostMeat + handleCostSauce);
    return total + orderCost;
  }, 0);

  // a function that takes and array of of inputs and makes calculations
  //The issue with my code is that its using only one point of storing prices for each order
  //It should calculate prices for each order separately.

  return (
    <div>
      <table className="receipt-table">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Sauce & Meat</th>
            <th>Order</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const handleCostSize =
              cards.find(e => e.name === order.size)?.cost || 0;

            const handleCostMeat =
              meatTypes.find(e => e.name === order.meat)?.cost || 0;

            const handleCostSauce =
              sauceType.find(e => e.name === order.sauce)?.cost || 0;
            const orderCost =
              order.quantity *
              (handleCostSize + handleCostMeat + handleCostSauce);
            return (
              <tr key={index}>
                <td>{order.quantity}</td>
                <td>
                  {order.sauce} / {order.meat}
                </td>
                <td>{order.size}</td>
                <td>{orderCost.toFixed(2)}</td>
              </tr>
            );
          })}
          <tr>
            <td>-</td>
            <td>Total</td>
            <td>-</td>
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
