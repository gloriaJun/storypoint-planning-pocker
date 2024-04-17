'use client';

import { useContext } from 'react';
import { SocketContext } from './socket-provider';

export function useSocket() {
  const { socket, ...data } = useContext(SocketContext);

  return {
    socket: socket as NonNullable<typeof socket>,
    ...data,
  };
}
