import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValues } from '../interfaces';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import Link from 'next/link';
import * as yup from 'yup';
import Layout from '../components/Layout';
import styles from '../styles/index.module.css';

const Home: React.FC = () => {
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: yupResolver(validationSchema) as any,
  });

  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    console.log('Form data submitted:', data);
  }

  const onError: SubmitErrorHandler<LoginValues> = (error) => {
    // Handle errors
    console.error(error);
  };

  return (
    <div className={styles.container}>
      <header>
        <img src="https://swu.ac.th/images/swu_logo_v3.png" alt="" />
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/users">Contact</Link>
          {/* <a href="/api/users">Users API</a> */}
        </nav>
      </header>
      <section className={styles.wrapper_register}>
        <h1 className={styles.heading}>SWU <span>Internship</span></h1>
        <div className={styles.content_register}>
          <p className={styles.p_stu}>Welcome Student</p>
          <img id={styles.stu} src="https://media-public.canva.com/su8kk/MAEfd5su8kk/1/tl.png" alt="" />
          <button className={styles.btn_stu}><Link href="/student">Student</Link></button>
          <p className={styles.p_com}>Welcome Company</p>
          <img id={styles.com} src="https://media-public.canva.com/ZfTZA/MAFcrqZfTZA/1/tl.png" alt="" />
          <button className={styles.btn_com}><Link href="/company">Company</Link></button>
        </div>
      </section>

      <section className={styles.wrapper_img}>
        {/* <img src='https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4' /> */}
        <img src='https://media-public.canva.com/LwnvA/MAFM7nLwnvA/1/tl.png' />
      </section>

      <footer>
        <div className={styles.link}>
          <Link href="https://ipass.swu.ac.th/">I-Pass</Link> | <Link href="/about">GAFE Mail</Link> |{' '}
          <Link href="https://supreme.swu.ac.th/portal/index.php">SUPREME</Link> {' '}| <Link href="http://search.swu.ac.th/primo-explore/search?vid=SWU">Contact us</Link> |{' '} <Link href="https://account.swu.ac.th/directory">Directory</Link> |{' '}<Link href="https://www.swu.ac.th/contact.php">Contact us</Link> |{' '}<Link href="https://www.swu.ac.th/location.php">SWU Map</Link> |{' '} <Link href="https://swu.ac.th/quicklink.html">Quick Link</Link>
        </div>
        <div className={styles.social}>
          <img src="https://swu.ac.th/images/facebook.png" alt="" />
          <img src="https://swu.ac.th/images/twitter.png" alt="" />
          <img src="https://swu.ac.th/images/youtube.png" alt="" />
          <img src="https://swu.ac.th/images/instagram.png" alt="" />
        </div>
      </footer>

    </div >
  );
};

export default Home;