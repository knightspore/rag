/** @format */
import MenuItem from './MenuItem';
import {
    IoDocumentsSharp,
    IoEyeOutline,
    IoHeartSharp,
    IoRefreshSharp,
} from 'react-icons/io5';

export default function UserMenu() {
    return (
        <nav className="flex items-center gap-2">
            <MenuItem
                icon={<IoDocumentsSharp size={14} />}
                path="/"
                text={'All Feeds'}
            />
            <MenuItem
                icon={<IoEyeOutline size={14} />}
                path="/unread"
                text={'Unread'}
            />
            <MenuItem
                icon={<IoHeartSharp size={14} />}
                path="/liked"
                text={'Liked'}
            />
            <MenuItem
                icon={<IoRefreshSharp size={14} />}
                path="/api/refresh"
                text={'Refresh'}
            />
        </nav>
    );
}
