import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import styles from '../styles/styles.module.css'
const Home: React.FC = () => {

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to My Next.js App</h1>
      <Link href="/student"><button className={styles.button}> Student</button></Link>
      <Link href="/company"><button className={styles.button}> Company</button></Link>
    </div>
  );
};

export default Home
