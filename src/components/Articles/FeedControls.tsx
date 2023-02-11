/** @format */

import {IoAddSharp} from 'react-icons/io5';
import React, {useState} from 'react';
import {refreshSubscriptions} from '../../lib/api';
import {useAppContext} from '../Providers/AppContextProvider';
import AddSubscriptionForm from '../Subscriptions/AddSubscriptionForm';
import {Disclosure, Tab} from '@headlessui/react';
import SignOut from '../Auth/SignOut';
import RefreshFeedButton from './RefreshFeedButton';
import AllArticlesTabButton from './AllArticlesTabButton';
import LikedArticleTabButton from './LikedArticlesTabButton';
import {Tabs} from '../../lib/types';
import UnreadArticlesTabButton from './UnreadArticlesTabButton';

export default function FeedControls() {
    const {user} = useAppContext();
    const [refreshing, setRefreshing] = useState(false);
    const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Feed);

    function handleSelectTab(t: Tabs) {
        setCurrentTab(t);
    }

    async function handleRefresh() {
        setRefreshing(true);
        await refreshSubscriptions(user?.id);
        setRefreshing(false);
        location.reload();
    }

    return (
        <Disclosure>
            <Tab.List
                as="div"
                className="absolute z-50 flex justify-between p-4 left-4 bottom-4 card dark gap-4"
            >
                <AllArticlesTabButton
                    onClick={() => handleSelectTab(Tabs.Feed)}
                    focused={currentTab === Tabs.Feed}
                />
                <LikedArticleTabButton
                    onClick={() => handleSelectTab(Tabs.Liked)}
                    focused={currentTab === Tabs.Liked}
                />
                <UnreadArticlesTabButton
                    onClick={() => handleSelectTab(Tabs.Unread)}
                    focused={currentTab === Tabs.Unread}
                />
                <RefreshFeedButton
                    onClick={handleRefresh}
                    refreshing={refreshing}
                />
                <Disclosure.Button as="button">
                    <h2>Add</h2> <IoAddSharp size={16} />
                </Disclosure.Button>
                <SignOut />
            </Tab.List>
            <Disclosure.Panel
                as="section"
                className="p-4 bg-slate-900"
            >
                <AddSubscriptionForm />
            </Disclosure.Panel>
        </Disclosure>
    );
}
