import { Component } from 'react';
import './AboutPage.css';
import { Order_main_component } from '../../../public/components/main_components/Ordering_main_component/ordering_main_component';
import { Nav_main_component } from '../../../public/components/main_components/Nav_main_component/nav_main_component';
import { Footer_main_component } from '../../../public/components/main_components/Footer_main_component/footer_main_component';
import { ContactForm } from '/Users/Taku/Documents/git_Workspace/KeebabCorner/client/public/components/componentList/contactForm/contactForm.jsx';
import { aboutText } from '../../../public/components/componentList/box_menu_comp/box_menu_data';

export function AboutText() {
  const contents = aboutText.map(item => (
    <li key={item.id}>
      <h1>ABOUT US</h1>
      <p>{item.content}</p>
    </li>
  ));
  return <ul>{contents}</ul>;
}

export class AboutPage extends Component {
  render() {
    return (
      <>
        <div className="user_component">
          <Nav_main_component />
          <Order_main_component>
            <AboutText />
          </Order_main_component>
          <ContactForm />
          <Footer_main_component />
        </div>
      </>
    );
  }
}
