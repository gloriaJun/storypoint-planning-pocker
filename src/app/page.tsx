'use client';

import { useSocket } from '@/components/socket-provider';
import { useEffect, useState } from 'react';

export default function Home() {
  const { socket, isConnected } = useSocket();
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('server:message', (data) => {
      setReceivedMessage(data);
    });

    return () => {
      socket.off('server:message');
    };
  }, [socket]);

  return (
    <div>
      <p>Status: {isConnected ? 'connected' : 'disconnected'}</p>
      <button
        type="button"
        onClick={() => {
          socket.emit('client:message', 'Hello! World!!!');
        }}
      >
        Send Message
      </button>

      <p>Received Message: {receivedMessage}</p>
    </div>
  );
}
