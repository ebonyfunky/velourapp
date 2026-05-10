import { supabase } from './supabase';

/** Row shape for `public.profiles` (2026 Audience Avatar framework). */
export type VelourProfileRow = {
  id: string;
  email: string;
  creator_profession: string | null;
  creator_offer_description: string | null;
  audience_age_range: string | null;
  audience_gender: string | null;
  audience_marital_status: string | null;
  audience_children: string | null;
  audience_education: string | null;
  audience_career_field: string | null;
  audience_income_range: string | null;
  audience_location: string | null;
  audience_goals: string[] | null;
  audience_fears: string[] | null;
  audience_internal_dialogue: string[] | null;
  audience_interests: string[] | null;
  audience_content_consumed: string[] | null;
  audience_decision_style: string | null;
  audience_wants: string[] | null;
  audience_doesnt_want: string[] | null;
  audience_identity_statement: string | null;
  profile_completed_at: string | null;
  profile_last_step: number | null;
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
