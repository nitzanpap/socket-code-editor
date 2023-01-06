import { app } from './routes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import clc from 'cli-color';
import { printMentorId, printUserSocket } from './utils/loggingFunctions.js';

export const mentor = { socketId: undefined };

// Initializing webSocket server
export const server = createServer(app);

// TODO: Rewrite cors configuration to only allow the local and deployed frontend origins
export const io = new Server(server, {
  cors: {
    origin: '*',
    allowedHeaders: '*',
  },
});

// The mentor is the first user to connect to the server.
// If he disconnects, then the first user to connect afterwards will become the mentor,
// regardless of other active connections.
io.on('connection', (socket) => {
  // Handle mentor connect
  if (isMentor(socket.id)) {
    printUserSocket(true, socket.id);
    mentor.socketId = socket.id;
    socket.emit('Server Connect', {type: 'mentor'});
    // Handle mentor disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${clc.greenBright(socket.id)}`);
      mentor.socketId = undefined;
      printMentorId(mentor.socketId);
    });
    // Handle student connect
  } else {
    printUserSocket(false, socket.id);
    socket.emit('Server Connect', {type: 'student'});
    // If the student changes his code, send the changes to the mentor
    socket.on('Code Change', (newCode) => {
      console.log('New code received.');
      io.to(mentor.socketId).emit('Code Change', newCode);
    });
    // Handle student disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${clc.cyan(socket.id)}`);
    });
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${clc.yellow('http://localhost:' + process.env.PORT)}`);
});

function isMentor(id) {
  return mentor.socketId === undefined || id === mentor.socketId;
}
