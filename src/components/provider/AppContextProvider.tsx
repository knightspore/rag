import React, { createContext, useContext, useEffect, useState } from "react"
import { GetSubscriptionsQuery, useGetArticlesQuery, useGetSubscriptionsQuery } from "../../generated/graphql"
import { supabase } from "../../lib/supabase"
import { User } from "@supabase/supabase-js"
import { type } from "os"

export type AppContextValue = { 
	user: User | null
	subscriptions: GetSubscriptionsQuery["subscriptionsCollection"] | undefined
	articles: string[] | []
}

const AppContext = createContext<AppContextValue>({} as AppContextValue)

export function useAppContext() {
	const value = useContext(AppContext)
	if (value == null) {
		throw new Error("No AppContext Value")
	} else {
		return value as AppContextValue
	}
}

export default function AppContextProvider({ children }: { children: React.ReactNode }) {

	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [articles, setArticles] = useState<string[] | []>([])

	useEffect(() => {
		async function getCurrentUser() {
			const { data: { session}, error, } = await supabase.auth.getSession()
			if (error) {
				alert(error)
			}
			session && setUser(session.user)
		}
		if (!user) {
			setLoading(true)
			getCurrentUser()
			setLoading(false)
		}
	}, [user])

	const [subscriptionsQuery] = useGetSubscriptionsQuery({
		variables: {
			id: user?.id
		}
	})

	const subscriptions = (loading || subscriptionsQuery.fetching || subscriptionsQuery.error) ? undefined : subscriptionsQuery.data?.subscriptionsCollection

	useEffect(() => {
		subscriptions?.edges.map(({ node }) => {
			node.articles?.forEach((item) => {
				if (typeof (item) == "string" && item?.length > 0) {
					setArticles((value) => [...value, item])
				}
			})
		})
	}, [subscriptions])

  const [articlesQuery] = useGetArticlesQuery({
    variables: {
      ids: articles,
    }
  })

	typeof(articlesQuery)

	return <AppContext.Provider value={{ user, subscriptions, articles }}>
		{children}
	</AppContext.Provider>

}
