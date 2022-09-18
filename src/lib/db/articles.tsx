import { Article } from "../../types/types"
import { supabase } from "../supabase"

export async function addArticles(articles: Article[]) {
	const { error } = await supabase
		.from('articles')
		.upsert([
			...articles
		])
	return error
}