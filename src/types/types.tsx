import { definitions } from "./supabase"

export type SubscriptionPreview = Pick<definitions["subscriptions"],"id" | "title" | "icon">

export type ArticleListItem = {
  url: string,
  read: boolean,
  link: string,
  title: string,
  parent: string,
  pubDate: string
}

