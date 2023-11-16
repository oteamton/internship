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

  const [visibleSection, setVisibleSection] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    const handleScrollThrottled = throttle(handleScroll, 200);

    window.addEventListener('scroll', handleScrollThrottled);

    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
    };
  }, []);

  useEffect(() => {
    const sectionOffsets = Array.from(
      document.querySelectorAll('section')
    ).map((section) => section.offsetTop);

    const findVisibleSection = () => {
      const currentPosition = scrollPosition + window.innerHeight / 2;

      for (let i = 0; i < sectionOffsets.length; i++) {
        if (currentPosition < sectionOffsets[i]) {
          setVisibleSection(i - 1);
          break;
        }
      }

      // If the scroll position is beyond the last section, set it to the last section
      if (currentPosition >= sectionOffsets[sectionOffsets.length - 1]) {
        setVisibleSection(sectionOffsets.length - 1);
      }
    };

    findVisibleSection();
  }, [scrollPosition]);

  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    console.log('Form data submitted:', data);
  }

  const onError: SubmitErrorHandler<LoginValues> = (error) => {
    // Handle errors
    console.error(error);
  };

  return (
    <div className={styles.container}>

      <section className={`${styles.wrapper_register} ${visibleSection === 0 ? styles.fadeIn : styles.fadeOut}`}>
        {/* <BackgroundImage /> */}
        <div className={styles.content_register}>
          <h1 className={styles.heading}>SWU <span>Internship</span></h1>
          <div>
            <Link href="/student"><button className={styles.btn}>Student</button></Link>
            <Link href="/company"><button className={styles.btn}>Company</button></Link>
          </div>
        </div>
      </section>

      <section className={`${styles.wrapper_partners} ${visibleSection === 0 ? styles.fadeIn : styles.fadeOut}`}>
        <h1>Partners</h1>
        <div className={styles.content_partners}>
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus tempora vitae fugit voluptatem ducimus, consequuntur vel eos magnam quo optio, repudiandae quisquam tenetur voluptates quis rem reprehenderit non ea. Neque.</p>
      </section>

      <section className={`${styles.wrapper_partners} ${visibleSection === 0 ? styles.fadeIn : styles.fadeOut}`}>
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