import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import logger from 'morgan';
import cors from 'cors';
import { connectToDb } from './src/config/db.config.js';
import questionRouter from './src/routes/questions.routes.js';
import optionRouter from './src/routes/options.routes.js';
// create an instance of an Express application
const app = express();
// create an HTTP server instance using Node.js's built-in http module, with Express application app as its request handler.
const server = http.createServer(app);
//cors
app.use(cors());
// Logger
app.use(logger('dev'));
// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// create socket server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
//middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});
// Routes
app.use('/questions', questionRouter);
app.use('/options', optionRouter);
/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint does not exist',
  });
});
// start http server
server.listen(3000, () => {
  console.log('Http server Listening on port 3000');
  connectToDb();
});
