/** @format */

import {
    IoEyeOutline,
    IoEyeSharp,
    IoHeartOutline,
    IoHeartSharp,
    IoAddSharp,
    IoRefreshSharp,
} from 'react-icons/io5';
import React, {useState} from 'react';
import {refreshSubscriptions} from '../../lib/api';
import {useAppContext} from '../Providers/AppContextProvider';
import AddSubscriptionForm from '../Subscriptions/AddSubscriptionForm';
import {Disclosure} from '@headlessui/react';
import SignOut from '../Auth/SignOut';

export default function FeedControls({
    tabButtons,
}: {
    tabButtons: React.ReactNode[];
}) {
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
                    <button onClick={handleRefresh}>
                        Refresh
                        <IoRefreshSharp
                            size={16}
                            title="Hide previously read posts."
                            className={
                                refreshing ? 'animate-spin opacity-50' : ''
                            }
                        />
                    </button>
                    {tabButtons.map((b) => b)}
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
