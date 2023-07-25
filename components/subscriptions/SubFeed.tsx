/** @format */
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import SubCard from './SubCard';
import {cookies} from 'next/headers';
import {Suspense} from 'react';
import LoadingSubCard from './LoadingSubCard';
import UserMenu from '../UserMenu';

export default async function SubFeed() {
    const supabase = createServerComponentClient({cookies});
    const {
        data: {user},
    } = await supabase.auth.getUser();

    const subscriptions = await supabase
        .from('subscriptions')
        .select('id')
        .eq('user', user?.id);

    return (
        <section
            id="subscriptions"
            className="relative shadow-inner bg-slate-900/50"
        >
            <div className="fixed absolute top-0 bottom-0 right-0 z-30 w-24 bg-gradient-to-l from-slate-900" />
            <div className="relative flex p-2 pl-2 overflow-x-auto no-scrollbar gap-2">
                <UserMenu />
                <hr className="h-8 card" />
                {subscriptions.data?.map((subscription) => {
                    return (
                        <Suspense
                            key={subscription.id}
                            fallback={<LoadingSubCard />}
                        >
                            {/* @ts-expect-error Server Component */}
                            <SubCard id={subscription.id} />
                        </Suspense>
                    );
                })}
            </div>
            <div />
        </section>
    );
}
