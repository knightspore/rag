import { User } from "@supabase/supabase-js"
import {Maybe} from "graphql/jsutils/Maybe"
import React, { createContext, useContext, useEffect, useState } from "react"
import type { CombinedError, OperationContext} from "urql"
import { ArticlesEdge, PageInfo, SubscriptionsEdge, useArticlesQuery, useLikesQuery, useSubscriptionsQuery } from "../../lib/graphql-generated"
import { getCurrentUser } from "../../lib/supabase"
import SignIn from "./SignIn"
import SkeletonApp from "./SkeletonApp"

export type AppContextValue = { 
	user: User | null
	setUser: (value: null) => void
  fetching: {
    subscriptions: boolean,
    articles: boolean,
    likes: boolean,
  },
  error: {
    subscriptions: CombinedError | undefined,
    articles: CombinedError | undefined,
    likes: CombinedError | undefined,
  },
	subscriptions:  SubscriptionsEdge[] | undefined
  refreshSubscriptions: (args?: Partial<OperationContext>) => void 
	likes: (string | null | undefined)[] | undefined,
  refreshLikes: (args?: Partial<OperationContext>) => void 
	articles: ArticlesEdge[] | undefined,
  refreshArticles: (args?: Partial<OperationContext>) => void 
  cursor: PageInfo
  setCursor: (val: [Maybe<string>, Maybe<string>]) => void
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
  const [cursor, setCursor] = useState<[Maybe<string>, Maybe<string>]>([null, null])

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
      id: user?.id,
      cursor: cursor[1],
    }
  }) 
  const [likes, likesQuery] = useLikesQuery({
    variables: {
      id: user?.id
    }
  })

	const value: AppContextValue = {
		user,
		setUser,
    fetching: {
      subscriptions: subs.fetching,
      articles: articles.fetching,
      likes: likes.fetching
    },
    error:{
      subscriptions: subs.error,
      articles: articles.error,
      likes: likes.error
    },
		subscriptions: subs.data?.subscriptions?.edges as SubscriptionsEdge[] | undefined,
    refreshSubscriptions: (args) => subsQuery({ ...args, requestPolicy: "network-only" }),
    likes: likes.data?.likes?.edges.map(({ node }) => {
			return node?.article_title
		}),
    refreshLikes: (args) => likesQuery({ ...args, requestPolicy: "network-only" }),
		articles: articles.data?.articles?.edges as ArticlesEdge[] | undefined,
    refreshArticles: (args) => articlesQuery({ ...args, requestPolicy: "network-only" }),
    cursor: articles.data?.articles?.pageInfo as PageInfo,
    setCursor: (val) => setCursor(val)
	}

  return loading ? <SkeletonApp /> :<AppContext.Provider value={value}>
		{ user ? children : <SignIn />}
	</AppContext.Provider>

}
