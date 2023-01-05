import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import clc from 'cli-color';

dotenv.config();

// Middleware

// Console Formatting
const morganFormat = morgan(function (tokens, req, res) {
  return [
    clc.yellow(tokens.method(req, res)),
    clc.cyan(tokens.url(req, res)),
    clc.green(tokens.status(req, res)),
    clc.white(tokens.res(req, res, 'content-length')),
    '-',
    clc.italic(tokens['response-time'](req, res), 'ms'),
  ].join(' ');
});

export const app = express();

// TODO: Reset this cors config only to the react deployed site, and to localhost:3000
app.use(
  cors({ origin: ['http://localhost:3000', 'https://socket-code-editor-server.onrender.com/'] })
);
app.use(morganFormat);
app.use(express.json());

// GET
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

app.get('/code-blocks-titles', (req, res) => {
  const data = [
    { name: 'Async case' },
    { name: 'Event loop' },
    { name: 'Promise' },
    { name: 'Generator function' },
  ];
  res.status(200).json(data);
});
