import io from 'socket.io-client';
import { serverBaseUrl } from './crud';

// Connect to the socket server
export const socket = io(serverBaseUrl);

// Indicate a successful connection
socket.on('Server Connect', (userType) => {
  console.log(userType); // Connected to socket.
});

// Emit new code to the socket server
export function emitNewCodeToServer(newCode) {
  socket.emit('Code Change', newCode);
}
