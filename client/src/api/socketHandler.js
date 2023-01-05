import io from 'socket.io-client';
import { serverBaseUrl } from './crud';

export const socket = io(serverBaseUrl);

// client-side
socket.on("Server Connect", (arg) => {
  console.log(arg); // Connected to socket.
});

