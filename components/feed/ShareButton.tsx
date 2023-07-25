/** @format */

'use client';

import {IoShareSharp} from 'react-icons/io5';
import {RWebShare} from 'react-web-share';

type Props = {
    title: string;
    subscription: string;
    url: string;
};

export default function ShareButton({title, subscription, url}: Props) {
    return (
        <>
            <RWebShare
                data={{
                    text: `${title} (${subscription})`,
                    url: `${url}`,
                    title: `${title} | Shared from RAG RSS Reader`,
                }}
            >
                <button>
                    <IoShareSharp size={18} />
                </button>
            </RWebShare>
        </>
    );
}
