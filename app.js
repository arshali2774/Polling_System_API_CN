import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { connectToDb } from './src/config/db.config.js';

// create an instance of an Express application
const app = express();
// create an HTTP server instance using Node.js's built-in http module, with Express application app as its request handler.
const server = http.createServer(app);
// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// start http server
server.listen(3000, () => {
  console.log('Http server Listening on port 3000');
  connectToDb();
});
