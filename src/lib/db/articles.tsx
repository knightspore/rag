import { Articles } from "../../generated/graphql"
import { supabase } from "../supabase"

export async function addArticles(articles: Articles[]) {
	const { error } = await supabase
		.from('articles')
		.upsert([
			...articles
		])
	return error
}