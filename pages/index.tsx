import React, { useEffect, useState } from 'react';
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
          <Link href="/">Home</Link> | <Link href="/about">About</Link> |{' '}
          <Link href="/users">Contact</Link> {' '}
          {/* <a href="/api/users">Users API</a> */}
        </nav>
      </header>

      <section className={styles.wrapper_register}>
        <h1 className={styles.heading}>SWU <span>Internship</span></h1>
        <div className={styles.content_register}>
          <img src='https://p7.hiclipart.com/preview/643/201/294/stick-figure-student-presentation-study-skills-animation-think.jpg' />
          <img src='https://p7.hiclipart.com/preview/643/201/294/stick-figure-student-presentation-study-skills-animation-think.jpg' />
          <button className={styles.btn_stu}><Link href="/student">Student</Link></button>
          <button className={styles.btn_com}><Link href="/company">Company</Link></button>
        </div>
      </section>

      <section className={styles.wrapper_img}>
        <img src='https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4' />
      </section>

      <footer>
        <span>I'm here to stay (Footer)</span>
      </footer>

    </div >
  );
};

export default Home;