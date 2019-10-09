let mongoose = require('mongoose');
require('dotenv').config();

const server = process.env.DATABASEURL;
class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(server, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Database connected');
      })
      .catch(err => {
        console.error(err);
      });
  }
}

module.exports = new Database();
