import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the SERVICE ROLE key.
 *
 * This bypasses Row Level Security and must NEVER be imported into client
 * components or exposed to the browser. The service role key is read from a
 * server-only env var (no NEXT_PUBLIC_ prefix). All access to the sensitive
 * client_waivers table + private 'waivers' storage bucket goes through here.
 */

let client: SupabaseClient | null = null;

export const WAIVER_BUCKET = process.env.SUPABASE_WAIVER_BUCKET || "waivers";

export function getSupabaseAdmin(): SupabaseClient {
  if (!client) {
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceRoleKey) {
      throw new Error(
        "Supabase is not configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY",
      );
    }

    client = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
