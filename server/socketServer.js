import { createServer } from 'http';
import { Server } from 'socket.io';
import clc from 'cli-color';
import { app } from './httpServer.js';

// Initializing webSocket server
export const server = createServer(app);
export const io = new Server(server, {
  // TODO: Reset this cors config only to the react deployed site, and to localhost:3000
  cors: { origin: ['http://localhost:3000', 'https://socket-code-editor-server.onrender.com/'] },
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
