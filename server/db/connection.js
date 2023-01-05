import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

export const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: true,
  max: 20,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});
