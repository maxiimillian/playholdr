import gameIndex, { GameOptionType } from '@/root/gameIndex';
import GameOption from '@/components/main/GameOption';
import styles from '@/styles/GameOption.module.scss';
import { ReactElement, useState } from 'react';
import Blockpage from '../global/Blockpage';

export default function GameSelector() {
  const [form, setForm] = useState<ReactElement | null>(null);

  function handleGameClicked(gameOption: GameOptionType) {
    console.log(1);
    setForm(<Blockpage handleClick={() => setForm(null)}>{gameOption.form}</Blockpage>);
  }

  return (
    <div className={styles['game-options-container']}>
      {gameIndex.map((gameOption: GameOptionType) => {
        return (
          <GameOption
            key={gameOption.name}
            imagePath={gameOption.imagePath}
            name={gameOption.name}
            onClick={() => handleGameClicked(gameOption)}
          ></GameOption>
        );
      })}
      {form}
    </div>
  );
}
