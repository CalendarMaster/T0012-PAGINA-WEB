insert into storage.buckets (id, name, public)
values ('project-covers', 'project-covers', true)
on conflict (id) do nothing;

drop policy if exists project_covers_public_read on storage.objects;
create policy project_covers_public_read
on storage.objects
for select
using (bucket_id = 'project-covers');

drop policy if exists project_covers_admin_insert on storage.objects;
create policy project_covers_admin_insert
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'project-covers'
  and exists (
    select 1
    from public.admin_users au
    where lower(au.email) = lower(auth.email())
      and au.is_active = true
  )
);

drop policy if exists project_covers_admin_update on storage.objects;
create policy project_covers_admin_update
on storage.objects
for update
to authenticated
using (
  bucket_id = 'project-covers'
  and exists (
    select 1
    from public.admin_users au
    where lower(au.email) = lower(auth.email())
      and au.is_active = true
  )
)
with check (
  bucket_id = 'project-covers'
  and exists (
    select 1
    from public.admin_users au
    where lower(au.email) = lower(auth.email())
      and au.is_active = true
  )
);

drop policy if exists project_covers_admin_delete on storage.objects;
create policy project_covers_admin_delete
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'project-covers'
  and exists (
    select 1
    from public.admin_users au
    where lower(au.email) = lower(auth.email())
      and au.is_active = true
  )
);