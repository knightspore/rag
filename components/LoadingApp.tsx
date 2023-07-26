/** @format */

import {IoSettingsOutline} from 'react-icons/io5';

export default function LoadingApp() {
    return (
        <div className="flex items-center justify-center mt-12 text-center">
            <IoSettingsOutline
                size={32}
                className="animate-spin"
            />
        </div>
    );
}
