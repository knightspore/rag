/** @format */

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {Database} from '../../lib/supabase';
import {cookies} from 'next/headers';
import {Metadata} from 'next';
import SubFeed from '../../components/subscriptions/SubFeed';
import Feed from '../../components/feed/Feed';

const supabase = createServerComponentClient<Database>({cookies});

export const metadata: Metadata = {
    title: 'Reading List',
};

export default async function IndexPage() {
    const {
        data: {user},
    } = await supabase.auth.getUser();

    return (
        <>
            {/* Subscription Feed */}
            <SubFeed />
            {/* Article Feed (10) */}
            <Feed />
            {/* Feed Controls */}
            {/* App Controls */}
        </>
    );
}
