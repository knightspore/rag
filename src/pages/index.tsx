import Head from 'next/head';
import {Tab} from '@headlessui/react';
import FeedControls from '../components/Articles/FeedControls';
import SubscriptionFeed from '../components/Subscriptions/SubscriptionFeed';
import ArticleFeed from '../components/Articles/ArticleFeed';
import LikedArticleFeed from '../components/Articles/LikedArticleFeed';
import UnreadArticleFeed from '../components/Articles/UnreadArticleFeed';
import {useAppContext} from '../components/Providers/AppContextProvider';
import AddSubscriptionForm from '../components/Subscriptions/AddSubscriptionForm';

export default function HomePage() {

    const {onboarding} = useAppContext();

    return (
        <>
            <Head>
                <title>Reading List - RAG</title>
            </Head>
            <Tab.Group
                as="div"
                className="flex flex-col h-screen overflow-hidden"
            >
                {onboarding && (
                    <div className="p-4 bg-slate-900">
                        <AddSubscriptionForm />
                    </div>
                )}
                <SubscriptionFeed />
                <FeedControls />
                <ArticleFeed />
                <LikedArticleFeed />
                <UnreadArticleFeed />
            </Tab.Group>
        </>
    );
}
