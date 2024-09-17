const mongoose = require('mongoose');
const slugify = require('slugify');

const contactSchema = new mongoose.Schema({
  subject: String,
  name: String,
  phone: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
