-- Phase A5.3.8 — Optional Step 7 audience fingerprint (profiles)

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS audience_fingerprint text;
