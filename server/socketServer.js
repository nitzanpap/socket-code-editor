import { app } from './routes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import clc from 'cli-color';

export const mentor = { socketId: undefined };

// Initializing webSocket server
export const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://socket-code-editor.vercel.app/'],
    // TODO: This may expose the clients to a CSRF attack.
    allowedHeaders: '*',
  },
});

// The mentor is the first user to connect to the server.
// If he disconnects, then the first user to connect afterwards will become the mentor,
// regardless of other active connections.
io.on('connection', (socket) => {
  console.log(`User connected: ${clc.cyan(socket.id)}`);
  // Case of a Mentor connection
  if (isMentor(socket.id)) {
    mentor.socketId = socket.id;
    socket.emit('Server Connect', 'Connected to socket as: Mentor');
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${clc.cyan(socket.id)}`);
      mentor.socketId = undefined;
      printMentorId();
    });
    // Case of a Student connection
  } else {
    socket.emit('Server Connect', 'Connected to socket as: Student', 1, 2);
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${clc.cyan(socket.id)}`);
      printMentorId();
    });
  }
  printMentorId();
});

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${clc.yellow('http://localhost:' + process.env.PORT)}`);
});

function isMentor(id) {
  return mentor.socketId === undefined || id === mentor.socketId;
}

export function printMentorId() {
  console.log(`Current Mentor: ${clc.bgYellow(mentor.socketId)}`);
}
