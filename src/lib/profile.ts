import { supabase } from './supabase';

/** Row shape for `public.profiles` (customer-clarity + auth join). */
export type VelourProfileRow = {
  id: string;
  email: string;
  customer_who: string | null;
  customer_before_state: string | null;
  customer_after_state: string | null;
  customer_surface_problem: string | null;
  customer_real_problem: string | null;
  customer_language_uses: string[] | null;
  customer_language_avoids: string[] | null;
  customer_awareness_stage: string | null;
  customer_summary: string | null;
  profile_completed_at: string | null;
  profile_last_step: number;
  created_at: string;
  updated_at: string;
};

/**
 * Loads the logged-in user's row from `profiles` (must match auth session user id).
 * Returns null when there is no session or no matching row yet.
 */
export async function fetchCurrentUserProfile(): Promise<VelourProfileRow | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) return null;

  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();

  if (error) throw error;
  return data as VelourProfileRow | null;
}

/** Persists `profile_last_step` for the signed-in user. */
export async function updateProfileStep(step: number): Promise<void> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) throw new Error('Not signed in');

  const { error } = await supabase.from('profiles').update({ profile_last_step: step }).eq('id', userId);

  if (error) throw error;
}
