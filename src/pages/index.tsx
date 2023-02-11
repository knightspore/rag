import Head from 'next/head';
import {Tab} from '@headlessui/react';
import FeedControls from '../components/Articles/FeedControls';
import SubscriptionFeed from '../components/Subscriptions/SubscriptionFeed';
import ArticleFeed from '../components/Articles/ArticleFeed';
import LikedArticleFeed from '../components/Articles/LikedArticleFeed';
import UnreadArticleFeed from '../components/Articles/UnreadArticleFeed';

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Reading List - RAG</title>
            </Head>
            <Tab.Group
                as="div"
                className="flex flex-col h-screen overflow-hidden"
            >
                <FeedControls />
                <SubscriptionFeed />
                <ArticleFeed />
                <LikedArticleFeed />
                <UnreadArticleFeed />
            </Tab.Group>
        </>
    );
}
