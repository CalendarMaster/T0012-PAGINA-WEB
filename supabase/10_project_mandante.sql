alter table public.projects
  add column if not exists mandante text;

comment on column public.projects.mandante is 'Mandante o cliente principal del proyecto';

notify pgrst, 'reload schema';
