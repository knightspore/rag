import { Subscription } from "../../types/types"
import { supabase } from "../supabase"

export async function addSubscription(sub: Subscription) {
	const { error } = await supabase
		.from('subscriptions')
		.upsert({
			...sub
		})
	return error
}