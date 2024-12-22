import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGame } from '@/context/GameContext';
import io from 'socket.io-client';

export default function Game() {
  const router = useRouter();
  const { gameState } = useGame();
  const [question, setQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io();
    setSocket(socket);

    socket.on('game-ended', () => {
      router.push('/end').then(r => void(r));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAnswer = (answer) => {
    socket.emit('submit-answer', {
      code: gameState.code,
      playerId: gameState.playerId,
      answer,
      questionIndex,
    });
  };

  return ( //TODO: replace with actual game page
    <div className="min-h-screen p-8">
      {question && (
        <div>
          <h2 className="text-2xl mb-8">{question.question}</h2>
          <div className="grid grid-cols-2 gap-4">
            {question.answer.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer)}
                className="bg-blue-500 text-white p-4 rounded"
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}