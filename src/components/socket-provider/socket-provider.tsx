'use client';

import { io } from 'socket.io-client';
import { createContext, useEffect, useState } from 'react';

interface SocketContextType {
  socket: ReturnType<typeof io> | null;
  isConnected: boolean;
}

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  // const [transport, setTransport] = useState('N/A');

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SITE_URL ?? '');

    function onDisconnect() {
      setIsConnected(false);
      setSocket(null);
    }

    socketInstance.on('connect', () => {
      setSocket(socketInstance);
      setIsConnected(true);
    });

    socketInstance.on('disconnect', onDisconnect);

    return () => {
      socketInstance.off('connect');
      socketInstance.off('disconnect');

      socketInstance.disconnect();

      onDisconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {!isConnected && <div>Loading...</div>}
      {children}
    </SocketContext.Provider>
  );
}
