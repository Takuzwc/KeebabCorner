import { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './box_menu.css';
import './boxMenuSize_section.css';
import Boxfood from '/Users/Taku/Documents/git_Workspace/KeebabCorner/client/src/assets/images/box_food_img.png';
import './box_menuReceipt.css';

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

// KebabCard Component
export function KebabCard({ kebab, index, onUpdate }) {
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
}
