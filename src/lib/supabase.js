import { createClient } from '@supabase/supabase-js';

// Resolve Supabase project URL and public anon key from Vite env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://guvhwswopudwriwonudn.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_yg9_DBFxvCnOFrbt3oU3WA_4KgyjoF3';

// Check if credentials appear configured
export const isSupabaseConfigured = () => {
  return Boolean(
    (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) ||
    supabaseUrl
  );
};

// Initialize client with resilient retry settings
let supabaseInstance = null;
try {
  if (supabaseUrl && supabaseAnonKey) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
} catch (err) {
  console.warn('[The Hub] Supabase client initialization warning:', err.message);
}

export const supabase = supabaseInstance;

/**
 * Health check helper to test active connectivity with Supabase cloud
 */
export async function testSupabaseConnection() {
  if (!supabase) {
    return {
      connected: false,
      status: 'unconfigured',
      message: 'Supabase client not initialized. Using local memory store.',
    };
  }

  const startTime = Date.now();
  try {
    // Attempt a lightweight probe against courses or indicators table
    const { data, error } = await supabase.from('courses').select('id').limit(1);
    const latency = Date.now() - startTime;

    if (error) {
      // If table doesn't exist yet, connection is still valid (PGRST116 / 42P01)
      const tableMissing = error.code === '42P01' || error.message?.includes('relation "courses" does not exist');
      return {
        connected: !tableMissing,
        schemaReady: !tableMissing,
        latencyMs: latency,
        status: tableMissing ? 'schema_pending' : 'error',
        message: tableMissing
          ? 'Connected to Supabase project, but tables are pending execution of supabase-schema.sql'
          : error.message,
      };
    }

    return {
      connected: true,
      schemaReady: true,
      latencyMs: latency,
      status: 'connected',
      message: `Active Supabase connection (${latency}ms latency).`,
    };
  } catch (err) {
    return {
      connected: false,
      status: 'offline',
      latencyMs: Date.now() - startTime,
      message: err.message || 'Network error reaching Supabase cloud',
    };
  }
}
