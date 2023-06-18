'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const metadata = {
    title: 'Register | Kuma',
    description: 'This is the Register page',
};

const Register = () => {
    const router = useRouter();

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
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            res.status === 201 &&
                router.push(
                    '/dashboard/login?success=Account has been created'
                );
        } catch (error) {
            console.log({ error });
            setError(true);
        }
        resetForm();
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='name'
                    className={styles.input}
                    required
                    name='name'
                    onChange={handleChange}
                    value={form.name}
                />
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
                    Register
                </button>
            </form>
            {error && <p className={styles.error}>Something went wrong!</p>}
            <Link href='dashboard/login' as='a'>
                Login with an existent account
            </Link>
        </div>
    );
};

export default Register;
