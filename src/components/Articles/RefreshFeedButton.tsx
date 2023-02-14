import {IoRefreshSharp} from 'react-icons/io5';

type Props = {
    onClick: () => void;
    refreshing: boolean;
};

export default function RefreshFeedButton({onClick, refreshing}: Props) {
    return (
        <button onClick={onClick}>
            <IoRefreshSharp
                size={16}
                title="Refresh feeds"
                className={refreshing ? 'animate-spin opacity-50' : ''}
            />
        </button>
    );
}
