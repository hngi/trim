let mongoose = require('mongoose');
let {DATABASEURL}=require('../config/constant')
class Database {
  constructor() {
    this._connect();
  }

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

