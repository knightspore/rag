/** @format */

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {Database} from '../../lib/supabase';
import {cookies} from 'next/headers';
import ArticleCard from './ArticleCard';
import {Suspense} from 'react';
import LoadingArticleCard from './LoadingArticleCard';
import Pagination from './Pagination';

type Props = {
    subscription: string;
};

export default async function Feed({subscription}: Props) {
    const supabase = createServerComponentClient<Database>({cookies});

    const {
        data: {user},
    } = await supabase.auth.getUser();

    const {data: article_ids} = subscription
        ? await supabase
              .from('articles')
              .select('id')
              .eq('user_id', user?.id)
              .order('pub_date', {
                  ascending: false,
                  nullsFirst: false,
              })
              .eq('subscription', subscription)
              .range(0, 9)
        : await supabase
              .from('articles')
              .select('id')
              .eq('user_id', user?.id)
              .order('pub_date', {
                  ascending: false,
                  nullsFirst: false,
              })
              .range(0, 9);

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
