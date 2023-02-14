/** @format */

import {Tab} from '@headlessui/react';
import {IoEyeOutline, IoEyeSharp} from 'react-icons/io5';

type Props = {
    onClick: () => void;
    focused: boolean;
};

export default function UnreadArticlesTabButton({onClick, focused}: Props) {
    return (
        <Tab
            as="button"
            onClick={onClick}
            title="Filter: Unread articles"
        >
            Unread
            {focused ? (
                <IoEyeSharp
                    size={16}
                    title="Filter: all articles"
                />
            ) : (
                <IoEyeOutline
                    size={16}
                    title="Filter: unread articles"
                />
            )}
        </Tab>
    );
}
