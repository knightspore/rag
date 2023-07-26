/** @format */
'use server';

import 'server-only';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import {Database} from './supabase';

const supabase = createServerComponentClient({cookies});

// UPDATE

export async function likeArticle(
    article_title: string,
    subscription_title: string,
    user_id?: string,
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

// SELECT

type UserFeedResponse = {
    error: Error | null;
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
    offset = 0,
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

export async function getFeedIds(cursor: number, limit: number, id?: string) {
    const {data: article_ids} = await supabase
        .from('articles')
        .select('id')
        .eq('user_id', id)
        .order('pub_date', {
            ascending: false,
            nullsFirst: false,
        })
        .range(cursor, limit);
    return article_ids;
}

export async function getFeedArticle(id?: string) {
    return await supabase
        .rpc('enriched_articles', {
            article_id: id,
        })
        .limit(1)
        .single();
}

export async function getIDs(user_id?: string) {
    return await supabase
        .from('articles')
        .select('id')
        .eq('user_id', user_id)
        .order('pub_date', {
            ascending: false,
            nullsFirst: false,
        })
        .range(0, 30);
}

export async function getSubscriptionIDs(
    subscription: string,
    user_id?: string,
) {
    return await supabase
        .from('articles')
        .select('id')
        .eq('user_id', user_id)
        .order('pub_date', {
            ascending: false,
            nullsFirst: false,
        })
        .eq('subscription', subscription)
        .range(0, 30);
}

export async function getUnreadIDs(user_id?: string) {
    return await supabase
        .from('articles')
        .select('id')
        .eq('user_id', user_id)
        .eq('is_read', false)
        .order('pub_date', {
            ascending: false,
            nullsFirst: false,
        })
        .range(0, 30);
}

export async function getLikedIDs(user_id?: string) {
    const {data: likes} = await supabase
        .from('likes')
        .select('article_title')
        .eq('user_id', user_id)
        .order('id', {
            ascending: false,
            nullsFirst: false,
        })
        .range(0, 30);
    console.log({likes});
    const data = await supabase
        .from('articles')
        .select()
        .in('title', likes?.map((l) => l.article_title) ?? [])
        .order('pub_date', {
            ascending: false,
            nullsFirst: false,
        });
    console.log({data});
    return data;
}

export async function refreshSubscriptions(user_id?: string) {
    await fetch('http://localhost:3000/api/subscriptions/refresh', {
        method: 'POST',
        body: JSON.stringify({
            userId: user_id,
        }),
    });
    revalidatePath('/');
}
