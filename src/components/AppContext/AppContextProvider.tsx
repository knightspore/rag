import { User } from "@supabase/supabase-js"
import React, { createContext, useContext, useEffect, useState } from "react"
import type { CombinedError, OperationContext} from "urql"
import { ArticlesEdge, SubscriptionsEdge, useAppQuery } from "../../lib/graphql-generated"
import { getCurrentUser } from "../../lib/supabase"
import SignIn from "./SignIn"
import SkeletonApp from "./SkeletonApp"

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
  refreshAppContext: (args?: Partial<OperationContext>) => void 
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

  const [loading, setLoading] = useState(true)
	const [user, setUser] = useState<AppContextValue["user"]>(null)
	const [filters, setFilters] = useState<AppContextValue["filters"]>({
		liked: false,
		unread: false,
	})

	useEffect(() => {	
		async function login() {
      setLoading(true)
      const u = await getCurrentUser()
      setUser(u)
      setLoading(false)
    }
    if (!user) {
      login()
    }
	}, [user])

	const [app, appQuery] = useAppQuery({
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
    refreshAppContext: () => appQuery({ requestPolicy: "network-only" })
	}

  return loading ? <SkeletonApp /> :<AppContext.Provider value={value}>
		{ user ? children : <SignIn />}
	</AppContext.Provider>

}
