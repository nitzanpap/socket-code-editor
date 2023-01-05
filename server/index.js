import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
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

const app = express();

// TODO: Reset this cors config only to the react deployed site, and to localhost:3000
app.use(cors());
// app.use(cors({ origin: '*' }));
app.use(morganFormat);
app.use(express.json());

// Initializing webSocket server
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000' },
});

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

io.on('connection', (socket) => {
  console.log(`User connected, socket id: ${clc.cyan(socket.id)}`);
  socket.emit('Server Connect', 'Connected to socket.');

  socket.on('disconnect', () => {
    console.log(`User disconnected, socket id: ${clc.cyan(socket.id)}`);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${clc.yellow('http://localhost:' + process.env.PORT)}`);
});
