import dotenv from 'dotenv';

const parsedEnv = dotenv.config();

const { PORT, DB_URL } = parsedEnv.parsed;
//console.log(DATABASEURL);

module.exports = {
  PORT: process.env.PORT || PORT,
  DB_URL: process.env.DB_URL || DB_URL,
  domainName: process.env.HOSTNAME
}
