/** @format */

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import {ReactMarkdown} from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';

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
                <p className="block font-bold">{article.subscription}</p>
            </div>
            <hr />
            <div className="mt-4 prose-a:text-slate-300">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {article.content}
                </ReactMarkdown>
            </div>
        </div>
    );
}
