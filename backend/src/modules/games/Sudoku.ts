import Game from './Game';
import Board from '../Board';
export enum Difficiulty {
  'easy',
  'medium',
  'hard',
  'extreme',
  'test',
}

export default class SudokuGame extends Game {
  constructor(
    hostId: number,
    playerCount: number,
    difficulty: Difficiulty,
    time: number,
    puzzle: Board,
  ) {
    super(hostId, playerCount, 'sudoku');
  }
}
