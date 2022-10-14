import React from "react"
import { Provider } from "urql"
import { createClient, defaultExchanges } from "urql"
import { getAuthKeys } from "../../lib/env"

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


export default function UrqlContextProvider({ children }: { children: React.ReactNode }) {
	return <Provider value={client}>
		{children}
	</Provider>
}
