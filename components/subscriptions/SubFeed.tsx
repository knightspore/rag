/** @format */
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import SubCard from './SubCard';
import {cookies} from 'next/headers';
import {Suspense} from 'react';
import LoadingSubCard from './LoadingSubCard';

export default async function SubFeed() {
    const supabase = createServerComponentClient({cookies});
    const {
        data: {user},
    } = await supabase.auth.getUser();

    const subscriptions = await supabase
        .from('subscriptions')
        .select('id')
        .order('created_at', {ascending: false, nullsFirst: false})
        .eq('user', user?.id);

    return (
        <>
            {subscriptions.data?.map((subscription) => {
                return (
                    <Suspense
                        key={subscription.id}
                        fallback={<LoadingSubCard />}
                    >
                        <SubCard id={subscription.id} />
                    </Suspense>
                );
            })}
        </>
    );
}
