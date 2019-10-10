import dotenv from 'dotenv';

dotenv.config();

const Constants = {
  PORT: process.env.PORT,
  DATABASEURL: process.env.DB_URL,
  domainName: 'trim.herokuapp.com'
}

export default Constants;
