alter table public.projects
  add column if not exists structural_engineer text,
  add column if not exists specialists text[] not null default '{}';

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists project_images_project_id_idx on public.project_images(project_id);

alter table public.project_images enable row level security;

drop policy if exists project_images_public_select on public.project_images;
create policy project_images_public_select
on public.project_images
for select
using (
  exists (
    select 1
    from public.projects p
    where p.id = project_images.project_id
      and (p.is_published = true or auth.role() = 'authenticated')
  )
);

drop policy if exists project_images_admin_insert on public.project_images;
create policy project_images_admin_insert
on public.project_images
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

drop policy if exists project_images_admin_update on public.project_images;
create policy project_images_admin_update
on public.project_images
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

drop policy if exists project_images_admin_delete on public.project_images;
create policy project_images_admin_delete
on public.project_images
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

insert into storage.buckets (id, name, public)
values ('project-gallery', 'project-gallery', true)
on conflict (id) do nothing;

drop policy if exists project_gallery_public_read on storage.objects;
create policy project_gallery_public_read
on storage.objects
for select
using (bucket_id = 'project-gallery');

drop policy if exists project_gallery_admin_insert on storage.objects;
create policy project_gallery_admin_insert
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'project-gallery'
  and exists (
    select 1
    from public.admin_users au
    where lower(au.email) = lower(auth.email())
      and au.is_active = true
  )
);

drop policy if exists project_gallery_admin_update on storage.objects;
create policy project_gallery_admin_update
on storage.objects
for update
to authenticated
using (
  bucket_id = 'project-gallery'
  and exists (
    select 1
    from public.admin_users au
    where lower(au.email) = lower(auth.email())
      and au.is_active = true
  )
)
with check (
  bucket_id = 'project-gallery'
  and exists (
    select 1
    from public.admin_users au
    where lower(au.email) = lower(auth.email())
      and au.is_active = true
  )
);

drop policy if exists project_gallery_admin_delete on storage.objects;
create policy project_gallery_admin_delete
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'project-gallery'
  and exists (
    select 1
    from public.admin_users au
    where lower(au.email) = lower(auth.email())
      and au.is_active = true
  )
);