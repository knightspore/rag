/** @format */

import {Tab} from '@headlessui/react';
import FeedControls from './FeedControls';
import {useState} from 'react';
import ArticleFeed from './ArticleFeed';
import SubscriptionFeed from '../Subscriptions/SubscriptionFeed';
import {Tabs} from '../../lib/types';

export default function TabbedFeed() {
    const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Feed);

    function handleSelectTab(t: Tabs) {
        if (currentTab === t) {
            setCurrentTab(Tabs.Feed);
            window && document.getElementById('feed-tab-button')?.click();
        } else {
            setCurrentTab(t);
        }
    }

    return (
        <Tab.Group
            as="div"
            className="flex flex-col h-screen overflow-hidden"
        >
            <Tab.List
                as="div"
                className="p-4"
            >
                <FeedControls
                    currentTab={currentTab}
                    handleSelectTab={handleSelectTab}
                />
            </Tab.List>
            <div className="p-4 py-2 shadow-inner bg-slate-900">
                <SubscriptionFeed />
            </div>
            <Tab.Panel className="overflow-y-scroll">
                <ArticleFeed />
            </Tab.Panel>
            <Tab.Panel>
                <ArticleFeed />
            </Tab.Panel>
            <Tab.Panel>
                <ArticleFeed />
            </Tab.Panel>
        </Tab.Group>
    );
}
