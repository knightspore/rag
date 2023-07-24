import {createServerActionClient} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"
import {Database} from "./supabase";

const supabase = createServerActionClient({ cookies })

export async function likeArticle(
  user_id: string,
  article_title: string,
  subscription_title: string
) {
  return await supabase.from("likes").insert({
    user_id,
    article_title,
    subscription_title,
  });
}

export async function unlikeArticle(article_title: string) {
  return await supabase
    .from("likes")
    .delete()
    .eq("article_title", article_title);
}

export async function markArticleRead(article_id: string, read: boolean) {
  return await supabase
    .from("articles")
    .update({
      is_read: read,
    })
    .eq("id", article_id);
}

export type Article = Database["public"]["Tables"]["articles"]["Row"]

type EnrichedArticle = Article & {
  like: typeof likeArticle;
  unlike: typeof unlikeArticle;
  markRead: typeof markArticleRead;
};

type UserFeedResponse = {
  error: any;
  data: Array<EnrichedArticle>;
  count: number;
  status: number;
  statusText: "OK" | string;
  next: () => Promise<UserFeedResponse>;
};

export async function getFeed(
  id?: string,
  subscription: string | null = null,
  count = 30,
  offset = 0
): Promise<UserFeedResponse> {
  const result = {
    ...(subscription
      ? await supabase
          .rpc("user_feed", {
            user_id: id,
            article_count: count,
            article_offset: offset,
          })
          .eq("subscription", subscription)
      : await supabase.rpc("user_feed", {
          user_id: id,
          article_count: count,
          article_offset: offset,
        })),
    next: async () => await getFeed(id, subscription, count, offset + 10),
  };

  const enrichedArticles = result.data.map((article: Article) => {
    return {
      ...article,
      ...{
        like: async (user_id: string) =>
          await likeArticle(user_id, article.title, article.subscription),
        unlike: async () => await unlikeArticle(article.title),
        markRead: async () =>
          await markArticleRead(article.id, !article.is_read),
      },
    };
  });

  result.data = enrichedArticles;

  return result as UserFeedResponse;
}

