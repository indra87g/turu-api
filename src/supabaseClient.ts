import { createClient } from '@supabase/supabase-js'
import { Context } from 'hono'

// Define a type for the environment variables
// This ensures that c.env has the correct types
export type Env = {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
}

export const getSupabase = (c: Context<{ Bindings: Env }>) => {
    const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_ANON_KEY)
    return supabase
}
