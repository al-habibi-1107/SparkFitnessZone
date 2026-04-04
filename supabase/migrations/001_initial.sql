-- ── Spark Fitness Zone — Initial Schema ──────────────────────────────────────
-- Run this in Supabase SQL Editor (or via supabase db push) to set up prod DB.

-- ── Members table ─────────────────────────────────────────────────────────────

create table if not exists public.members (
  id                  uuid primary key default gen_random_uuid(),
  name                text        not null check (char_length(name) between 2 and 100),
  email               text        not null unique check (email ~* '^[^@]+@[^@]+\.[^@]+$'),
  phone               text        check (phone ~ '^[6-9][0-9]{9}$'),
  subscription_id     text,
  subscription_status text        check (
    subscription_status is null or
    subscription_status in ('created','authenticated','active','pending','halted','cancelled','completed','expired')
  ),
  created_at          timestamptz not null default now()
);

-- ── Indexes ───────────────────────────────────────────────────────────────────

-- Webhook looks up members by subscription_id on cancel/expire events
create index if not exists members_subscription_id_idx
  on public.members (subscription_id)
  where subscription_id is not null;

-- ── Row Level Security ────────────────────────────────────────────────────────
-- The service role key (used in the webhook API route) bypasses RLS.
-- The anon key (never used server-side here) cannot read any rows.

alter table public.members enable row level security;

-- No public read/write — all access goes through the service role key in API routes.
-- Add policies here when you build an authenticated member portal.

-- ── Audit timestamps (optional but recommended) ───────────────────────────────

alter table public.members
  add column if not exists updated_at timestamptz default now();

create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_members_updated_at on public.members;
create trigger set_members_updated_at
  before update on public.members
  for each row execute function public.handle_updated_at();
