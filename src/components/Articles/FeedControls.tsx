/** @format */

import {IoAddSharp} from 'react-icons/io5';
import React, {useState} from 'react';
import {refreshSubscriptions} from '../../lib/api';
import {useAppContext} from '../Providers/AppContextProvider';
import AddSubscriptionForm from '../Subscriptions/AddSubscriptionForm';
import {Disclosure} from '@headlessui/react';
import SignOut from '../Auth/SignOut';
import RefreshFeedButton from './RefreshFeedButton';
import AllArticlesTabButton from './AllArticlesTabButton';
import LikedArticleTabButton from './LikedArticlesTabButton';
import {Tabs} from '../../lib/types';
import UnreadArticlesTabButton from './UnreadArticlesTabButton';

type Props = {
    currentTab: Tabs;
    handleSelectTab: (t: Tabs) => void;
};

export default function FeedControls({currentTab, handleSelectTab}: Props) {
    const {user} = useAppContext();
    const [refreshing, setRefreshing] = useState(false);

    async function handleRefresh() {
        setRefreshing(true);
        await refreshSubscriptions(user?.id);
        setRefreshing(false);
        location.reload();
    }

    return (
        <Disclosure>
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <RefreshFeedButton
                        onClick={handleRefresh}
                        refreshing={refreshing}
                    />
                    <AllArticlesTabButton />
                    <LikedArticleTabButton
                        onClick={() => handleSelectTab(Tabs.Liked)}
                        focused={currentTab === Tabs.Liked}
                    />
                    <UnreadArticlesTabButton
                        onClick={() => handleSelectTab(Tabs.Unread)}
                        focused={currentTab === Tabs.Unread}
                    />
                </div>
                <div className="flex gap-4">
                    <Disclosure.Button as="button">
                        <h2>Add</h2> <IoAddSharp size={16} />
                    </Disclosure.Button>
                    <SignOut />
                </div>
            </div>
            <Disclosure.Panel>
                <AddSubscriptionForm />
            </Disclosure.Panel>
        </Disclosure>
    );
}
