import { Component } from 'react';
import './ordering_main_component.css';
import PropTypes from 'prop-types';

export class Order_main_component extends Component {
  render() {
    return <div className="orderbox-parent">{this.props.children}</div>;
  }
}

// export const Order_main_component = ({ children }) => {
//   return (
//     <div className="orderbox-parent">
//       {/* Existing content of Order_main_component */}
//       {children}
//     </div>
//   );
// };

Order_main_component.propTypes = {
  children: PropTypes.node,
};
