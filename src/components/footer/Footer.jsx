import React from 'react';
import styles from './footer.module.css';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className={styles.container}>
            <div>&copy; Kuma. All rights reserved.</div>
            <div className={styles.social}>
                <Image
                    src='/1.png'
                    width={15}
                    height={15}
                    className={styles.icon}
                    alt='Kuma Dev fb'
                />
                <Image
                    src='/2.png'
                    width={15}
                    height={15}
                    className={styles.icon}
                    alt='Kuma Dev ig'
                />
                <Image
                    src='/3.png'
                    width={15}
                    height={15}
                    className={styles.icon}
                    alt='Kuma Dev tw'
                />
                <Image
                    src='/4.png'
                    width={15}
                    height={15}
                    className={styles.icon}
                    alt='Kuma Dev yt'
                />
            </div>
        </footer>
    );
};

export default Footer;
