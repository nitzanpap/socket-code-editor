import { pool } from './connection.js';

await pool.connect();

export async function getAllCodeBlocksTitles() {
  try {
    const queryStr = 'SELECT id, title FROM code_blocks;';
    const res = await pool.query(queryStr);
    const data = res.rows;
    return data;
  } catch (err) {
    return console.error('Error executing query', err.stack);
  }
}

export async function getCodeBlock(id) {
  console.log(id);
  try {
    const queryStr = 'SELECT id, title, code FROM code_blocks;';
    const res = await pool.query(queryStr, [id]);
    const data = res.rows;
    return data;
  } catch (err) {
    return console.error('Error executing query', err.stack);
  }
}
