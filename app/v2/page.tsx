/** @format */

import {Metadata} from 'next';
import SubFeed from '../../components/subscriptions/SubFeed';
import Feed from '../../components/feed/Feed';

export const metadata: Metadata = {
    title: 'Reading List',
};

export default async function IndexPage() {
    return (
        <>
            {/* Subscription Feed */}
            {/* @ts-expect-error Server Component */}
            <SubFeed />
            {/* Article Feed (10) */}
            {/* @ts-expect-error Server Component */}
            <Feed />
            {/* Feed Controls */}
            {/* App Controls */}
        </>
    );
}
