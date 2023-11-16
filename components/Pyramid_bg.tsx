import React from 'react';
import Image from 'next/image';
import styles from '../styles/Pyramid.module.css';

const BackgroundImage: React.FC = () => (
    <div className={styles.backgroundContainer}>
        <Image
            src="/styles/pyramid_bg.svg"
            width={500}
            height={500}
            alt="background image"
            className={styles.backgroundImage}
        />
    </div>
);

export default BackgroundImage;