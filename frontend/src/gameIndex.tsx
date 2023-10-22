import { FC, ReactElement } from 'react';
import SudokuForm from '@/components/forms/Sudoku';
import RedirectForm from '@/components/forms/Redirect';
import ComingSoonForm from '@/components/forms/ComingSoon';
import CodexForm from '@/components/forms/Codex';

export type GameOptionType = {
  name: string;
  imagePath: string;
  form: ReactElement;
};

const imagePath = '/images/gameOptions/';
const gameIndex: GameOptionType[] = [
  {
    name: 'Sudoku',
    imagePath: imagePath + 'sudoku_board.png',
    form: <SudokuForm />,
  },
  {
    name: 'Advent',
    imagePath: imagePath + 'advent.png',
    form: <RedirectForm path={'/advent/'} />,
  },
  { name: 'Codex', imagePath: imagePath + 'codex.png', form: <CodexForm /> },
  {
    name: 'Poker',
    imagePath: imagePath + 'coming_soon.png',
    form: <ComingSoonForm />,
  },
  {
    name: 'Tic-Tac-Toe',
    imagePath: imagePath + 'coming_soon.png',
    form: <ComingSoonForm />,
  },
  {
    name: 'Cluedo',
    imagePath: imagePath + 'coming_soon.png',
    form: <RedirectForm path={'/test/'} />,
  },
];

export default gameIndex;
