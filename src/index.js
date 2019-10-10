const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

require('./database/db');
const { PORT } = require('./config/constants')

const initRoutes = require('./routes/routes');

const app = express();

app.use((req, res, next) => {
  //res.setHeader('Access-Control-Allow-Origin', '*'); //Don't think we need CORS here.
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  //console.log('Response headers set');
  next();
});

// load local css and js files
app.use(express.static(path.join(__dirname, '../public')));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));
//console.log(path.join(__dirname, 'views'))

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(cookieParser()); //Parse the cookie data (User ID).

initRoutes(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
