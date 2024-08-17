import PropTypes from 'prop-types';
import './box_menu.css';
import './boxMenuSize_section.css';
import './box_menuReceipt.css';
import { KebabCard } from './KebabCard.jsx';

// KebabList Component
export function KebabList({ kebabs, onUpdate, addKebab }) {
  return (
    <div className="kebab-builder">
      <div className="size-control">
        <button className="btn-size" onClick={() => addKebab('SMALL')}>
          Small Kebab
        </button>
        <button className="btn-size" onClick={() => addKebab('MEDIUM')}>
          Medium Kebab
        </button>
        <button className="btn-size" onClick={() => addKebab('LARGE')}>
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
}

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
