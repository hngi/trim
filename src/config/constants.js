import dotenv from 'dotenv';

dotenv.config();

export const { PORT, DB_URL, SECRET_KEY } = process.env;
