import { useState } from 'react'

const PROJECTS = [
  { id: 1, category: 'bim_ejecutado',      title: 'Edificio Altavista',     catLabel: 'BIM - Ejecutado',        img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_1.png' },
  { id: 2, category: 'gestion_proyecto',   title: 'Centro Comercial Sur',   catLabel: 'Gestión - En Proyecto',  img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_2.png' },
  { id: 3, category: 'bim_proyecto',       title: 'Residencial Los Alpes',  catLabel: 'BIM - En Proyecto',      img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_3.png' },
  { id: 4, category: 'bim_ejecutado',      title: 'Hospital Regional',      catLabel: 'BIM - Ejecutado',        img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_4.png' },
  { id: 5, category: 'gestion_ejecutado',  title: 'Clínica Dentalica',      catLabel: 'Gestión - Ejecutado',    img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_5.png' },
  { id: 6, category: 'bim_ejecutado',      title: 'Hotel Marriot',          catLabel: 'BIM - Ejecutado',        img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_6.png' },
  { id: 7, category: 'bim_proyecto',       title: 'Casa Stachetti',         catLabel: 'BIM - En Proyecto',      img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_7.png' },
  { id: 8, category: 'gestion_proyecto',   title: 'Torre Financiera',       catLabel: 'Gestión - En Proyecto',  img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_8.png' },
  { id: 9, category: 'gestion_ejecutado',  title: 'Pabellón Deportivo',     catLabel: 'Gestión - Ejecutado',    img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_9.png' },
  { id: 10, category: 'bim_proyecto',      title: 'Terminal de Buses',      catLabel: 'BIM - En Proyecto',      img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_10.png' },
  { id: 11, category: 'gestion_proyecto',  title: 'Plaza Bicentenario',     catLabel: 'Gestión - En Proyecto',  img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_11.png' },
  { id: 12, category: 'bim_ejecutado',     title: 'Campus Universitario',   catLabel: 'BIM - Ejecutado',        img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_12.png' },
  { id: 13, category: 'gestion_ejecutado', title: 'Teatro de las Artes',    catLabel: 'Gestión - Ejecutado',    img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_13.png' },
  { id: 14, category: 'bim_proyecto',      title: 'Museo Contemporáneo',    catLabel: 'BIM - En Proyecto',      img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_14.png' },
  { id: 15, category: 'bim_ejecutado',     title: 'Estadio Nacional',       catLabel: 'BIM - Ejecutado',        img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_15.png' },
  { id: 16, category: 'gestion_proyecto',  title: 'Edificio Gubernamental', catLabel: 'Gestión - En Proyecto',  img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_16.png' },
  { id: 17, category: 'gestion_ejecutado', title: 'Aeropuerto del Sur',     catLabel: 'Gestión - Ejecutado',    img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_17.png' },
  { id: 18, category: 'bim_proyecto',      title: 'Línea de Metro',         catLabel: 'BIM - En Proyecto',      img: 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_18.png' },
]

const FILTERS = [
  { value: 'all',               label: 'Todos' },
  { value: 'bim_proyecto',      label: 'BIM - En Proyecto' },
  { value: 'bim_ejecutado',     label: 'BIM - Ejecutado' },
  { value: 'gestion_proyecto',  label: 'Gestión - En Proyecto' },
  { value: 'gestion_ejecutado', label: 'Gestión - Ejecutado' },
]

export default function Portfolio() {
  const [active, setActive] = useState('all')

  return (
    <section
      className="portfolio-section portafolio_mosaico"
      id="proyectos"
      aria-labelledby="projects-title"
    >
      <div className="portafolio_header">
        <p className="eyebrow">Portafolio destacado</p>
        <h2 className="portafolio_title" id="projects-title">
          Proyectos coordinados con precisión técnica
        </h2>
        <p>
          El catálogo mantiene la lógica visual del sitio original: mosaico de modelos, colores por
          categoría y tarjetas con reverso informativo.
        </p>
      </div>

      <div className="portafolio_filtros" aria-label="Filtros de proyectos">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`portafolio_filtro${active === f.value ? ' is_active' : ''}`}
            data-filter={f.value}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="portafolio_grid">
        {PROJECTS.map((p) => (
          <article
            key={p.id}
            className={`portafolio_card js_portafolio_card cat_${p.category}${active !== 'all' && active !== p.category ? ' is_hidden' : ''}`}
            data-category={p.category}
          >
            <div className="portafolio_card_inner">
              <div className="portafolio_card_front">
                <img
                  className="portafolio_img"
                  src={p.img}
                  alt={`Modelo BIM ${p.title}`}
                />
                <h3 className="portafolio_card_front_title">{p.title}</h3>
              </div>
              <div className="portafolio_card_back">
                <h3 className="portafolio_card_title">{p.title}</h3>
                <p className="portafolio_card_cat">{p.catLabel}</p>
                <a className="portafolio_card_btn" href="#">Ver más</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
