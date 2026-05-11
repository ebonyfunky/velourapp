-- Phase A5.3.5 — Add audience_description column
alter table public.profiles
  add column if not exists audience_description text;
