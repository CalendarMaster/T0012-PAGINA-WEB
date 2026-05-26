alter table public.projects
  add column if not exists leader_image_url text;

notify pgrst, 'reload schema';