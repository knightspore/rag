import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import SignIn from "../SignIn";

const AuthContext = createContext<SupabaseClient | null>(null)

export function useAuthContext() {
	const value = useContext(AuthContext)
	if (!value) {
		throw new Error("Auth Context not found")
	}
	return value
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY



export default function AuthContextProvider({ children }: { children: React.ReactNode }) {

	const [user, setUser] = useState<User|null>(null)

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("ENV Variables missing for Supabase")
}

const supabase = createClient(
	supabaseUrl,
	supabaseAnonKey,
)

	useEffect(() => {
		setUser(supabase.auth.user())
	}, [supabase.auth])

	return (
		<AuthContext.Provider value={supabase}>
			{ user ? children : <SignIn />}
		</AuthContext.Provider>
	)
}