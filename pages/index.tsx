import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValues } from '../interfaces';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import Link from 'next/link';
import * as yup from 'yup';
import Layout from '../components/Layout';
import styles from '../styles/index.module.css';
import BackgroundImage from '../components/Pyramid_bg';

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
        <h1>Partners</h1>
        <div className={styles.content_partners}>
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png" alt="1" />
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png" alt="2" />
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png" alt="3" />
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png" alt="4" />
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png" alt="5" />
        </div>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus tempora vitae fugit voluptatem ducimus, consequuntur vel eos magnam quo optio, repudiandae quisquam tenetur voluptates quis rem reprehenderit non ea. Neque.</p>
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