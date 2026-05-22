insert into public.projects (title, slug, category, cover_url, is_published, sort_order)
values
  ('Edificio Altavista', 'edificio-altavista', 'bim_ejecutado', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_1.png', true, 1),
  ('Centro Comercial Sur', 'centro-comercial-sur', 'gestion_proyecto', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_2.png', true, 2),
  ('Residencial Los Alpes', 'residencial-los-alpes', 'bim_proyecto', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_3.png', true, 3),
  ('Hospital Regional', 'hospital-regional', 'bim_ejecutado', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_4.png', true, 4),
  ('Clinica Dentalica', 'clinica-dentalica', 'gestion_ejecutado', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_5.png', true, 5),
  ('Hotel Marriot', 'hotel-marriot', 'bim_ejecutado', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_6.png', true, 6),
  ('Casa Stachetti', 'casa-stachetti', 'bim_proyecto', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_7.png', true, 7),
  ('Torre Financiera', 'torre-financiera', 'gestion_proyecto', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_8.png', true, 8),
  ('Pabellon Deportivo', 'pabellon-deportivo', 'gestion_ejecutado', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_9.png', true, 9),
  ('Terminal de Buses', 'terminal-de-buses', 'bim_proyecto', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_10.png', true, 10),
  ('Plaza Bicentenario', 'plaza-bicentenario', 'gestion_proyecto', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_11.png', true, 11),
  ('Campus Universitario', 'campus-universitario', 'bim_ejecutado', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_12.png', true, 12),
  ('Teatro de las Artes', 'teatro-de-las-artes', 'gestion_ejecutado', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_13.png', true, 13),
  ('Museo Contemporaneo', 'museo-contemporaneo', 'bim_proyecto', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_14.png', true, 14),
  ('Estadio Nacional', 'estadio-nacional', 'bim_ejecutado', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_15.png', true, 15),
  ('Edificio Gubernamental', 'edificio-gubernamental', 'gestion_proyecto', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_16.png', true, 16),
  ('Aeropuerto del Sur', 'aeropuerto-del-sur', 'gestion_ejecutado', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_17.png', true, 17),
  ('Linea de Metro', 'linea-de-metro', 'bim_proyecto', 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_18.png', true, 18)
on conflict (slug) do update
set
  title = excluded.title,
  category = excluded.category,
  cover_url = excluded.cover_url,
  is_published = excluded.is_published,
  sort_order = excluded.sort_order,
  updated_at = now();