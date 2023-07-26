/** @format */

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Feed from '../../../components/feed/Feed';

export default async function SubscriptionPage({
    params: {id},
}: {
    params: {id: string};
}) {
    const supabase = createServerComponentClient({cookies});
    const {data: subscription} = await supabase
        .from('subscriptions')
        .select('title, url, description, updated_at')
        .eq('id', id)
        .limit(1)
        .single();

    return <Feed subscription={subscription?.title} />;
}
