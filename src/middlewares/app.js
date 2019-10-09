const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {DB_URL} = require('../config/constants.js');
const Clip = require('../models/UrlShorten.js');

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
  //res.setHeader('Access-Control-Allow-Origin', '*'); //Don't think we need to CORS here.
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  console.log('Response headers set');
  next();
});

app.use(bodyParser.json());
app.use(cookieParser()); //Parse the cookie data (User ID).

app.get('/', (req, res) => {
	Clip.find({
    created_by: req.cookies.userID //Find all clips created by this user.
	})
	.then((clips) => { //Pass the user's clips to the view engine to render the customized view for this user.
		res.render('../index', {userClips: clips});
	});
});

app.post('/api/clip', (req, res) => {
  
});

app.delete('/api/clip/:id', (req, res) => {
  
});

module.exports = app;
