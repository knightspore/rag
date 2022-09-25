import { FeedData } from "feed-reader";
import { v4 as uuidv4 } from 'uuid';
import { Articles, Subscriptions } from "../generated/graphql";

export async function parseFeed(title: string, url: string, userId: string): Promise<{ subscription: Subscriptions, articles: Articles[] }> {
	const feed = await getFeedData(url)
	const date = new Date().toDateString()
	const id = uuidv4()
	const articles = getArticlesFromFeed(feed, title, date)
	const subscription = getSubscriptionFromFeed(feed, id, title, date, url, userId, articles)
	return { subscription, articles }
}

async function getFeedData(url: string): Promise<FeedData> {
    const res = await fetch("/api/feed/get", {
      method: "POST",
      body: JSON.stringify({ url }),
    })
		const feed: FeedData = await res.json()
		return feed
}

function getSubscriptionFromFeed(feed: FeedData, id: string, title: string, date: string, url: string, userId: string, articles: Articles[]): Subscriptions {
	return {
		id: id,
		updated_at: date,
		title: title,
		description: feed.description,
		url: url,
		icon: `https://www.google.com/s2/favicons?domain=${url}`,
		user: userId,
		muted: false,
		articles: articles.map(a => a.id)
	}
}

function getArticlesFromFeed(feed: FeedData, title: string, date: string): Articles[] {
	return feed.entries.map((entry: { title: string, link: string, published: string, description: string }): Articles => {
		return {
			id: uuidv4(),
			created_at: date,
			title: entry.title,
			url: entry.link,
			pub_date: entry.published,
			description: entry.description,
			is_read: false,
			subscription: title,
		}
	})
}

