import React, { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { User } from "@supabase/supabase-js"
import SignIn from "../App/SignIn"
import refreshSubscriptions from "../../util/refreshSubscriptions"

export type AppContextValue = { 
	user: User | null
	setUser: (value: null) => void
	subscriptions: string[] | [],
	setSubscriptions: (value: string[]) => void
	filters: ArticleFilters,
	setFilters: (value: ArticleFilters) => void
}

type ArticleFilters = {
	liked: boolean,
	unread: boolean,
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
	const [subscriptions, setSubscriptions] = useState<string[]|[]>([])
	const [filters, setFilters] = useState<ArticleFilters>({
		liked: false,
		unread: false,
	})

	useEffect(() => {
		async function getCurrentUser() {
			const { data: { session}, error, } = await supabase.auth.getSession()
			if (error) {
				alert(error)
			}
			session && setUser(session.user)
			user && refreshSubscriptions(user?.id)
		}
		if (!user) {
			getCurrentUser()
		}
	}, [user])

	const appContextValue: AppContextValue = {
		user,
		setUser,
		subscriptions,
		setSubscriptions,
		filters,
		setFilters,
	}

	return <AppContext.Provider value={appContextValue}>
		{ user ? children : <SignIn />}
	</AppContext.Provider>

}
