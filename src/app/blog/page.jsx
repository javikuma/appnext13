import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export const metadata = {
    title: 'Blog | Kuma',
    description: 'This is the Blog page',
};

async function getData() {
    const res = await fetch('http://127.0.0.1:3000/api/posts', {
        // cache: 'force-cache', // by default
        // next: { revalidate: 10 }
        cache: 'no-store', //
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

const Blog = async () => {
    const data = await getData();
    return (
        <div className={styles.mainContainer}>
            {data.data.map((item) => (
                <Link href={`/blog/${item._id}`} className={styles.container}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={item.img}
                            alt=''
                            width={400}
                            height={250}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.content}>
                        <h1 className={styles.title}>{item.title}</h1>
                        <p className={styles.desc}>{item.desc}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Blog;
