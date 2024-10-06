const Contact = require('../models/contactModel');

// API endpoint to handle form submission
exports.createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(200).send('Contact information saved successfully!');
  } catch (err) {
    res.status(400).send('Error saving contact information', err);
  }
};
