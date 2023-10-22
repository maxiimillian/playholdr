import { Difficiulty } from '../modules/games/Sudoku';
import dbClient from './client';
import { Board } from './schema';

export function getBoard(difficulty: Difficiulty) {
  return dbClient.knex
    .select<Board>('*')
    .from('boards')
    .where('difficulty', '=', difficulty)
    .limit(1);
}
