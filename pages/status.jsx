import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';

export default function Status() {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io();
    setSocket(socket);

    socket.on('leaderboard-update', (newLeaderboard) => {
      setLeaderboard(newLeaderboard);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleEndGame = () => {
    socket.emit('end-game', { code: router.query.code });
    router.push('/end');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl mb-8">Game Status</h1>
        <div className="mb-8">
          <h2 className="text-xl mb-4">Leaderboard</h2>
          <div className="space-y-2">
            {leaderboard.map((playerId, index) => (
              <div key={playerId} className="flex justify-between bg-gray-100 p-4 rounded">
                <span>#{index + 1}</span>
                <span>Player {playerId}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleEndGame}
          className="bg-red-500 text-white px-6 py-3 rounded"
        >
          End Game
        </button>
      </div>
    </div>
  );
}