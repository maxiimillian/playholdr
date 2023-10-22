import { Express } from 'express';
import { Namespace } from 'socket.io';
import { ServerInformation } from '../../modules/serverInformation';
import Game from '../../modules/games/Game';
import SudokuGame from 'src/modules/games/Sudoku';

interface GameCreator {
  [key: string]: (userId: number, options: any) => Promise<Game>;
}

// This function will embed endpoints that are common among all namespaces
export function createNameSpace(io: Namespace, app: Express, server: ServerInformation) {
  // Allows for game specific side effects for generating a game
  const gameCreatorMap: GameCreator = {
    sudoku: async (userId, options) => {
      const board = await Board.create(options.difficulty);
      const sudokuGame = new SudokuGame(
        userId,
        parseInt(options.playerCount),
        type,
        options.difficulty,
        options.time,
        board,
      );
      return sudokuGame;
    },
  };

  function roomExists(roomCode: string) {
    return !!io.adapter.rooms.has(roomCode);
  }

  // implement later
  function sanitizeOptions(options: any) {
    return options;
  }

  // Essentially an execution wrapper for gameCreatorMap with a more friendly syntax
  async function createGame(type: string, userId: number, options: any) {
    const params: [number, any] = [userId, options];
    const roomCode = await gameCreatorMap[type](...params);
    return roomCode;
  }
}
