/** @format */

import {Tab} from '@headlessui/react';
import {IoHeartOutline, IoHeartSharp} from 'react-icons/io5';

type Props = {
    onClick: () => void;
    focused: boolean;
};

export default function LikedArticleTabButton({onClick, focused}: Props) {
    return (
        <Tab
            as="button"
            onClick={onClick}
        >
            Saved
            {focused ? (
                <IoHeartSharp
                    size={16}
                    title="Filter: all articles"
                />
            ) : (
                <IoHeartOutline
                    size={16}
                    title="Filter: saved articles only"
                />
            )}
        </Tab>
    );
}
