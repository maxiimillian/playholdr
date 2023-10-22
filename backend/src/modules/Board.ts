import { getBoard } from '../../src/database/dbUtils';
import { Difficiulty } from './games/Sudoku';
import { Board } from '../../src/database/schema';
export default class BoardManager implements Board {
  id: number;
  unsolved: string;
  solved: string;
  baseClues: number[];
  difficulty: Difficiulty;

  constructor(id: number, unsolved: string, solved: string, difficulty: Difficiulty) {
    this.id = id;
    this.unsolved = unsolved;
    this.solved = solved;
    this.baseClues = BoardManager.getIndex(unsolved);
    this.difficulty = difficulty;
  }

  static create(difficulty: Difficiulty) {
    return getBoard(difficulty).then((board: Board) => {
      const { id, unsolved, solved, difficulty } = board;
      return new BoardManager(id, unsolved, solved, difficulty);
    });
  }

  static getIndex(unsolvedBoardText: string) {
    const baseClueIndexes = [];
    const boardCharacters = unsolvedBoardText.split('');

    for (let i = 0; i < boardCharacters.length; i++) {
      const cellValue = boardCharacters[i];
      if (cellValue != '0') {
        baseClueIndexes.push(i);
      }
    }

    return baseClueIndexes;
  }
}
