import { supabase } from './supabase';

/** Body sent to Edge Function generate-identity-statement (exact keys expected by backend). */
export type IdentityStatementPayload = {
  creator_profession: string | null;
  creator_offer_description: string | null;
  audience_age_range: string | null;
  audience_gender: string | null;
  audience_marital_status: string | null;
  audience_children: string | null;
  audience_education: string | null;
  audience_career_field: string | null;
  audience_location: string | null;
  audience_goals: string[] | null;
  audience_fears: string[] | null;
  audience_internal_dialogue: string[] | null;
  audience_interests: string[] | null;
  audience_content_consumed: string[] | null;
  audience_decision_style: string | null;
  audience_wants: string[] | null;
  audience_doesnt_want: string[] | null;
  audience_fingerprint: string | null;
};

export type AudienceStateForIdentity = {
  creatorProfession?: string;
  creatorOfferDescription?: string;
  audienceAgeRange?: string;
  audienceGender?: string;
  audienceMaritalStatus?: string;
  audienceChildren?: string;
  audienceEducation?: string;
  audienceCareerField?: string;
  audienceLocation?: string;
  audienceGoals?: string[];
  audienceFears?: string[];
  audienceInternalDialogue?: string[];
  audienceInterests?: string[];
  audienceContentConsumed?: string[];
  audienceDecisionStyle?: string;
  audienceWants?: string[];
  audienceDoesntWant?: string[];
  audienceFingerprint?: string;
};

function nStr(value: string | undefined): string | null {
  if (value === undefined) return null;
  const t = value.trim();
  return t.length > 0 ? t : null;
}

function nArr(value: string[] | undefined): string[] | null {
  if (value === undefined) return null;
  return value.map((s) => s.trim()).filter((s) => s.length > 0);
}

export function buildIdentityStatementPayload(audience: AudienceStateForIdentity): IdentityStatementPayload {
  return {
    creator_profession: nStr(audience.creatorProfession),
    creator_offer_description: nStr(audience.creatorOfferDescription),
    audience_age_range: nStr(audience.audienceAgeRange),
    audience_gender: nStr(audience.audienceGender),
    audience_marital_status: nStr(audience.audienceMaritalStatus),
    audience_children: nStr(audience.audienceChildren),
    audience_education: nStr(audience.audienceEducation),
    audience_career_field: nStr(audience.audienceCareerField),
    audience_location: nStr(audience.audienceLocation),
    audience_goals: nArr(audience.audienceGoals),
    audience_fears: nArr(audience.audienceFears),
    audience_internal_dialogue: nArr(audience.audienceInternalDialogue),
    audience_interests: nArr(audience.audienceInterests),
    audience_content_consumed: nArr(audience.audienceContentConsumed),
    audience_decision_style: nStr(audience.audienceDecisionStyle),
    audience_wants: nArr(audience.audienceWants),
    audience_doesnt_want: nArr(audience.audienceDoesntWant),
    audience_fingerprint: nStr(audience.audienceFingerprint),
  };
}

/**
 * Calls the Supabase Edge Function `generate-identity-statement`.
 * Returns `{ short, long }` on success; throws a descriptive Error on failure.
 */
export async function generateIdentityStatement(
  payload: IdentityStatementPayload
): Promise<{ short: string; long: string }> {
  const { data, error } = await supabase.functions.invoke('generate-identity-statement', { body: payload });

  if (error) {
    throw new Error(error.message || 'Edge function request failed');
  }

  if (!data || typeof data !== 'object') {
    throw new Error('Invalid response from identity statement service');
  }

  const body = data as Record<string, unknown>;
  const errMsg = body.error;
  if (typeof errMsg === 'string' && errMsg.trim()) {
    throw new Error(errMsg.trim());
  }

  const short = body.short;
  const long = body.long;

  if (typeof short !== 'string' || typeof long !== 'string') {
    throw new Error('Response missing short or long statement');
  }

  return { short, long };
}
