import React, { createContext, useContext, useEffect, useState } from "react"
import { useUserContext } from "./UserContextProvider"
import { GetSubscriptionsQuery, useGetSubscriptionsQuery } from "../../generated/graphql"

export type AppContextValue = { 
	subscriptions: GetSubscriptionsQuery["subscriptionsCollection"] | undefined
	articles: string[] | []
} | null

const AppContext = createContext<AppContextValue>(null)

export function useAppContext() {
	const value = useContext(AppContext)
	if (value == null) {
		throw new Error("No AppContext Value")
	} else {
		return value as AppContextValue
	}
}

export default function AppContextProvider({ children }: { children: React.ReactNode }) {

	const user = useUserContext()
	const [articles, setArticles] = useState<string[] | []>([])

	const [{ data, fetching, error }] = useGetSubscriptionsQuery({
		variables: {
			id: user.id
		}
	})

	const subscriptions = (fetching || error) ? undefined : data?.subscriptionsCollection

	useEffect(() => {
		subscriptions?.edges.map(({ node }) => {
			node.articles?.forEach((item) => {
				if (typeof (item) == "string" && item?.length > 0) {
					setArticles((value) => [...value, item])
				}
			})
		})
	}, [subscriptions])

	return <AppContext.Provider value={{ subscriptions, articles }}>
		{children}
	</AppContext.Provider>

}
