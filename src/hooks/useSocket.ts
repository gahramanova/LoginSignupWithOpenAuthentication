import { useEffect, useState } from 'react';
import type { Message } from '../types/chart';
import { io, Socket } from 'socket.io-client';


export const useSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [url]);

  const sendMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    if (socket) {
      socket.emit('sendMessage', {
        ...message,
        id: Date.now().toString(),
        timestamp: new Date()
      });
    }
  };

  const listenForMessages = (callback: (message: Message) => void) => {
    if (socket) {
      socket.on('receiveMessage', callback);
    }
  };

  return { socket, sendMessage, listenForMessages };
};