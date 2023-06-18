import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { Button } from '@/components/button/Button';

export const metadata = {
    title: 'About | Kuma',
    description: 'This is the About page',
};

const About = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image
                    src='https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'
                    fill={true}
                    alt=''
                    className={styles.img}
                />
                <div className={styles.imgText}>
                    <h1 className={styles.imgTitle}>Digital Storytellers</h1>
                    <h2 className={styles.imgDesc}>
                        Handcrafting award winning digital experiences
                    </h2>
                </div>
            </div>
            <div className={styles.textContainer}>
                <div className={styles.item}>
                    <h1 className={styles.title}>Who Are We?</h1>
                    <p className={styles.desc}>
                        We are a team of digital storytellers. We craft digital
                        experiences that excite &amp; inspire. We are a team of
                        digital storytellers. We craft digital experiences that
                        excite &amp; inspire. We are a team of digital
                        storytellers. We craft digital experiences that excite
                        &amp; inspire.
                        <br />
                        <br />
                        We are a team of digital storytellers. We craft digital
                        experiences that excite &amp; inspire. We are a team of
                        digital storytellers. We craft digital experiences that
                        excite &amp; inspire. We are a team of digital
                        storytellers. We craft digital experiences that excite
                        &amp; inspire.
                    </p>
                </div>
                <div className={styles.item}>
                    <h1 className={styles.title}>What We Do?</h1>
                    <p className={styles.desc}>
                        We are a team of digital storytellers. We craft digital
                        experiences that excite &amp; inspire. We are a team of
                        digital storytellers. We craft digital experiences that
                        excite &amp; inspire. We are a team of digital
                        storytellers. We craft digital experiences that excite
                        &amp; inspire.
                        <br />
                        <br />
                        - We are a team of digital storytellers.
                        <br />
                        <br />
                        - We craft digital experiences that excite &amp;
                        inspire.
                        <br />
                        <br />
                        -We are a team of digital storytellers.
                    </p>
                    <Button url='/contact' text='Contact' />
                </div>
            </div>
        </div>
    );
};

export default About;
