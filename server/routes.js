import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import clc from 'cli-color';
import {
  createInitialData,
  getAllCodeBlocksTitles,
  getCodeBlock,
} from './db/dbFunctions.js';

export const app = express();

// Middleware

// Console Formatting
export const morganFormat = morgan(function (tokens, req, res) {
  return [
    clc.yellow(tokens.method(req, res)),
    clc.cyan(tokens.url(req, res)),
    clc.green(tokens.status(req, res)),
    clc.white(tokens.res(req, res, 'content-length')),
    '-',
    clc.italic(tokens['response-time'](req, res), 'ms'),
  ].join(' ');
});

// TODO: Rewrite cors configuration to only allow the local and deployed frontend origins
app.use(cors());
app.use(morganFormat);
app.use(express.json());

// GET
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

app.get('/api/get/code-blocks-titles', async (req, res) => {
  const data = await getAllCodeBlocksTitles();
  res.status(200).json(data);
});

app.get('/api/get/code-block:id', async (req, res) => {
  const id = req.params.id.slice(1);
  const data = await getCodeBlock(id);
  res.status(200).json(data);
});

app.get('/db/createInitialData', async (req, res) => {
  try {
    await createInitialData();
    res.status(200).json({
      message: 'Table created successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Table creation failed',
    });
  }
});
