import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGame } from '@/context/GameContext';

export default function End() {
  const router = useRouter();
  const { gameState } = useGame();
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    const fetchScore = async () => {
      const res = await fetch(`/api/score?code=${gameState.code}&playerId=${gameState.playerId}`);
      const data = await res.json();
      setFinalScore(data.score);
    };

    if (gameState.code && gameState.playerId) {
      fetchScore().then(r => void(r));
    }
  }, [gameState]);

  return ( //TODO: replace with actual end screen
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Game Over!</h1>
        {finalScore !== null && (
          <p className="text-2xl">Your final score: {finalScore}</p>
        )}
        <button
          onClick={() => router.push('/')}
          className="mt-8 bg-blue-500 text-white px-6 py-3 rounded"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}