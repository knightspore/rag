import { Subscriptions } from "../../generated/graphql"
import { supabase } from "../supabase"

export async function addSubscription(sub: Subscriptions) {
	const { error } = await supabase
		.from('subscriptions')
		.upsert({
			...sub
		})
	return error
}