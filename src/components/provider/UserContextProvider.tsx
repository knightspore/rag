import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import SignIn from "../SignIn";

type Props = {
	children: React.ReactNode
}

type UserContextValue = User | null

export const UserContext = createContext<UserContextValue>(null)

export function useUserContext() {
	const value = useContext(UserContext)
	if (value == null) {
		throw new Error("No UserContext value")
	} else {
		return value
	}
}

export default function UserContextProvider({ children }: Props) {

	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

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

	if (loading) {
		return <div className="m-auto">Loading...</div>
	} 

	return (
		<UserContext.Provider value={user}>
			{user ? children : <SignIn/>}
		</UserContext.Provider>
	)
}
