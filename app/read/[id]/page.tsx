/** @format */

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import {ReactMarkdown} from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import LikeButton from '../../../components/feed/LikeButton';
import ReadButton from '../../../components/feed/ReadButton';

export default async function ReadArticlePage({
    params: {id},
}: {
    params: {id: string};
}) {
    const supabase = createServerComponentClient({cookies});
    const {data: article} = await supabase
        .from('articles')
        .select()
        .eq('id', id)
        .limit(1)
        .single();

    async function getContent() {
        const res = await fetch('http://localhost:3000/api/articles/read', {
            method: 'POST',
            body: JSON.stringify({url: article.url}),
        });
        const {content} = await res.json();
        const {error} = await supabase
            .from('articles')
            .update({content})
            .eq('id', id);
        if (error) {
            console.log(error);
        }
        revalidatePath('/');
    }

    if (article.content === null) {
        await getContent();
    }

    return (
        <div>
            <div className="space-y-2">
                <h1 className="block">{article.title}</h1>
                <p className="block">
                    From{' '}
                    <span className="font-bold">{article.subscription}</span>
                </p>
                <div className="flex gap-4">
                    <LikeButton
                        user_id={id}
                        title={article.title}
                        subscription={article.subscription}
                        liked={article.liked}
                    />
                    <ReadButton
                        article_id={article.id}
                        is_read={article.is_read}
                    />
                </div>
            </div>
            <hr />
            <div className="prose-a:text-slate-300">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {article.content}
                </ReactMarkdown>
            </div>
        </div>
    );
}
