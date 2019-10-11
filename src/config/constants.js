import dotenv from 'dotenv';

const parsedEnv = dotenv.config();

export const { PORT, DB_URL, DOMAIN_NAME, SECRET_KEY } = process.env;
