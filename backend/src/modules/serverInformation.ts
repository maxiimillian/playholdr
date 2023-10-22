import { Namespace, Server } from 'socket.io';
import Game from './games/Game';
import * as utils from '@/utils';

type roomTracker = { [key: string]: Game };

export class ServerInformation {
  roomTracker: roomTracker = {};

  addGame(game: Game) {
    const roomCode = utils.generateRoomCode(6);

    game.roomCode = roomCode;
    this.roomTracker[roomCode] = game;

    return roomCode;
  }

  removeGame(roomCode: string) {
    delete this.roomTracker[roomCode];
  }

  getGame(roomCode: string) {
    return this.roomTracker[roomCode];
  }

  getRoomCodeByUserId(userId: number) {
    for (const roomCode in this.roomTracker) {
      const game = this.roomTracker[roomCode];
      if (game.hasPlayer(userId)) {
        return roomCode;
      }
    }
    return null;
  }
}

export default () => {};
