const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { setupWorker } = require('@socket.io/sticky');
const { createAdapter } = require('@socket.io/cluster-adapter');
const redisAdapter = require('socket.io-redis');

const app = express();
const server = http.createServer(app);

// Configurando o Redis (usando o Redis como adaptador para o Socket.IO)
const redis = require('redis');
const pubClient = redis.createClient({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();  // Para fazer o publish e subscribe

// Configurando o Socket.IO
const io = new Server(server);

// Usando o adaptador Redis
io.adapter(redisAdapter({ pubClient, subClient }));

// Usando o cluster adapter para pm2 cluster mode
io.adapter(createAdapter());

// Evento de conexão Socket.IO
io.on('connection', (socket) => {
  console.log(`Client connected on worker ${process.pid}`);

  // Exemplos de eventos
  socket.on('message', (msg) => {
    console.log(`Message from client: ${msg}`);
    socket.emit('message', 'Hello from server');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Rodar o servidor com sticky sessions
setupWorker(io);

server.listen(3000, () => {
  console.log(`Server running on port 3000 on worker ${process.pid}`);
});
