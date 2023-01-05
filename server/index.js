import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import clc from 'cli-color';

dotenv.config();

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

app.use(cors());
app.use(morganFormat);
app.use(express.json());

const server = createServer(app);
const io = new Server(server);

// GET
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket);
  socket.emit('Hello', 'World');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${clc.yellow('http://localhost:' + process.env.PORT)}`);
});
