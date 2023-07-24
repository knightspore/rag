/** @format */
import SubFeed from '../../components/subscriptions/SubFeed';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {Database} from '../../lib/supabase';
import {cookies} from 'next/headers';
import {getFeed} from '../../lib/api';
import Icon from '../../src/components/App/Icon';
import Link from 'next/link';
import {Suspense} from 'react';

const supabase = createServerComponentClient<Database>({cookies});

export default async function IndexPage() {
    const {
        data: {user},
    } = await supabase.auth.getUser();

    const feedData = await getFeed(user?.id);

    console.log(feedData);

    return (
        <>
            {/* Subscription Feed */}
            <SubFeed user_id={user?.id} />
            {/* Article Feed (10) */}
            <section
                id="feed"
                className="p-2 pb-16 m-2 overflow-y-scroll"
            >
                {feedData.data.map((article) => {
                    console.log(Object.keys(article));
                    return (
                        <div
                            key={article.id}
                            className={`px-2 mb-8 ${
                                article.is_read && 'opacity-20'
                            }`}
                        >
                            <div className="text-slate-400">
                                <div className="inline-block mr-1 translate-y-[2px]">
                                    <Icon
                                        src={
                                            'https://www.google.com/s2/favicons?domain=' +
                                            article.url
                                        }
                                    />
                                </div>
                                {article.subscription}
                            </div>
                            <Link
                                prefetch={false}
                                href={`/read/${article.id}`}
                            >
                                <h2 className="mb-1 text-xl font-medium cursor-pointer">
                                    {article.title}
                                </h2>
                            </Link>
                            <div className="flex items-center gap-2 text-slate-400">
                                {/*}
                                <LikeButton
                                    title={article.title}
                                    subscription={article.subscription}
                                />
                                <MarkAsReadButton
                                    id={article?.id}
                                    is_read={article?.is_read || false}
                                />
                                <ShareButton
                                    title={article.title}
                                    url={article.url}
                                    subscription={article.subscription}
                                />
                                &bull;
                                {article.pub_date && (
                                    <time>
                                        {new Date(
                                            article.pub_date
                                        ).toLocaleTimeString('en-ZA', {
                                            day: 'numeric',
                                            month: 'short',
                                            hour: 'numeric',
                                            minute: '2-digit',
                                        })}
                                    </time>
                                )}
                                {*/}
                            </div>
                        </div>
                    );
                })}
            </section>
            {/* Feed Controls */}
            {/* App Controls */}
            <pre>{JSON.stringify(user.data, null, 2)}</pre>
        </>
    );
}
