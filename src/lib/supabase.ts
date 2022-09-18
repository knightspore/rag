import { createClient } from "@supabase/supabase-js"
import { getAuthKeys } from "../constants/env"

const {supabaseUrl, supabaseAnonKey} = getAuthKeys()

export const supabase = createClient(
	supabaseUrl,
	supabaseAnonKey,
)