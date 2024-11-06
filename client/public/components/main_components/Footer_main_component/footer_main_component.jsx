import { Component } from 'react';
import './footer_main_component.css';
import { footerPagelinks } from './footer_data.js';
import Visa from '/../client/src/assets/images/visa.png';
import Paypal from '/../client/src/assets/images/paypal.png';
import Mastercard from '/../client/src/assets/images/mastercard.png';
import Applepay from '/../client/src/assets/images/applepay.png';
import Blik from '/../client/src/assets/images/blik.png';
import Logo from '/../client/src/assets/images/logo.png';
//import FooterBack from '/Users/Taku/Documents/git_Workspace/KeebabCorner/src/assets/images/footerImage.png';

export function FooterPages() {
  const footerItems = footerPagelinks.map(link => (
    <li key={link.id}>
      <a className="btns-links">{link.name}</a>
    </li>
  ));
  return <ul>{footerItems}</ul>;
}

export function PaymentMethods() {
  const paymentMethodList = (
    <li className="paymentMethods">
      <img className="btns-pay" src={Visa} />
      <img className="btns-pay" src={Paypal} />
      <img className="btns-pay" src={Mastercard} />
      <img className="btns-pay" src={Applepay} />
      <img className="btns-pay" src={Blik} />
    </li>
  );
  return <ul>{paymentMethodList}</ul>;
}
export class Footer_main_component extends Component {
  render() {
    return (
      <div className="footer-parent">
        <img className="footerlogo-section" src={Logo} />

        <div className="footerDiscreption-section">
          <div className="footer-wording">
            <p>
              We are a fast food company only here to cater for your
              <br />
              satisfaction to the best. We like to keep everything as natural as
              <br />
              posable because this is who we are. Be guaranteed to enjoy
              <br />
              every bite of our meals. We wish you well.
            </p>
          </div>
          <div className="footer-pages">
            <FooterPages />
          </div>
          <div className="payment-types">
            <PaymentMethods />
          </div>
        </div>
      </div>
    );
  }
}
