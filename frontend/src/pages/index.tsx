import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

import GameSelector from '@/components/main/GameSelector';
import Header from '@/components/global/Header';
import Username from '@/components/global/Username';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Header />
      <div className="menu-container">
        <Username />
        <GameSelector />
      </div>
    </>
  );
}
