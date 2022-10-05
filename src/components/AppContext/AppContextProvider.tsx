import { User } from "@supabase/supabase-js"
import React, { createContext, useContext, useEffect, useState } from "react"
import type { CombinedError, OperationContext} from "urql"
import { ArticlesEdge, Likes, SubscriptionsEdge, useArticlesQuery, useLikesQuery, useSubscriptionsQuery } from "../../lib/graphql-generated"
import { getCurrentUser } from "../../lib/supabase"
import SignIn from "./SignIn"
import SkeletonApp from "./SkeletonApp"

export type AppContextValue = { 
	user: User | null
	setUser: (value: null) => void
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


  const [subs, subsQuery] = useSubscriptionsQuery({
    variables: {
      id: user?.id
    }
  })
  const [articles, articlesQuery] = useArticlesQuery({
    variables: {
      id: user?.id
    }
  }) 
  const [likes, likesQuery] = useLikesQuery({
    variables: {
      id: user?.id
    }
  })

  const fetching = subs.fetching || articles.fetching || likes.fetching
  const error = subs.error || articles.error || likes.error

  // TODO: Split refreshes contextually
  function refreshAppContext(args?: Partial<OperationContext>) {
    subsQuery({ ...args, requestPolicy: "network-only" })
    articlesQuery({ ...args, requestPolicy: "network-only" })
    likesQuery({ ...args, requestPolicy: "network-only" })
  }

	const value: AppContextValue = {
		user,
		setUser,
    fetching,
    error,
		subscriptions: subs.data?.subscriptions?.edges as SubscriptionsEdge[] | undefined,
    likes: likes.data?.likes?.edges.map(({ node }) => {
			return node?.article_title
		}),
		articles: articles.data?.articles?.edges as ArticlesEdge[] | undefined,
    refreshAppContext,
	}

  return loading ? <SkeletonApp /> :<AppContext.Provider value={value}>
		{ user ? children : <SignIn />}
	</AppContext.Provider>

}
