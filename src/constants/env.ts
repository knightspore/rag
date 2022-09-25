export const getAuthKeys = () => {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error("ENV Variables missing for Supabase")
	}

	return {supabaseUrl, supabaseAnonKey}
}
