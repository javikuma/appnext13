import Image from 'next/image';
import styles from './page.module.css';
import Hero from 'public/hero.png';
import { Button } from '@/components/button/Button';

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>
                    Better design for your digital products.
                </h1>
                <p className={styles.desc}>
                    Tuning your Idea into Reality. we bring together the teams
                    from the global tech industry.
                </p>
                <Button url='/portfolio' text='See Our Work' />
            </div>
            <div className={styles.item}>
                <Image
                    src={Hero}
                    alt='hero'
                    className={styles.img}
                    priority={false}
                />
                {/* <Image src='https://images.pexels.com/photos/17133050/pexels-photo-17133050.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' width={500} height={500} /> */}
            </div>
        </div>
    );
}
