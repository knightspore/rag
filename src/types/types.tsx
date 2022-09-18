import { definitions } from "./supabase"

export type Subscription = Partial<definitions["subscriptions"]>
export type SubscriptionPreview = Pick<Subscription,"id" | "title" | "icon">

export type Article = Partial<definitions["articles"]>
export type ArticlePreview = Pick<Article, "id" | "title" | "description" | "url" | "pub_date" | "subscription" | "is_read" >

export type ArticleListItem = {
  url: string,
  read: boolean,
  link: string,
  title: string,
  parent: string,
  pubDate: string
}

