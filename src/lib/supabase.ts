import { createClient, User } from "@supabase/supabase-js"
import { getAuthKeys } from "../constants/env"

const {supabaseUrl, supabaseAnonKey} = getAuthKeys()

export const supabase = createClient(
	supabaseUrl,
	supabaseAnonKey,
)

export async function getCurrentUser(): Promise<User|null> {
	const { data: { session }, error, } = await supabase.auth.getSession()
	if (error) {
		throw new Error(error.message)
	}
	return session?.user || null
}