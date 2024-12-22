import { Server } from 'socket.io';

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on('connection', socket => {
      socket.on('join-game', async ({ code, playerName }) => {
        const game = await findGame(code);
        if (!game) {
          socket.emit('error', 'Game not found');
          return;
        }

        const playerId = Math.floor(Math.random() * 128);
        const player = {
          id: playerId,
          name: playerName,
          score: 0,
          icon: Math.floor(Math.random() * 8),
          answers: { correct: 0, total: 0 }
        };

        await addPlayerToGame(code, player);
        socket.join(code.toString());
        socket.emit('joined', { playerId, game });
        io.to(code.toString()).emit('player-joined', player);
      });

      socket.on('submit-answer', async ({ code, playerId, answer, questionIndex }) => {
        const game = await findGame(code);
        const question = game.cards[questionIndex];
        const correct = question.answer[question.correct] === answer;

        await updatePlayerScore(code, playerId, correct);
        const updatedGame = await findGame(code);
        io.to(code.toString()).emit('leaderboard-update', updatedGame.lead);
      });

      socket.on('end-game', async ({ code }) => {
        const game = await findGame(code);
        await updateGameState(code, 0);
        io.to(code.toString()).emit('game-ended', game.lead);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;