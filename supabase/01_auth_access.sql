-- Dashboard access control table for internal users.
create table if not exists public.admin_users (
  email text primary key,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- Internal users can only read their own access row.
drop policy if exists "admin_users_select_own" on public.admin_users;
create policy "admin_users_select_own"
on public.admin_users
for select
to authenticated
using (lower(email) = lower(auth.email()));

-- Optional seed examples. Replace with real office emails.
insert into public.admin_users (email, is_active)
values
  ('jochoa@mi-studio.cl', true),
  ('jsimpson@mi-studio.cl', true)
on conflict (email) do update
set is_active = excluded.is_active;
