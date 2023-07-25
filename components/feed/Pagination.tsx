'use client';
/** @format */


import {IoArrowBackSharp, IoArrowForwardSharp} from 'react-icons/io5';

type Props = {
    inc: number;
    hasPrevPage: boolean;
    pageNum: number;
    handleNextPage: () => void;
    handlePrevPage: () => void;
    itemsPerPage: (i: number) => void;
};

const PAGE_SIZES = [10, 25, 50];

export default function Pagination({
    inc,
    hasPrevPage,
    pageNum,
    handleNextPage,
    handlePrevPage,
    itemsPerPage,
}: Props) {
    return (
        <>
            <div className="flex items-center justify-between p-4">
                <button
                    onClick={handlePrevPage}
                    className={`${!hasPrevPage && 'opacity-0'} card p-2`}
                    disabled={!hasPrevPage}
                >
                    <IoArrowBackSharp size={18} /> Prev
                </button>
                <p>Page {pageNum}</p>
                <button
                    onClick={handleNextPage}
                    className="p-2 card"
                >
                    Next <IoArrowForwardSharp size={18} />
                </button>
            </div>
            <fieldset className="flex flex-col items-center justify-center p-4 gap-2 accent-slate-800">
                <p>
                    <legend>Items per Page</legend>
                </p>
                <div className="flex items-center justify-center gap-2">
                    {PAGE_SIZES.map((size) => {
                        return (
                            <label
                                key={`show-${size}`}
                                htmlFor={`show-${size}`}
                                className="flex items-center p-2 py-1 gap-2 card"
                            >
                                <input
                                    onChange={() => itemsPerPage(size)}
                                    type="radio"
                                    name="perPage"
                                    id={`show-${size}`}
                                    checked={inc === size}
                                    value={size}
                                />
                                {size}
                            </label>
                        );
                    })}
                </div>
            </fieldset>
        </>
    );
}
