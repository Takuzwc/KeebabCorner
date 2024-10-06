const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//const paymentRouter = require('./routes/paymentRouter');
const orderRouter = require('./routes/orderRouter');
const contactRouter = require('./routes/contactRouter');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//app.use('/api/v1/', paymentRouter);
app.use('/api/v1/', contactRouter);
app.use('/api/v1/', orderRouter);

module.exports = app;
