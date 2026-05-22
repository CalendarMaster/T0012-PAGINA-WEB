import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { FALLBACK_PROJECTS } from '../lib/fallbackProjects'
import { getProjectCategoryLabel, PROJECT_FILTERS } from '../lib/projectCategories'
import LoadingLoop from './LoadingLoop'

const FALLBACK_IMAGE = 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_1.png'

export default function Portfolio() {
  const [active, setActive] = useState('all')
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, slug, title, category, cover_url, summary')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (!isMounted) return

      if (error) {
        setProjects([])
        setIsLoading(false)
        return
      }

      setProjects(data || [])
      setIsLoading(false)
    }

    loadProjects()

    return () => {
      isMounted = false
    }
  }, [])

  const mergedProjects = [...FALLBACK_PROJECTS]
  for (const dbProject of projects) {
    const existingIndex = mergedProjects.findIndex((fallbackProject) => fallbackProject.slug === dbProject.slug)
    if (existingIndex >= 0) {
      mergedProjects[existingIndex] = { ...mergedProjects[existingIndex], ...dbProject }
      continue
    }
    mergedProjects.push(dbProject)
  }

  const filteredProjects = mergedProjects.filter((project) => {
    if (!project.is_published) return false
    if (active === 'all') return true
    return project.category === active
  })

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
        {PROJECT_FILTERS.map((f) => (
          <button
            key={f.value}
            className={`portafolio_filtro${active === f.value ? ' is_active' : ''}`}
            data-filter={f.value}
            onClick={() => setActive(f.value)}
            type="button"
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="portafolio_grid">
        {isLoading ? (
          <div className="portafolio_notice portafolio_notice-loader">
            <LoadingLoop compact label="Cargando proyectos" />
          </div>
        ) : null}
        {!isLoading && filteredProjects.length === 0 ? (
          <p className="portafolio_notice">Todavia no hay proyectos publicados en esta categoria.</p>
        ) : null}

        {!isLoading && filteredProjects.map((p) => (
          <article
            key={p.id || p.slug}
            className={`portafolio_card js_portafolio_card cat_${p.category}`}
            data-category={p.category}
          >
            <div className="portafolio_card_inner">
              <div className="portafolio_card_front">
                <img
                  className="portafolio_img"
                  src={p.cover_url || FALLBACK_IMAGE}
                  alt={`Modelo BIM ${p.title}`}
                />
                <h3 className="portafolio_card_front_title">{p.title}</h3>
              </div>
              <div className="portafolio_card_back">
                <h3 className="portafolio_card_title">{p.title}</h3>
                <p className="portafolio_card_cat">{getProjectCategoryLabel(p.category)}</p>
                <p className="portafolio_card_summary">{p.summary || 'Proyecto gestionado por MI-STUDIO.'}</p>
                <Link className="portafolio_card_btn" to={`/proyectos/${p.slug}`}>
                  Ver mas
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
