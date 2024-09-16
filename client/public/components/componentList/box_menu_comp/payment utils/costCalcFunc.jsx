import PropTypes from 'prop-types';
import { cards } from '../box_menu_data.js';
import { meatTypes } from '../box_menu_data.js';
import { sauceType } from '../box_menu_data.js';

export function costCalFunc({ orders }) {
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

  return totalCost;
}

costCalFunc.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onCheckout: PropTypes.func.isRequired,
};
