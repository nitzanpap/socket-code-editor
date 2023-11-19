import { pool } from './connection.js';
import { mockCodeBlocks } from './mock/mockCodeBlocks.js';
import createCodeBlockQueryStr from './sqlQueries/create/createCodeBlock.js';
import createTableQueryStr from './sqlQueries/create/createTable.js';
import getAllCodeBlocksQueryStr from './sqlQueries/read/readCodeBlocksTableTitles.js';

await pool.connect();

export async function getAllCodeBlocksTitles() {
  try {
    const res = await pool.query(getAllCodeBlocksQueryStr);
    const data = res.rows;
    return data;
  } catch (err) {
    return console.error('Error executing query', err.stack);
  }
}

export async function getCodeBlock(id) {
  try {
    const queryStr = 'SELECT id, title, code, solution FROM code_blocks WHERE id = $1;';
    const res = await pool.query(queryStr, [id]);
    const data = res.rows;
    return data;
  } catch (err) {
    return console.error('Error executing query', err.stack);
  }
}

export const updateCodeBlock = async (id, newCode) => {
  try {
    const queryStr = 'UPDATE code_blocks SET code = $1 WHERE id = $2;';
    await pool.query(queryStr, [newCode, id]);
  } catch (err) {
    return console.error('Error executing query', err.stack);
  }
}

export async function createTable() {
  try {
    await pool.query(createTableQueryStr);
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}

export const createExampleCodeBlocks = async () => {
  try {
    const codeBlocks = mockCodeBlocks;
    for (const codeBlock of codeBlocks) {
      await pool.query(createCodeBlockQueryStr, [
        codeBlock.title,
        codeBlock.code,
        codeBlock.code,
      ]);
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
};
