import { Difficiulty } from './modules/games/Sudoku';

export function generateRoomCode(length: number) {
  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  const possibilties = alphabet.concat(alphabet.map(letter => letter.toUpperCase())); // All lower and uppercase letters
  let code = '';

  for (let i = 0; i < length; i++) {
    const random = possibilties[Math.floor(Math.random() * possibilties.length)];
    code = code + random;
  }

  return code;
}
