/** @format */
'use server';

import {createServerActionClient} from '@supabase/auth-helpers-nextjs';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import {Database} from './supabase';

const supabase = createServerActionClient({cookies});

export async function likeArticle(
    article_title: string,
    subscription_title: string,
    user_id?: string
) {
    await supabase.from('likes').insert({
        user_id,
        article_title,
        subscription_title,
    });
    revalidatePath('/');
}

export async function unlikeArticle(article_title: string) {
    await supabase.from('likes').delete().eq('article_title', article_title);
    revalidatePath('/');
}

export async function markArticleRead(article_id: string, read: boolean) {
    await supabase
        .from('articles')
        .update({
            is_read: read,
        })
        .eq('id', article_id);
    revalidatePath('/');
}

export type FeedResults =
    Database['public']['Functions']['user_feed']['Returns'];
export type FeedResult = FeedResults[number];

type UserFeedResponse = {
    error: any;
    data: Array<FeedResult>;
    count: number;
    status: number;
    statusText: 'OK' | string;
    next: () => Promise<UserFeedResponse>;
};

export async function getFeed(
    id?: string,
    subscription: string | null = null,
    count = 30,
    offset = 0
): Promise<UserFeedResponse> {
    const result = {
        ...(subscription !== null
            ? await supabase
                  .rpc('user_feed', {
                      userid: id,
                      article_count: count,
                      article_offset: offset,
                  })
                  .eq('subscription', subscription)
            : await supabase.rpc('user_feed', {
                  userid: id,
                  article_count: count,
                  article_offset: offset,
              })),
        next: async () => await getFeed(id, subscription, count, offset + 10),
    };

    return result as UserFeedResponse;
}

export async function getFeedArticle(id?: string) {
    return await supabase
        .rpc('enriched_articles', {
            article_id: id,
        })
        .limit(1)
        .single();
}
