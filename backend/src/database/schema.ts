import { Difficiulty } from '../../src/modules/games/Sudoku';

export interface Board {
  id: number;
  unsolved: string;
  solved: string;
  difficulty: Difficiulty;
}

export interface UserToken {
  token: string;
  userId: string;
}

export interface User {
  userId: string;
  name: string;
  password: string;
  email: string;
  bio: string;
}
