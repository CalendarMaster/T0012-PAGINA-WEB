create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  architect text,
  area_m2 text,
  year text,
  summary text,
  description text,
  cover_url text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_category_check check (
    category in ('bim_proyecto', 'bim_ejecutado', 'gestion_proyecto', 'gestion_ejecutado')
  )
);

create or replace function public.set_projects_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
before update on public.projects
for each row execute function public.set_projects_updated_at();

alter table public.projects enable row level security;

drop policy if exists projects_public_select on public.projects;
create policy projects_public_select
on public.projects
for select
using (is_published = true or auth.role() = 'authenticated');

drop policy if exists projects_admin_insert on public.projects;
create policy projects_admin_insert
on public.projects
for insert
to authenticated
with check (
  exists (
    select 1
    from public.admin_users au
    where lower(au.email) = lower(auth.email())
      and au.is_active = true
  )
);

drop policy if exists projects_admin_update on public.projects;
create policy projects_admin_update
on public.projects
for update
to authenticated
using (
  exists (
    select 1
    from public.admin_users au
    where lower(au.email) = lower(auth.email())
      and au.is_active = true
  )
)
with check (
  exists (
    select 1
    from public.admin_users au
    where lower(au.email) = lower(auth.email())
      and au.is_active = true
  )
);

drop policy if exists projects_admin_delete on public.projects;
create policy projects_admin_delete
on public.projects
for delete
to authenticated
using (
  exists (
    select 1
    from public.admin_users au
    where lower(au.email) = lower(auth.email())
      and au.is_active = true
  )
);