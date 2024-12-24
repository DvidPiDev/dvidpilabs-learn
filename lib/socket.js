import { Server } from 'socket.io';
import { MongoClient } from 'mongodb';

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    const client = new MongoClient(process.env.MONGODB_URI);
    const db = client.db();

    const addPlayerToGame = async (code, player) => {
      const collection = db.collection('games');
      await collection.updateOne({ code }, { $push: { players: player } });
    };

    const findGame = async (code) => {
      const collection = db.collection('games');
      return await collection.findOne({ code });
    };

    const updatePlayerScore = async (code, playerId, correct) => {
      const collection = db.collection('games');
      const game = await collection.findOne({ code });
      const player = game.players.find(p => p.id === playerId);
      player.answers.correct += correct ? 1 : 0;
      player.answers.total += 1;
      await collection.updateOne({ code }, { $set: { players: game.players } });
    };

    const updateGameState = async (code, newState) => {
      const collection = db.collection('games');
      await collection.updateOne({ code }, { $set: { state: newState } });
    };

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

      socket.on('request-question', async ({ code }) => {
        const game = await findGame(code);
        const questionIndex = Math.floor(Math.random() * game.cards.length);
        const question = game.cards[questionIndex];
        io.to(code.toString()).emit('new-question', question);
        await updateGameState(code, game.state + 1);
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