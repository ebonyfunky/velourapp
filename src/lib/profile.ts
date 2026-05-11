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

/** Step 1 Audience Avatar: creator profession + offer copy. Returns the updated profile row. */
export async function saveStep1Profession(
  profession: string,
  offerDescription: string
): Promise<VelourProfileRow> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) throw new Error('Not signed in');

  const { data, error } = await supabase
    .from('profiles')
    .update({
      creator_profession: profession,
      creator_offer_description: offerDescription,
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as VelourProfileRow;
}

/** Step 2 Audience Avatar: demographics. Returns the updated profile row. */
export async function saveStep2Demographics(values: {
  ageRange: string;
  gender: string;
  maritalStatus: string;
  children: string;
  education: string;
  careerField: string;
  location: string;
}): Promise<VelourProfileRow> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) throw new Error('Not signed in');

  const { data, error } = await supabase
    .from('profiles')
    .update({
      audience_age_range: values.ageRange,
      audience_gender: values.gender,
      audience_marital_status: values.maritalStatus,
      audience_children: values.children,
      audience_education: values.education,
      audience_career_field: values.careerField,
      audience_location: values.location,
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as VelourProfileRow;
}

/** Step 3 Audience Avatar: goals, fears, internal dialogue. Returns the updated profile row. */
export async function saveStep3GoalsFears(values: {
  goals: string[];
  fears: string[];
  internalDialogue: string[];
}): Promise<VelourProfileRow> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) throw new Error('Not signed in');

  const { data, error } = await supabase
    .from('profiles')
    .update({
      audience_goals: values.goals,
      audience_fears: values.fears,
      audience_internal_dialogue: values.internalDialogue,
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as VelourProfileRow;
}

/** Step 4 Audience Avatar: interests, content consumed, decision style. Returns the updated profile row. */
export async function saveStep4Interests(values: {
  interests: string[];
  contentConsumed: string[];
  decisionStyle: string;
}): Promise<VelourProfileRow> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) throw new Error('Not signed in');

  const { data, error } = await supabase
    .from('profiles')
    .update({
      audience_interests: values.interests,
      audience_content_consumed: values.contentConsumed,
      audience_decision_style: values.decisionStyle,
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as VelourProfileRow;
}
