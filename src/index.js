import Express from 'express';
import cors from 'cors';
import debug from 'debug';
import bodyParser from 'body-parser';
import routes from './routes/index';
import { PORT } from './config/constants';

/**
* @fileOverview - application entry point
* @requires - express
* @requires - body-parser
* @requires - cors
* @requires - ./routes
* @exports - index.js
* */

// declare constants
const app = new Express();
const port = PORT || 3000;

// declare middleware
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

// 3rd party middleware
app.use(cors('*'));

routes(app);

// listen to app port
app.listen(port, debug('app')(`App listening on port ${port}`));

export default app;
