import {Tab} from '@headlessui/react';

export default function AllArticlesTabButton() {
    return (
        <Tab
            as="div"
            className="hidden"
        >
            <div id="feed-tab-button">Feed</div>
        </Tab>
    );
}
