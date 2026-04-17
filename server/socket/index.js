const socketIo = require('socket.io');

const initSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.emit('serverTime', { timestamp: Date.now() });

    socket.on('joinAuction', ({ auctionId }) => {
      socket.join(auctionId);
    });

    socket.on('leaveAuction', ({ auctionId }) => {
      socket.leave(auctionId);
    });

    socket.on('disconnect', () => {
    });
  });

  return io;
};

module.exports = initSocket;
