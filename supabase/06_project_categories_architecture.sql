alter table public.projects
  drop constraint if exists projects_category_check;

alter table public.projects
  add constraint projects_category_check check (
    category in (
      'arquitectura_proyecto',
      'arquitectura_ejecutado',
      'bim_proyecto',
      'bim_ejecutado',
      'gestion_proyecto',
      'gestion_ejecutado'
    )
  );