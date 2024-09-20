import { Component } from 'react';
import './contactForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

export class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      name: '',
      phone: '',
      email: '',
      message: '',
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { subject, name, phone, email, message } = this.state;
    const contactData = { subject, name, phone, email, message };

    try {
      const response = await fetch('http://localhost:8000/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      if (response.ok) {
        alert('Contact information submitted successfully!');
        this.setState({
          subject: '',
          name: '',
          phone: '',
          email: '',
          message: '',
        });
      } else {
        alert('Failed to submit contact information.');
      }
    } catch (err) {
      console.error('Error submitting', err);
      alert('Failed to submit contact information.');
    }
  };
  render() {
    return (
      <>
        <div className="contact-container">
          <div className="contact-info">
            <h2>Contact</h2>
            <h3>How To Find Us</h3>
            <div className="info-item">
              <span className="info-label">ADDRESS</span>
              <p>
                {' '}
                <FontAwesomeIcon
                  className="iconColors"
                  icon={faLocationDot}
                />{' '}
                2331 Roadscross Ave, Building 200 B Sendiago
              </p>
            </div>
            <div className="info-item">
              <span className="info-label">PHONE</span>
              <p>
                {' '}
                <FontAwesomeIcon className="iconColors" icon={faPhone} /> +36
                123 456 789
              </p>
            </div>
            <div className="info-item">
              <span className="info-label">
                <FontAwesomeIcon className="iconColors" icon={faEnvelope} />
                EMAIL
              </span>
              <p>something@keebabCorner.com</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={this.state.subject}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={this.state.message}
                onChange={this.handleChange}
              ></textarea>
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      </>
    );
  }
}
