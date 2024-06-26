import { pool } from './connection.js';
import { mockCodeBlocks } from './mock/mockCodeBlocks.js';
import createCodeBlockQueryStr from './sqlQueries/create/createCodeBlock.js';
import createCodeBlocksTableQueryStr from './sqlQueries/create/createTable.js';
import getAllCodeBlocksQueryStr from './sqlQueries/read/readCodeBlocksTableTitles.js';

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
    const queryStr =
      'SELECT id, title, code, solution FROM code_blocks WHERE id = $1;';
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
};

export async function createInitialData() {
  try {
    await createCodeBlocksTable();
    await createExampleCodeBlocks();
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}

async function createCodeBlocksTable() {
  try {
    await pool.query(createCodeBlocksTableQueryStr);
  } catch (err) {
    if (err.code === '42P07') {
      console.log('Code blocks table already exists');
      return;
    }
    console.error('Error executing query', err.stack);
  }
}

const createExampleCodeBlocks = async () => {
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
