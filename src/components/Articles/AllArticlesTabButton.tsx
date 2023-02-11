import {Tab} from '@headlessui/react';
import {IoLibraryOutline, IoLibrarySharp} from 'react-icons/io5';

type Props = {
    onClick: () => void;
    focused: boolean;
};

export default function AllArticlesTabButton({onClick, focused}: Props) {
    return (
        <Tab
            as="button"
            onClick={onClick}
        >
            Feed
            {focused ? (
                <IoLibrarySharp size={16} />
            ) : (
                <IoLibraryOutline size={16} />
            )}
        </Tab>
    );
}
