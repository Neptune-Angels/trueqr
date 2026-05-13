import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Browser/client-side Supabase client singleton.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Factory function — returns a fresh client each call.
 * Use this in client components for auth operations.
 */
export function createBrowserClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}
