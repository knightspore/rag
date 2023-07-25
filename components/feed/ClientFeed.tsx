/** @format */

'use client';

import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {Suspense, useEffect, useState} from 'react';
import {getFeedIds} from '../../lib/api';
import {Database} from '../../lib/supabase';
import ArticleCard from './ArticleCard';
import LoadingArticleCard from './LoadingArticleCard';
import Pagination from './Pagination';

export default function ClientFeed() {
    const [article_ids, setArticleIds] = useState<null | {id: string}[]>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [cursor, setCursor] = useState(0);
    const [limit, setLimit] = useState(9);
    const [inc, setInc] = useState(10);

    const hasPrevPage = cursor !== 0 ? true : false;
    const pageNum = Math.floor((limit + 1) / inc);

    function handleNextPage() {
        setCursor(cursor + inc);
        setLimit(limit + inc);
    }

    function handlePrevPage() {
        setCursor(cursor - inc);
        setLimit(limit - inc);
    }

    function itemsPerPage(i: number) {
        setIsLoading(true);
        setCursor(0);
        setInc(i);
        setLimit(i);
        setIsLoading(false);
    }

    async function getArticles(currentCursor: number, currentLimit: number) {
        setIsLoading(true);
        const supabase = createClientComponentClient<Database>();
        const {
            data: {user},
        } = await supabase.auth.getUser();
        const ids = await getFeedIds(currentCursor, currentLimit, user?.id);
        setArticleIds(ids);
        setIsLoading(false);
    }

    useEffect(() => {
        if (!article_ids) {
            setIsLoading(true);
            getArticles(cursor, limit);
            setIsLoading(false);
        }
    }, [cursor, limit, article_ids]);

    useEffect(() => {
        getArticles(cursor, limit);
    }, [cursor, limit, inc]);

    return (
        <section
            id="feed"
            className="p-2 pb-16 m-2 overflow-y-scroll"
        >
            {isLoading &&
                Array(limit).map((v, i) => {
                    return <LoadingArticleCard key={v + i} />;
                })}
            {article_ids?.map(({id}) => {
                /* @ts-expect-error Server Component */
                return <ArticleCard id={id} />;
            })}

            <Pagination
                {...{
                    inc,
                    hasPrevPage,
                    pageNum,
                    handleNextPage,
                    handlePrevPage,
                    itemsPerPage,
                }}
            />
        </section>
    );
}
