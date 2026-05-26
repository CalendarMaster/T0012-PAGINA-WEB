import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { FALLBACK_PROJECTS } from '../lib/fallbackProjects'
import { getProjectCategoryLabel, getProjectFilters, normalizeProjectCategory } from '../lib/projectCategories'
import LoadingLoop from './LoadingLoop'
import { useLanguage } from '../lib/i18n.jsx'

const FALLBACK_IMAGE = 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_1.png'

export default function Portfolio({ minimal = false }) {
  const { lang, t } = useLanguage()
  const [active, setActive] = useState('all')
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const filters = getProjectFilters(lang)

  useEffect(() => {
    let isMounted = true

    const loadProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, slug, title, category, cover_url, summary, is_published')
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
    const normalizedCategory = normalizeProjectCategory(project.category)
    if (project.is_published === false) return false
    if (active === 'all') return true
    return normalizedCategory === active
  })

  return (
    <section
      className={`portfolio-section portafolio_mosaico${minimal ? ' is-minimal' : ''}`}
      id="proyectos"
      aria-labelledby="projects-title"
    >
      {!minimal ? (
        <div className="portafolio_header">
          <p className="eyebrow">{t('portfolio.eyebrow')}</p>
          <h2 className="portafolio_title" id="projects-title">
            {t('portfolio.title')}
          </h2>
          <p>{t('portfolio.copy')}</p>
        </div>
      ) : (
        <h2 className="sr-only" id="projects-title">{t('portfolio.catalogTitle')}</h2>
      )}

      <div className="portafolio_filtros" aria-label="Filtros de proyectos">
        {filters.map((f) => (
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
            <LoadingLoop compact label={t('portfolio.loading')} />
          </div>
        ) : null}
        {!isLoading && filteredProjects.length === 0 ? (
          <p className="portafolio_notice">{t('portfolio.empty')}</p>
        ) : null}

        {!isLoading && filteredProjects.map((p) => (
          <article
            key={p.id || p.slug}
            className={`portafolio_card js_portafolio_card cat_${normalizeProjectCategory(p.category)}`}
            data-category={normalizeProjectCategory(p.category)}
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
                <p className="portafolio_card_cat">{getProjectCategoryLabel(p.category, lang)}</p>
                <p className="portafolio_card_summary">{p.summary || t('portfolio.fallbackSummary')}</p>
                <Link className="portafolio_card_btn" to={`/proyectos/${p.slug}`}>
                  {t('portfolio.seeMore')}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
