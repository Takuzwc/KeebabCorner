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

// Endpoint to save the payment details
exports.createPayment = async (req, res) => {
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
};
