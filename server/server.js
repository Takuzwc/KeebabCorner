const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//PostgreSQL connection setup
const pool = new Pool({
  user: 'Taku',
  host: 'localhost',
  database: 'keebab-payments',
  password: process.env.POSTGRESS_PWD,
  port: 5432,
});
//Connection to MongoDB server
mongoose.connect('mongodb://localhost:27017/contactFormDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cors());

const Contact = mongoose.model('Contact', contactSchema);

// Endpoint to save the payment details
app.post('/save-payment', async (req, res) => {
  const { orders, totalCost } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO payments (order_details, total_cost) VALUES ($1, $2) RETURNING *',
      [JSON.stringify(orders), totalCost]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving payment');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
