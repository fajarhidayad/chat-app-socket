import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_APP_SOCKET_URL as string;

export const socket = io(URL, {
  autoConnect: false,
});
