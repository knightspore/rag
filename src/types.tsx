import { FeedData } from "feed-reader";

export type SubscriptionListItem = Pick<FeedData, "title" | "link">

export type ArticleListItem = {
  url: string,
  read: boolean,
  link: string,
  title: string,
  parent: string,
  pubDate: string
}

