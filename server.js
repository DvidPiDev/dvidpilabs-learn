const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl).then(r => {void(r);});
  });

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected', socket.id);

    socket.on('join-game', async ({ code, playerName }) => {
      console.log(`Player ${playerName} attempting to join game ${code}`);

      try {
        const gameExists = true; // TODO: actually check the db lmao

        if (gameExists) {
          const playerId = Math.floor(Math.random() * 128);
          socket.join(code.toString());

          socket.emit('joined', { //TODO: finish implementation
            playerId,
            game: {
              code,
              players: [],
              //...
            }
          });

          io.to(code.toString()).emit('player-joined', {
            playerId,
            playerName
          });

          console.log(`Player ${playerName} (id: ${playerId}) joined game ${code}`);
        } else {
          socket.emit('error', 'Game not found');
        }
      } catch (error) {
        console.error('Error joining game:', error);
        socket.emit('error', 'Failed to join game');
      }
    });

    socket.on('disconnect', () => {
      console.log('client disconnected', socket.id);
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('http://localhost:3000');
  });
});