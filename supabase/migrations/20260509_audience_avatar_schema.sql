-- =========================================================
-- Phase A3.5: Audience Avatar schema migration
-- Drops the old Tony-framework customer_* columns
-- Adds new creator_* and audience_* columns for the
-- 2026 Perfect Audience Avatar framework
-- Applied via Supabase Studio SQL Editor on 2026-05-09
-- =========================================================

-- Drop old customer-clarity columns (added in A1-lite)
ALTER TABLE profiles DROP COLUMN IF EXISTS customer_who;
ALTER TABLE profiles DROP COLUMN IF EXISTS customer_before_state;
ALTER TABLE profiles DROP COLUMN IF EXISTS customer_after_state;
ALTER TABLE profiles DROP COLUMN IF EXISTS customer_surface_problem;
ALTER TABLE profiles DROP COLUMN IF EXISTS customer_real_problem;
ALTER TABLE profiles DROP COLUMN IF EXISTS customer_language_uses;
ALTER TABLE profiles DROP COLUMN IF EXISTS customer_language_avoids;
ALTER TABLE profiles DROP COLUMN IF EXISTS customer_awareness_stage;
ALTER TABLE profiles DROP COLUMN IF EXISTS customer_summary;

-- Step 1: Creator's profession / offer
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS creator_profession text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS creator_offer_description text;

-- Step 2: Audience demographics
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_age_range text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_gender text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_marital_status text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_children text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_education text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_career_field text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_income_range text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_location text;

-- Step 3: Goals & fears (text arrays for multi-select / chips)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_goals text[] DEFAULT ARRAY[]::text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_fears text[] DEFAULT ARRAY[]::text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_internal_dialogue text[] DEFAULT ARRAY[]::text[];

-- Step 4: Interests & content behavior
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_interests text[] DEFAULT ARRAY[]::text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_content_consumed text[] DEFAULT ARRAY[]::text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_decision_style text;

-- Step 5: Wants vs. doesn't want
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_wants text[] DEFAULT ARRAY[]::text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_doesnt_want text[] DEFAULT ARRAY[]::text[];

-- Final AI-generated synthesis
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS audience_identity_statement text;
