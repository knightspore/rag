/** @format */

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {Database} from '../../lib/supabase';
import {cookies} from 'next/headers';
import ArticleCard from './ArticleCard';
import {Suspense} from 'react';
import LoadingArticleCard from './LoadingArticleCard';

const supabase = createServerComponentClient<Database>({cookies});

export default async function Feed() {
    const {
        data: {user},
    } = await supabase.auth.getUser();

    const {data: article_ids} = await supabase
        .from('articles')
        .select('id')
        .eq('user_id', user?.id)
        .order('pub_date', {
            ascending: false,
            nullsFirst: false,
        })
        .limit(10);

    return (
        <section
            id="feed"
            className="p-2 pb-16 m-2 overflow-y-scroll"
        >
            {article_ids?.map(({id}) => {
                return (
                    <Suspense
                        key={id}
                        fallback={<LoadingArticleCard />}
                    >
                        <ArticleCard id={id} />
                    </Suspense>
                );
            })}
        </section>
    );
}
