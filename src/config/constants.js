import dotenv from 'dotenv';

const parsedEnv = dotenv.config();

const { PORT, DATABASEURL } = parsedEnv.parsed;
//console.log(DATABASEURL);

module.exports = {
  PORT: process.env.PORT || PORT,
  DB_URL: process.env.DB_URL || DATABASEURL,
  domainName: 'trim.herokuapp.com'
}
