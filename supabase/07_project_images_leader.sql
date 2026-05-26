alter table public.project_images
  add column if not exists is_leader boolean not null default false;

create unique index if not exists project_images_one_leader_per_project_idx
  on public.project_images(project_id)
  where is_leader = true;

with first_images as (
  select distinct on (project_id) id, project_id
  from public.project_images
  order by project_id, sort_order asc, created_at asc
)
update public.project_images pi
set is_leader = true
from first_images fi
where pi.id = fi.id
  and not exists (
    select 1
    from public.project_images existing
    where existing.project_id = fi.project_id
      and existing.is_leader = true
  );