-- Phase A5.1 — Identity statement schema split
alter table public.profiles
  rename column audience_identity_statement to audience_identity_statement_long;

alter table public.profiles
  add column if not exists audience_identity_statement_short text;
