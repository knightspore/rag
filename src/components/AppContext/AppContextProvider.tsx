import { User } from "@supabase/supabase-js"
import React, { createContext, useContext, useEffect, useState } from "react"
import type { OperationContext} from "urql"
import { useLikesQuery } from "../../lib/graphql-generated"
import { getCurrentUser } from "../../lib/supabase"
import SignIn from "./SignIn"
import SkeletonApp from "./SkeletonApp"

export type AppContextValue = { 
	user: User | null
	setUser: (value: null) => void
	likes: (string | null | undefined)[] | undefined,
  refreshLikes: (args?: Partial<OperationContext>) => void 
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


  const [likes, likesQuery] = useLikesQuery({
    variables: {
      id: user?.id
    }
  })

	const value: AppContextValue = {
		user,
		setUser,
    likes: likes.data?.likes?.edges.map(({ node }) => {
			return node?.article_title
		}),
    refreshLikes: (args) => likesQuery({ ...args, requestPolicy: "network-only" }),
	}

  return loading ? <SkeletonApp /> :<AppContext.Provider value={value}>
		{ user ? children : <SignIn />}
	</AppContext.Provider>

}
