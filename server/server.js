const express = require('express');
const mongoose = require('mongoose');
const app = require('./app.js');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//Connection to MongoDB server
// mongoose.connect('mongodb://localhost:27017/keebabDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'))
  .catch((error) => console.error('DB connection error:', error));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
