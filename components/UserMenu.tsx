/** @format */
import MenuItem from './MenuItem';
import {IoDocumentsSharp, IoEyeOutline, IoHeartSharp} from 'react-icons/io5';
import RefreshButton from './RefreshButton';

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
            <RefreshButton />
        </nav>
    );
}
