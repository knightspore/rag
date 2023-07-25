/** @format */

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {Database} from '../../lib/supabase';
import {cookies} from 'next/headers';
import ArticleCard from './ArticleCard';
import {Suspense} from 'react';
import LoadingArticleCard from './LoadingArticleCard';
import Pagination from './Pagination';
import {getIDs, getSubscriptionIDs, getUnreadIDs} from '../../lib/api';

type Props = {
    subscription?: string;
    unread?: boolean;
    liked?: boolean;
};

export default async function Feed({subscription, unread}: Props) {
    const supabase = createServerComponentClient<Database>({cookies});

    const {
        data: {user},
    } = await supabase.auth.getUser();

    const {data: article_ids} = subscription
        ? // TODO: Liked
          // Subscription
          await getSubscriptionIDs(subscription, user?.id)
        : unread
        ? // Unread
          await getUnreadIDs(user?.id)
        : // Default
          await getIDs(user?.id);
    return (
        <section
            id="feed"
            className="pb-16"
        >
            {article_ids?.map(({id}) => {
                return (
                    <Suspense
                        key={id}
                        fallback={<LoadingArticleCard />}
                    >
                        {/* @ts-expect-error Server Component */}
                        <ArticleCard id={id} />
                    </Suspense>
                );
            })}
            <Pagination />
        </section>
    );
}
