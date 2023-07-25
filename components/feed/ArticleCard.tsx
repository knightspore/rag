/** @format */
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {Database} from '../../lib/supabase';
import Icon from '../../src/components/App/Icon';
import Link from 'next/link';
import LikeButton from '../../components/feed/LikeButton';
import ReadButton from '../../components/feed/ReadButton';
import {cookies} from 'next/headers';
import {getFeedArticle} from '../../lib/api';

type Props = {
    id: string;
};

type Article =
    Database['public']['Functions']['enriched_articles']['Returns'][number];

export default async function ArticleCard({id}: Props) {
    const supabase = createServerComponentClient<Database>({cookies});
    const {
        data: {user},
    } = await supabase.auth.getUser();
    const {data: article} = (await getFeedArticle(id)) as {data: Article};
    return (
        <div
            key={article.id}
            className={`px-2 mb-8 ${article.is_read && 'opacity-20'}`}
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
                {article.liked}
                <LikeButton
                    user_id={user?.id}
                    title={article.title}
                    subscription={article.subscription}
                    liked={article.liked}
                />
                <ReadButton
                    article_id={article?.id}
                    is_read={article.is_read}
                />
                {/*}
                <ShareButton
                    title={article.title}
                    subscription={article.subscription}
                    url={article.url}
                />
                {*/}
                &bull;
                {article.pub_date && (
                    <time>
                        {new Date(article.pub_date).toLocaleTimeString(
                            'en-ZA',
                            {
                                day: 'numeric',
                                month: 'short',
                                hour: 'numeric',
                                minute: '2-digit',
                            }
                        )}
                    </time>
                )}
            </div>
        </div>
    );
}
