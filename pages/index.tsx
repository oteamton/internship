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

      <section className={styles.wrapper_register}>
        {/* <BackgroundImage /> */}
        <div className={styles.content_register}>
          <h1 className={styles.heading}>SWU <span>Internship</span></h1>
          <div>
            <Link href="/student"><button className={styles.btn}>Student</button></Link>
            <Link href="/company"><button className={styles.btn}>Company</button></Link>
          </div>
        </div>
      </section>

      <section className={styles.wrapper_partners}>
        <h1>About</h1>
        <div className={styles.content_partners}>

          <div className={styles.content_img}>
            <div className={styles.img}>
              <img src="" alt="1" />
              <img src="" alt="2" />
              <img src="" alt="3" />
              <img src="" alt="4" />
              <img src="" alt="5" />
            </div>
          </div>

        </div>
        <p>Welcome to SWU Internship <br /> This is an open source project </p>
      </section>

      <section className={styles.wrapper_login}>
        <div className={styles.content_login}>
          <h1>Login to <span id={styles.heading}>SWU <span>Internship</span></span></h1>

          <label htmlFor="email">Email</label>
          <input type="text" {...register('email')} />
          <p className={styles.error}>{errors.email?.message}</p>

          <label htmlFor="email">Password</label>
          <input type="password" {...register('password')} />
          <p className={styles.error}>{errors.password?.message}</p>

          <button className={styles.btn} onClick={handleSubmit(onSubmit, onError)}>Login</button>
        </div>
      </section>

    </div >
  );
};

export default Home;