import Icon from '@/components/global/Icon';
import styles from '@/styles/blockpage.module.scss';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles['header']}>
      <Icon width={80} height={62} />
      <nav>
        <span className={styles['header-button']}>
          <Link href="/">Play</Link>
        </span>
        <span className={styles['header-button']}>
          <Link href="/forum">Forum</Link>
        </span>
        <span className={styles['header-button']}>Blog</span>
        <span className={styles['header-button']}>Support</span>
      </nav>
    </header>
  );
}
