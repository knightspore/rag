/** @format */

'use client';

import {useState} from 'react';
import Pagination from './Pagination';

export default function FeedControlsWrapper() {
    const [cursor, setCursor] = useState(0);
    const [limit, setLimit] = useState(9);
    const [inc, setInc] = useState(10);

    return (
        <>
            <Pagination
                cursor={cursor}
                limit={limit}
                inc={inc}
            />
        </>
    );
}
