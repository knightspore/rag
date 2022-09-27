import React, { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { User } from "@supabase/supabase-js"
import SignIn from "../App/SignIn"

export type AppContextValue = { 
	user: User | null
	setUser: (value: null) => void
	subscriptions: string[] | [],
	setSubscriptions: (value: string[]) => void
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

	useEffect(() => {
		async function getCurrentUser() {
			const { data: { session}, error, } = await supabase.auth.getSession()
			if (error) {
				alert(error)
			}
			session && setUser(session.user)
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
	}

	return <AppContext.Provider value={appContextValue}>
		{ user ? children : <SignIn />}
	</AppContext.Provider>

}
