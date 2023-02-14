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
            title="Filter: Liked Articles"
        >
            Saved
            {focused ? (
                <IoHeartSharp size={16} />
            ) : (
                <IoHeartOutline size={16} />
            )}
        </Tab>
    );
}
