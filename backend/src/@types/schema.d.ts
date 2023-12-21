import { Knex } from 'knex';
import { Difficiulty } from '../../src/modules/games/Sudoku';

export interface Board {
  id: number;
  unsolved: string;
  solved: string;
  difficulty: Difficiulty;
}

export interface User {
  id: string;
  name: string;
  password: string;
  email: string;
  date_created: string;
}

declare module 'knex/types/tables' {
  interface Tables {
    users: User;
    users_composite: Knex.CompositeTableType<
      User,
      Pick<User, 'name'> & Partial<Pick<User, 'date_created'>>,
      Partial<Omit<User, 'id'>>
    >;
  }
}
