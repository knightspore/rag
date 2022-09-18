import { createClient, defaultExchanges } from "urql"
import { getAuthKeys } from "../constants/env"

const { supabaseAnonKey } = getAuthKeys()

export const client = createClient({
	url: process.env.NEXT_PUBLIC_SUPABASE_URL + "/graphql/v1",
	exchanges: defaultExchanges,
	fetchOptions: () => {
		return {
			headers: {
				apiKey: supabaseAnonKey,
				authorization: `Bearer: ${supabaseAnonKey}`
			}
		}
	}
})