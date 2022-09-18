import { createClient, SupabaseClient } from "@supabase/supabase-js";
import React, { createContext, useContext } from "react";

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

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("ENV Variables missing for Supabase")
}

const supabase = createClient(
	supabaseUrl,
	supabaseAnonKey,
)

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
	return (
		<AuthContext.Provider value={supabase}>
			{children}
		</AuthContext.Provider>
	)
}