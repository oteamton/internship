import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/index.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValues } from '../interfaces';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';


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

      <section className={styles.content_register}>
        <h1 className={styles.heading}>SWU Internship</h1>
        <div>
          <Link href="/student"><button className={styles.button}>Student</button></Link>
          <Link href="/company"><button className={styles.button}>Company</button></Link>
        </div>
        <style jsx global>{`
        body {
          @extend .bodyStyle;
        }
      `}</style>
      </section>

      <section className={styles.content_login}>
        <h1>Login to <span>SWU Internship</span></h1>

        <label htmlFor="email">Email</label><br></br>
        <input type="text" {...register('email')} />
        <p className={styles.error}>{errors.email?.message}</p>

        <label htmlFor="email">Password</label><br></br>
        <input type="password" {...register('password')} />
        <p className={styles.error}>{errors.password?.message}</p>

        <button className={styles.button} onClick={handleSubmit(onSubmit, onError)}>Login</button>
      </section>

    </div>
  );
};

export default Home;
