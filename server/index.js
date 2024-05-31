import clc from 'cli-color';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { pool } from './db/connection.js';
import { createInitialData, updateCodeBlock } from './db/dbFunctions.js';
import { app } from './routes.js';
import { printMentorId, printUserSocket } from './utils/loggingFunctions.js';

dotenv.config();
await pool.connect();
console.log('Connected to database');
try {
  createInitialData(pool);
} catch (error) {
  console.log(error);
}

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

    socket.broadcast.emit('New User Connected', 'mentor');
    mentor.socketId = socket.id;
    socket.emit('Server Connect', { type: 'mentor' });

    // Handle mentor disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${clc.greenBright(socket.id)}`);
      socket.broadcast.emit('User Disconnected', 'mentor');
      mentor.socketId = undefined;
      printMentorId(mentor.socketId);
    });

    // Handle student connect
  } else {
    printUserSocket(false, socket.id);

    socket.broadcast.emit('New User Connected', 'student');
    socket.emit('Server Connect', { type: 'student' });

    // If the student changes his code, send the changes to all connected users
    socket.on('Code Change', async (jsonObj) => {
      const obj = JSON.parse(jsonObj);
      console.log('New code received.');
      await updateCodeBlock(obj.codeBlockId, obj.newCode);
      socket.broadcast.emit(`Code Change in ${obj.codeBlockId}`, obj.newCode);
    });

    // Handle student disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${clc.cyan(socket.id)}`);
      socket.broadcast.emit('User Disconnected', 'student');
    });
  }
});

server.listen(process.env.PORT, () => {
  console.log(
    `Server is listening on ${clc.yellow(
      'http://localhost:' + process.env.PORT
    )}`
  );
});

function isMentor(id) {
  return mentor.socketId === undefined || id === mentor.socketId;
}
