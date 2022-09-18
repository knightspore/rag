import { definitions } from "./supabase"

export type AppContextGQLResult = {
	node: SubscriptionPreview& { articles: Article[]  }
}

export type Subscription = Partial<definitions["subscriptions"]>
export type SubscriptionPreview = Pick<Subscription,"id" | "title" | "icon"> 

export type Article = Partial<definitions["articles"]>
export type ArticlePreview = Pick<Article, "id" | "title" | "description" | "url" | "pub_date" | "subscription" | "is_read" >