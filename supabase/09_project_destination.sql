alter table public.projects
  add column if not exists destination text;

alter table public.projects
  drop constraint if exists projects_destination_check;

alter table public.projects
  add constraint projects_destination_check check (
    destination is null
    or destination in (
      'almacenamiento',
      'comercio',
      'educacional',
      'espacio_publico',
      'habitacional',
      'industrial',
      'infraestructura',
      'retail',
      'salud'
    )
  );

update public.projects
set destination = null
where destination is not null
  and destination not in (
    'almacenamiento',
    'comercio',
    'educacional',
    'espacio_publico',
    'habitacional',
    'industrial',
    'infraestructura',
    'retail',
    'salud'
  );

notify pgrst, 'reload schema';
