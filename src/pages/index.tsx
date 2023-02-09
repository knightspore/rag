/** @format */

import Head from 'next/head';
import ArticleFeed from '../components/Articles/ArticleFeed';
import SubscriptionFeed from '../components/Subscriptions/SubscriptionFeed';
import FeedControls from '../components/Articles/FeedControls';

export default function HomePage() {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Head>
                <title>Reading List - RAG</title>
            </Head>
            <div className="p-4">
                <FeedControls />
            </div>
            <div className="p-4 py-2 shadow-inner bg-slate-900">
                <SubscriptionFeed />
            </div>
            <ArticleFeed />
        </div>
    );
}
