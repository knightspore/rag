/** @format */
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import SubscriptionFeedAnimation from '../../components/animation/SubscriptionFeedAnimation';
import SubCard from './SubCard';
import {cookies} from 'next/headers';
import {Suspense} from 'react';
import LoadingSubCard from './LoadingSubCard';

type Props = {
    user_id: string;
};

export default async function SubFeed({user_id}: Props) {
    const supabase = createServerComponentClient({cookies});
    const subscriptions = await supabase
        .from('subscriptions')
        .select('id')
        .eq('user', user_id);

    return (
        <section
            id="subscriptions"
            className="relative shadow-inner bg-slate-900/50"
        >
            <div className="fixed absolute top-0 bottom-0 right-0 z-30 w-24 bg-gradient-to-l from-slate-900" />
            <SubscriptionFeedAnimation>
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
            </SubscriptionFeedAnimation>
            <div />
        </section>
    );
}
