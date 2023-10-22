import Image from 'next/image';
import styles from '@/styles/GameOption.module.scss';

type GameOptionProps = {
  imagePath: string;
  name: string;
  onClick?: () => void;
};

export default function GameOption(props: GameOptionProps) {
  return (
    <section onClick={props.onClick} className={styles['game-option']}>
      <Image
        src={props.imagePath}
        className={styles['game-icon']}
        height="150"
        width="200"
        alt={props.name}
      />
      <span className={styles['game-name']}>{props.name}</span>
    </section>
  );
}
