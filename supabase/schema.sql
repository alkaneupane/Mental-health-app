-- SafeCircle feed + Supabase Auth — run in Supabase Dashboard → SQL Editor.
-- Safe to run more than once (idempotent policies / IF NOT EXISTS).
--
-- Dashboard: Authentication → Providers → Email (Confirm email OFF for User ID flow),
--   Anonymous ON if you use “Continue anonymously”.
-- Env: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (.env.example)

-- gen_random_uuid() (used below) needs pgcrypto on many Postgres versions.
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  tag text not null,
  body text not null,
  relates_count integer not null default 0,
  user_id uuid references auth.users (id) on delete set null
);

create table if not exists public.replies (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  post_id uuid not null references public.posts (id) on delete cascade,
  body text not null,
  display_name text,
  user_id uuid references auth.users (id) on delete set null
);

create index if not exists replies_post_id_idx on public.replies (post_id);
create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists posts_user_id_idx on public.posts (user_id);

alter table public.posts enable row level security;
alter table public.replies enable row level security;

-- Replace policies so re-running this script does not error.
drop policy if exists "posts_select" on public.posts;
drop policy if exists "replies_select" on public.replies;
drop policy if exists "posts_insert_own" on public.posts;
drop policy if exists "replies_insert_own" on public.replies;
drop policy if exists "posts_insert" on public.posts;
drop policy if exists "replies_insert" on public.replies;

-- Public read; app does not expose email — only internal user_id on rows.
create policy "posts_select" on public.posts for select using (true);
create policy "replies_select" on public.replies for select using (true);

-- Writes require a signed-in user (JWT) and matching user_id.
create policy "posts_insert_own" on public.posts for insert
  with check (auth.uid() is not null and auth.uid() = user_id);

create policy "replies_insert_own" on public.replies for insert
  with check (auth.uid() is not null and auth.uid() = user_id);

-- Relate button: bump count without granting public UPDATE on posts.
create or replace function public.increment_post_relates (target_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.posts
  set relates_count = relates_count + 1
  where id = target_id;
end;
$$;

revoke all on function public.increment_post_relates (uuid) from public;
revoke all on function public.increment_post_relates (uuid) from anon;
grant execute on function public.increment_post_relates (uuid) to authenticated;
