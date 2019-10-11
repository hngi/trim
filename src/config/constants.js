import dotenv from 'dotenv';

dotenv.config();

export const { PORT, DB_URL, DOMAIN_NAME } = process.env;
