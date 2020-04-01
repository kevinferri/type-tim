import { createContext } from 'react';
import ioClient from 'socket.io-client';

const socket = ioClient('localhost:3000');

export const SocketContext = createContext<SocketIOClient.Socket>(socket);
