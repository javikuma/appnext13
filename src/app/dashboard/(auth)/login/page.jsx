'use client';
import { signIn, useSession } from 'next-auth/react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Login | Kuma',
    description: 'This is the Login page',
};

const Login = () => {
    const router = useRouter();
    const session = useSession();

    const [form, setForm] = useState({
        name: 'kuma',
        email: 'kuma@gmail.com',
        password: '123456',
    });

    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setForm({
            name: '',
            email: '',
            password: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            signIn('credentials', {
                email: form.email,
                password: form.password,
            });
            resetForm();
            return router.push('/dashboard');
        } catch (error) {
            console.log({ error });
            setError(true);
        }
    };

    useEffect(() => {
        return () => {
            if (session.status === 'authenticated') {
                return router.push('/dashboard');
            }
        };
    }, [session]);

    if (session.status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type='email'
                    placeholder='Email'
                    className={styles.input}
                    required
                    name='email'
                    onChange={handleChange}
                    value={form.email}
                />
                <input
                    type='password'
                    placeholder='Password'
                    className={styles.input}
                    required
                    name='password'
                    onChange={handleChange}
                    value={form.password}
                />
                <button type='submit' className={styles.button}>
                    Login
                </button>
            </form>
            {error && <p className={styles.error}>Something went wrong!</p>}
            <button
                onClick={() => signIn('google')}
                className={styles.button + ' ' + styles.google}
            >
                Login with google
            </button>
            <Link href='dashboard/login'>Login with an existent account</Link>
        </div>
    );
};

export default Login;
