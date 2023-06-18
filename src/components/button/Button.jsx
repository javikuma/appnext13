import React from 'react';

import styles from './button.module.css';
import Link from 'next/link';

export const Button = ({ text, url }) => {
    return (
        <Link href={url} as='a'>
            <button className={styles.container}>{text}</button>
        </Link>
    );
};
