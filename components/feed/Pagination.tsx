/** @format */

'use client';

import {IoArrowBackSharp, IoArrowForwardSharp} from 'react-icons/io5';

export default function Pagination() {
    return (
        <div className="flex justify-between p-4">
            <button
                className={'opacity-1'}
                disabled={false}
            >
                <IoArrowBackSharp size={18} /> Prev
            </button>
            <button disabled>Page 1</button>
            <button>
                Next <IoArrowForwardSharp size={18} />
            </button>
        </div>
    );
}
