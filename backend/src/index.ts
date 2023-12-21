import app from './app';
import { Server } from 'socket.io';
import SocketHandler from './connection';

const port = process.env.PORT || 3001;
process.env.TZ = 'Canada/Eastern';

const server = app.listen(port, () => console.log('ITS GO TIME ON PORT ' + port));
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

SocketHandler(io, app);
