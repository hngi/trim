const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {DB_URL, PORT} = require('../config/constants.js');

import initRoutes from './routes/routes';

const app = express();

mongoose.connect(DB_URL)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
	});
	
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  //res.setHeader('Access-Control-Allow-Origin', '*'); //Don't think we need CORS here.
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  console.log('Response headers set');
  next();
});

app.use(bodyParser.json());
app.use(cookieParser()); //Parse the cookie data (User ID).

initRoutes(app);

app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));
