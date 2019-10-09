import dotenv from 'dotenv';

dotenv.config();

const Constants = {
  PORT: process.env.PORT,
  DATABASEURL: process.env.DATABASEURL,
  domainName: 'trim.herokuapp.com'
}

export default Constants;
