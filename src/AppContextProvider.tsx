import { User } from "@supabase/supabase-js"
import React, { createContext, useContext, useEffect, useState } from "react"
import { CombinedError  } from "urql"
import { ArticlesEdge, SubscriptionsEdge, useAppQuery } from "./generated/graphql"
import { getCurrentUser } from "./lib/supabase"
import SignIn from "./SignIn"
import refreshSubscriptions from "./util/refreshSubscriptions"

export type AppContextValue = { 
	user: User | null
	setUser: (value: null) => void
	filters: { liked: boolean, unread: boolean },
	setFilters: (value: AppContextValue["filters"]) => void
	fetching: boolean,
	error: CombinedError | undefined,
	subscriptions:  SubscriptionsEdge[] | undefined
	likes: (string | null | undefined)[] | undefined,
	articles: ArticlesEdge[] | undefined,
}

const AppContext = createContext<AppContextValue>({} as AppContextValue)

export function useAppContext() {
	const value = useContext(AppContext)
	if (value === null) {
		throw new Error("No AppContext Value")
	} else {
		return value as AppContextValue
	}
}

export default function AppContextProvider({ children }: { children: React.ReactNode }) {

	const [user, setUser] = useState<AppContextValue["user"]>(null)
	const [filters, setFilters] = useState<AppContextValue["filters"]>({
		liked: false,
		unread: false,
	})

	useEffect(() => {	
		async function login() {
		const u = await getCurrentUser()
		if (!user && u) {
			refreshSubscriptions(u.id)
			setUser(u)
		}
	}
		login()
	}, [])

	const [app] = useAppQuery({
		variables: {
			id: user?.id,
		}
	})

	const value: AppContextValue = {
		user,
		setUser,
		filters,
		setFilters,
		fetching: app.fetching,
		error: app.error,
		subscriptions: app.data?.subscriptions?.edges as SubscriptionsEdge[] | undefined,
		likes: app.data?.likes?.edges.map(({ node}) => {
			return node.article_title
		}),
		articles: app.data?.articles?.edges as ArticlesEdge[] | undefined,
	}

	return <AppContext.Provider value={value}>
		{ user ? children : <SignIn />}
	</AppContext.Provider>

}
