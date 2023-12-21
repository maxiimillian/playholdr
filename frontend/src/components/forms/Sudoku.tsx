import { FC, ReactElement, useState } from 'react';
import styles from '@/styles/forms/form.module.scss';
import { createGame } from '@/root/api/game';
import { useRouter } from 'next/router';



const SudokuForm: FC = function () {
  const [time, setTime] = useState(5);
  const [players, setPlayers] = useState(2);
  const [difficulty, setDifficulty] = useState('easy');

  const difficultyOptions = ['easy', 'medium', 'hard', 'extreme', 'test'];
  const router = useRouter();

  function submitGame() {
    const payload = {
      time,
      players,
      difficulty,
    };

    createGame('sudoku', payload).then((data) => {
      const gamePath = `/sudoku/${data.code}`
      router.push(gamePath);
    });
  }

  function getSelectOptions(options: string[]): ReactElement[] {
    return options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  }

  return (
    <section className={styles['form-container']} id="game-menu">
      <div className={styles.form}>
        <div className={styles.header}>
          <h1>Game Settings</h1>
        </div>

        <div className={styles.center}>
          <label htmlFor="difficulty">Difficulty</label>
          <select
            name="difficulty"
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
          >
            {getSelectOptions(difficultyOptions)}
          </select>
        </div>

        <div className={`${styles.center} ${styles.column}`}>
          <label htmlFor="time">
            Time: <b>{time}</b>
          </label>
          <input
            type="range"
            name="time"
            value={time}
            min="1"
            max="30"
            onChange={e => setTime(Number(e.target.value))}
          ></input>
        </div>
        <div className={`${styles.center} ${styles.column}`}>
          <label htmlFor="players">
            Players: <b>{players}</b>
          </label>
          <input
            type="range"
            name="players"
            value={players}
            min="1"
            max="4"
            onChange={e => setPlayers(Number(e.target.value))}
          ></input>
        </div>
        <button onClick={() => submitGame()} className="btn submit">
          Create Game
        </button>
      </div>
    </section>
  );
};

export default SudokuForm;
