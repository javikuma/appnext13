'use client';
// import { useEffect, useState } from 'react';
import useSWR from 'swr';
import styles from './page.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export const metadata = {
    title: 'Dashboard | Kuma',
    description: 'This is the Dashboard page',
};

const Dashboard = () => {
    // const [data, setData] = useState([]);
    // const [error, setError] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     const getData = async () => {
    //         setIsLoading(true);
    //         const res = await fetch('/api/posts', {
    //             cache: 'no-store', //
    //         });
    //         if (!res.ok) {
    //             setError(true);
    //         }

    //         const data = await res.json();
    //         setData(data);
    //         setIsLoading(false);
    //     };
    //     getData();
    // }, []);

    const session = useSession();
    const router = useRouter();

    const [newPost, setNewPost] = useState({
        title: '',
        desc: '',
        img: '',
        content: '',
    });

    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setNewPost({ title: '', desc: '', img: '', content: '' });
    };

    useEffect(() => {
        if (session.status === 'loading') {
            return;
        }
        if (session.status === 'unauthenticated') {
            return router.push('/dashboard/login');
        }
    }, [session]);

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data, error, mutate, isLoading } = useSWR(
        `/api/posts?username=${session?.data?.user.name}`,
        fetcher
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newPost,
                    username: session.data.user.name,
                }),
            });
            if (!res.ok) {
                throw new Error(res.status);
            }
            const data = await res.json();
            resetForm();
            mutate();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });
            mutate();
        } catch (error) {
            console.log(error);
        }
    };

    if (session.status === 'loading') {
        return <div>Loading...</div>;
    }

    if (session.status === 'authenticated') {
        return (
            <div className={styles.container}>
                <div className={styles.posts}>
                    {isLoading ? (
                        <span>Loading...</span>
                    ) : (
                        data?.data?.map((post) => (
                            <div className={styles.post} key={post._id}>
                                <div className={styles.imgContainer}>
                                    <Image
                                        src={post.img}
                                        alt=''
                                        width={200}
                                        height={100}
                                    />
                                </div>
                                <h2 className={styles.postTitle}>
                                    {post.title}
                                </h2>
                                <button
                                    className={styles.delete}
                                    onClick={() => handleDelete(post._id)}
                                >
                                    X
                                </button>
                            </div>
                        ))
                    )}
                </div>
                <form className={styles.new} onSubmit={handleSubmit}>
                    <h1>Add new Post</h1>
                    <input
                        type='text'
                        placeholder='Title'
                        className={styles.input}
                        name='title'
                        onChange={onChange}
                        value={newPost.title}
                    />
                    <input
                        type='text'
                        placeholder='Desc'
                        className={styles.input}
                        name='desc'
                        onChange={onChange}
                        value={newPost.desc}
                    />
                    <input
                        type='text'
                        placeholder='Image'
                        className={styles.input}
                        name='img'
                        onChange={onChange}
                        value={newPost.img}
                    />
                    <textarea
                        placeholder='Tell your story...'
                        className={styles.textArea}
                        cols='30'
                        rows='10'
                        name='content'
                        onChange={onChange}
                        value={newPost.content}
                    ></textarea>
                    <button type='submit' className={styles.button}>
                        Publish
                    </button>
                </form>
            </div>
        );
    }
};

export default Dashboard;
