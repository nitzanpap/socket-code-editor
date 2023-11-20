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
  min: 0,
  max: 20,
  idleTimeoutMillis: 8000,
  connectionTimeoutMillis: 0,
  createTimeoutMillis: 8000,
  acquireTimeoutMillis: 8000,
  reapIntervalMillis: 1000,
  createRetryIntervalMillis: 100,
});
