import app from './app';

const port = process.env.PORT || 3001;
process.env.TZ = 'Canada/Eastern';

const server = app.listen(port, () => console.log('ITS GO TIME ON PORT ' + port));
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
require('./connection.ts')(io, app);
