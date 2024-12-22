import "@/styles/globals.css";
import { GameProvider } from '@/context/GameContext';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function App({ Component, pageProps }) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socketInstance = io('http://localhost:3000', {
      transports: ['websocket'],
      reconnection: true,
    });

    socketInstance.on('connect', () => {
      console.log('Socket connected', socketInstance.id);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
    setSocket(socketInstance);

    return () => {
      if (socketInstance) socketInstance.disconnect();
    };
  }, []);

  return (
    <GameProvider>
      <Component {...pageProps} socket={socket} />
    </GameProvider>
  );
}
