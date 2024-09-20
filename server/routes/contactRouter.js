const express = require('express');
const contactController = require('./../controllers/contactController');
const router = express.Router();

router.route('/contact').post(contactController.createContact);

module.exports = router;
