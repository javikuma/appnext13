'use client'; // Error components must be Client Components

import { Button } from '@/components/button/Button';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
            }}
        >
            <h2>Ocurrió un error!</h2>
            <button
                style={{
                    padding: '20px',
                    cursor: 'pointer',
                    backgroundColor: '#53c28b',
                    border: 'none',
                    borderRadius: '5px',
                    width: 'max-content',
                    color: '#fff',
                }}
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Intentar de nuevo
            </button>
            <button
                style={{
                    padding: '20px',
                    cursor: 'pointer',
                    backgroundColor: '#53c28b',
                    border: 'none',
                    borderRadius: '5px',
                    width: 'max-content',
                    color: '#fff',
                }}
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Ir al inicio
            </button>
        </div>
    );
}
