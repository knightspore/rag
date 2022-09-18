import React, { createContext } from "react"
import { Client, createClient } from "urql"

const client = createClient({
	url: process.env.NEXT_PUBLIC_SUPABASE_URL + "/graphql/v1",
	fetchOptions: () => {
		return {
			headers: {
				authorization: `Bearer: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
			}
		}
	}
})

const UrqlContext = createContext<Client | null>(null)

export default function UrqlContextProvider({ children }: { children: React.ReactNode }) {

	return <UrqlContext.Provider value={client}>
		{children}
	</UrqlContext.Provider>
}