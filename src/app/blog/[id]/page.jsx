import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getData(id) {
    const res = await fetch(`http://127.0.0.1:3000/api/posts/${id}`, {
        // cache: 'force-cache', // by default
        // next: { revalidate: 10 }
        cache: 'no-store', //
    });
    if (!res.ok) {
        // throw new Error('Failed to fetch data');
        return notFound();
    }

    return res.json();
}

export async function generateMetadata({ params }) {
    const { data } = await getData(params.id);
    return {
        title: `${data.title} | Kuma`,
        description: data.desc,
    };
}

const BlogPost = async ({ params }) => {
    const { data } = await getData(params.id);
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.info}>
                    <h1 className={styles.title}>{data.title}</h1>
                    <p className={styles.desc}>{data.desc}</p>
                    <div className={styles.author}>
                        <Image
                            src='https://media.istockphoto.com/id/1312136351/es/foto/ilustraci%C3%B3n-en-3d-de-lindo-hombre-de-dibujos-animados-con-anteojos-en-camisa-azul-con-los.jpg?b=1&s=612x612&w=0&k=20&c=6ANIz4MG25aPOL4jjfB_-Ws27A5A4xJw4QZ94K74wPs='
                            alt='author'
                            width={40}
                            height={40}
                            className={styles.avatar}
                        />
                        <span className={styles.userName}>{data.username}</span>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        src={data.img}
                        alt='blog image'
                        fill={true}
                        className={styles.image}
                    />
                </div>
            </div>
            <div className={styles.content}>
                <p className={styles.text}>{data.content}</p>
            </div>
        </div>
    );
};

export default BlogPost;
