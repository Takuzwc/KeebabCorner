import { Component } from 'react';
import './user_dashboard.css';
import { Order_main_component } from '../../../public/components/main_components/Ordering_main_component/ordering_main_component';
import { Nav_main_component } from '../../../public/components/main_components/Nav_main_component/nav_main_component';
import { Footer_main_component } from '../../../public/components/main_components/Footer_main_component/footer_main_component';
import BoxMenu from '/../client/public/components/componentList/box_menu_comp/box_menu.jsx';

export class User extends Component {
  render() {
    return (
      <>
        <div className="user_component">
          <Nav_main_component />
          <Order_main_component>
            <BoxMenu />
          </Order_main_component>
          <Footer_main_component />
        </div>
      </>
    );
  }
}
