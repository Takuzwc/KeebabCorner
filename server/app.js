const express = require('express');
const app = express();
const morgan = require('morgan');

const paymentRouter = require('./routes/paymentRouter');
const contactrouter = require('./routes/contactRouter');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/contact', contactRouter);

module.exports = app;
