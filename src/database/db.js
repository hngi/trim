const mongoose = require('mongoose');
const { DATABASEURL } = require('../config/constants')

class Database {
  /*constructor() {
    this._connect();
	}*/

	/**Create a database connection. */
  _connect() {
    mongoose
      .connect(DATABASEURL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Database connected');
      })
      .catch(err => {
        console.error(err);
      });
  }
}

module.exports = new Database();

