import { Component, useState } from 'react';
import './box_menu.css';
import './boxMenuSize_section.css';
import './box_menuReceipt.css';
import { KebabList } from './kebabList.jsx';
import { PaymentForm } from './paymentForm.jsx';
import { ReceiptTable } from './receiptTable.js';

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
