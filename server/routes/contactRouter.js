const express = require('express');
const contactController = require('./../controllers/contactController');
const router = express.Router();

router.route('/api/contact').post(contactController.createContact);

module.exports = router;
