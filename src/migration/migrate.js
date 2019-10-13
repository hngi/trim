let mongoose = require('mongoose');
import UrlShorten from "../models/UrlShorten";
import { DB_URL } from '../config/constants';
class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    mongoose
      .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(async () => {
        console.log('Database connected');
        let list = await UrlShorten.db.db.listCollections({
          name: UrlShorten.collection.name
        }).toArray()
        if (list.length !== 0) {
          await UrlShorten.collection.drop();
          console.log('collection %s deleted', UrlShorten.collection.name);
          mongoose.connection.close();
        } else {
          console.log('collection %s does not exist', UrlShorten.collection.name);
          mongoose.connection.close();
        }
        mongoose.connection.close();
      })
      .catch(err => {
        console.error(err);
        mongoose.connection.close();
      });
  }
}

new Database();