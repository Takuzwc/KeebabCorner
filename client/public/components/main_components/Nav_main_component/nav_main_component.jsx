import { Component } from 'react';
import './nav_main_component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Logo from '/Users/Taku/Documents/git_Workspace/KeebabCorner/client/public/images/logo.png';

export class Nav_main_component extends Component {
  render() {
    return (
      <div className="nav-parent">
        <div className="nav-bar">
          <img className="nav-logo" src={Logo} alt="logo" />
          <input type="checkbox" className="toggle-menu" />
          <div className="hamburger"></div>
          <ul className="navlinks">
            <li>
              <a type="button" className="nav-btn" href="/">
                Home
              </a>
            </li>
            <li>
              <a type="button" className="nav-btn" href="#">
                Menu
              </a>
            </li>
            <li>
              <a type="button" className="nav-btn" href="/about">
                About Us
              </a>
            </li>

            <li>
              <a type="button" className="nav-btn call-btn" href="#">
                <FontAwesomeIcon icon={faPhone} />
                +27 123 456 789
              </a>
            </li>
          </ul>
        </div>

        <div className="home-sms">
          <h1>
            KEEBAB_STOP <br />
            CORNER
          </h1>
          <p>
            KEEBAB FOR THE SPECIAL PEOPLE IN POLAND TAKE A PIP INTO OUR VERY
            <br />
            TASTY PRODUCT, CHEERS, SMACZNEGO
          </p>
          <div className="home-btns">
            <button className="home-sms-btn homeBtn-left" href="/about">
              About Us
            </button>
            <button className="home-sms-btn homeBtn-right">
              See Menu
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
