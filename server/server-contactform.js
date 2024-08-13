const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

//Connection to MongoDB server
mongoose.connect('mongodb://localhost:27017/contactFormDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const contactSchema = new mongoose.Schema({
  subject: String,
  name: String,
  phone: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// API endpoint to handle form submission
app.post('/api/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).send('Contact information saved successfully!');
  } catch (err) {
    res.status(400).send('Error saving contact information', err);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
