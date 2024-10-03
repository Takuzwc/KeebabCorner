import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import '../.././box_menu_comp/box_menu.css';
import '../.././box_menu_comp/boxMenuSize_section.css';
import { cards } from '../box_menu_data.js';
import { meatTypes } from '../box_menu_data.js';
import { sauceType } from '../box_menu_data.js';
import '../.././box_menu_comp/box_menuReceipt.css';
import { costCalFunc } from './costCalcFunc.jsx';
import { PaymentForm } from './paymentForm.jsx';
//import React, { useState } from 'react';

// ReceiptTable Component
export function ReceiptTable({ orders, onCheckout }) {
  const totalCost = costCalFunc({ orders });

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
            <td>
              <FontAwesomeIcon className="cart-icon" icon={faCartShopping} />
              Total
            </td>
            <td>-</td>
            <td>{totalCost.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <PaymentForm orders={orders} totalCost={totalCost} />
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
