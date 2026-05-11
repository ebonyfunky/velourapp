import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase environment variables missing. Check .env.local has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Type definitions matching the database schema
export type Profile = {
  id: string;
  email: string;
  profession: string | null;
  profession_other: string | null;
  audience_pain: string | null;
  audience_pain_other: string | null;
  audience_want: string | null;
  audience_want_other: string | null;
  voice: string | null;
  setup_complete: boolean;
  created_at: string;
  updated_at: string;
};

export type Generation = {
  id: string;
  user_id: string;
  content_type: string;
  platform: string | null;
  content: Record<string, unknown>;
  hook_pattern: string | null;
  cta_mechanism: string | null;
  emotional_angle: string | null;
  created_at: string;
};
