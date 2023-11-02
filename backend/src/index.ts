import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import routes from './routes';
import { connect, connection } from 'mongoose';
import cors from 'cors';

import 'dotenv/config';

import { errorHandler, errorNotFound } from './middlewares/errorMiddleware';
import CustomError from './helpers/CustomError';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});

app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
  // console.log('WS Connection');

  socket.on('joinChannel', (channel) => {
    socket.join(channel);
  });

  socket.on('channelMessage', ({ channel, chat }) => {
    io.to(channel).emit('message', chat);
  });
});

app.get('/', (req, res) => {
  res.send('API starting point');
});

app.use('/api/v1', routes);

app.all('*', (req, res, next) => {
  const err = new CustomError(
    `Can't find the requested ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});
app.use(errorHandler);
app.use(errorNotFound);

const PORT = process.env.PORT || 5001;
const URI =
  process.env.NODE_ENV === 'DEVELOPMENT'
    ? process.env.MONGO_DB_URI_DEV
    : process.env.MONGO_DB_URI;

const start = async () => {
  try {
    await connect(URI as string);
    connection.once('open', () => console.log('Connected to db'));

    httpServer.listen(PORT, async () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
