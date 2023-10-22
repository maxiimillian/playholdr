import { Express } from 'express';
import { Server, Namespace } from 'socket.io';
import { ServerInformation } from './modules/serverInformation';
import { createNameSpace } from './routes/sockets/createNamespace';

module.exports = function (io: Server, app: Express) {
  const server = new ServerInformation();
  const namespaces = [{ handlerFile: './routes/sockets/sudoku.ts', route: '/sudoku' }];

  // Embed the default socket endpoints and then pass the namespace to a file for custom routes
  for (const namespace of namespaces) {
    const ioNamespace: Namespace = io.of(namespace.route);

    const conn = createNameSpace(ioNamespace, app, server);
    require(namespace.handlerFile)(conn, app, server);
  }
};
