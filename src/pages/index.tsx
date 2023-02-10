/** @format */

import Head from 'next/head';
import ArticleFeed from '../components/Articles/ArticleFeed';
import SubscriptionFeed from '../components/Subscriptions/SubscriptionFeed';
import FeedControls from '../components/Articles/FeedControls';
import {Tab} from '@headlessui/react';
import {
    IoEyeOutline,
    IoEyeSharp,
    IoHeartOutline,
    IoHeartSharp,
} from 'react-icons/io5';
import {useState} from 'react';

enum Tabs {
    Feed = 0,
    Liked,
    Unread,
}

export default function HomePage() {
    const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Feed);

    function handleSelectTab(t: Tabs) {
        if (currentTab === t) {
            setCurrentTab(Tabs.Feed);
            window && document.getElementById('feed-tab-button')?.click();
        } else {
            setCurrentTab(t);
        }
    }

    function Feed() {
        return (
            <Tab
                as="div"
                className="hidden"
            >
                <div id="feed-tab-button"></div>
                Feed
            </Tab>
        );
    }

    function Liked() {
        return (
            <Tab
                as="button"
                onClick={() => handleSelectTab(Tabs.Liked)}
            >
                Saved
                {currentTab === Tabs.Liked ? (
                    <IoHeartSharp
                        size={16}
                        title="Filter: all articles"
                    />
                ) : (
                    <IoHeartOutline
                        size={16}
                        title="Filter: saved articles only"
                    />
                )}
            </Tab>
        );
    }

    function Unread() {
        return (
            <Tab
                as="button"
                onClick={() => handleSelectTab(Tabs.Unread)}
            >
                Unread
                {currentTab === Tabs.Unread ? (
                    <IoEyeSharp
                        size={16}
                        title="Filter: all articles"
                    />
                ) : (
                    <IoEyeOutline
                        size={16}
                        title="Filter: unread articles"
                    />
                )}
            </Tab>
        );
    }

    return (
        <Tab.Group
            as="div"
            className="flex flex-col h-screen overflow-hidden"
        >
            <Head>
                <title>Reading List - RAG</title>
            </Head>
            <Tab.List
                as="div"
                className="p-4"
            >
                <FeedControls
                    tabButtons={[
                        <Feed key={'feed'} />,
                        <Liked key={'liked'} />,
                        <Unread key={'unread'} />,
                    ]}
                />
            </Tab.List>
            <div className="p-4 py-2 shadow-inner bg-slate-900">
                <SubscriptionFeed />
            </div>
            <Tab.Panel>
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
