import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState({
    code: null,
    playerId: null,
    playerName: null,
  });

  const value = {
    gameState,
    setGameState,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}