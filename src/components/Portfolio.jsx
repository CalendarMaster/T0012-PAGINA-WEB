import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { supabase } from '../lib/supabaseClient'
import { FALLBACK_PROJECTS } from '../lib/fallbackProjects'
import {
  getProjectCategoryLabel,
  getProjectDestinationFilters,
  getProjectFilters,
  normalizeProjectCategory,
  normalizeProjectDestination,
} from '../lib/projectCategories'
import LoadingLoop from './LoadingLoop'
import { useLanguage } from '../lib/i18n.jsx'

const FALLBACK_IMAGE = 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_1.png'

gsap.registerPlugin(Flip)

export default function Portfolio({ minimal = false, maxItems }) {
  const { lang, t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeDestination, setActiveDestination] = useState('all')
  const [hasInteractedWithFilters, setHasInteractedWithFilters] = useState(false)
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const gridRef = useRef(null)
  const flipStateRef = useRef(null)
  const categoryFilters = getProjectFilters(lang)
  const destinationFilters = getProjectDestinationFilters(lang)

  const captureFlipState = () => {
    if (!gridRef.current) return
    const currentItems = gridRef.current.querySelectorAll('.portafolio_card')
    if (currentItems.length === 0) return
    flipStateRef.current = Flip.getState(currentItems)
  }

  const triggerFilterAnimation = () => {
    captureFlipState()
    if (!hasInteractedWithFilters) setHasInteractedWithFilters(true)
  }

  const handleCategoryFilterChange = (value) => {
    if (value === activeCategory) return
    setActiveCategory(value)
    triggerFilterAnimation()
  }

  const handleDestinationFilterChange = (value) => {
    if (value === activeDestination) return
    setActiveDestination(value)
    triggerFilterAnimation()
  }

  useEffect(() => {
    let isMounted = true

    const loadProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (!isMounted) return

      if (error) {
        setProjects([])
        setIsLoading(false)
        return
      }

      const normalizedProjects = (data || [])
        .map((item) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          category: item.category,
          destination: item.destination || '',
          cover_url: item.cover_url,
          summary: item.summary,
          challenge: item.challenge || '',
          intervention: item.intervention || '',
          result: item.result || '',
          is_published: item.is_published,
          sort_order: Number.isFinite(item.sort_order) ? item.sort_order : null,
          created_at: item.created_at || null,
        }))
        .sort((a, b) => {
          const aOrder = a.sort_order ?? Number.POSITIVE_INFINITY
          const bOrder = b.sort_order ?? Number.POSITIVE_INFINITY
          if (aOrder !== bOrder) return aOrder - bOrder

          const aDate = a.created_at ? Date.parse(a.created_at) : 0
          const bDate = b.created_at ? Date.parse(b.created_at) : 0
          return bDate - aDate
        })

      setProjects(normalizedProjects)
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
    const normalizedDestination = normalizeProjectDestination(project.destination)

    if (project.is_published === false) return false
    if (activeCategory !== 'all' && normalizedCategory !== activeCategory) return false
    if (activeDestination !== 'all' && normalizedDestination !== activeDestination) return false

    return true
  })

  const displayedProjects = Number.isFinite(maxItems)
    ? filteredProjects.slice(0, Math.max(0, maxItems))
    : filteredProjects

  useLayoutEffect(() => {
    if (!hasInteractedWithFilters || isLoading || !gridRef.current) return

    const capturedState = flipStateRef.current
    const currentItems = gridRef.current.querySelectorAll('.portafolio_card')
    if (!capturedState || currentItems.length === 0) return

    const animation = Flip.from(capturedState, {
      duration: 0.7,
      scale: true,
      ease: 'power1.inOut',
      stagger: 0.08,
      absolute: true,
      onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.7 }),
      onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.45 }),
    })

    flipStateRef.current = null

    return () => {
      animation?.kill?.()
    }
  }, [activeCategory, activeDestination, hasInteractedWithFilters, isLoading])

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
        <div className="portafolio_filter_group">
          <p className="portafolio_filter_title">Filtro por servicio</p>
          <div className="portafolio_filter_buttons" aria-label="Filtrar por servicio">
            {categoryFilters.map((f) => (
              <button
                key={f.value}
                className={`portafolio_filtro${activeCategory === f.value ? ' is_active' : ''}`}
                data-filter={f.value}
                onClick={() => handleCategoryFilterChange(f.value)}
                type="button"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="portafolio_filter_group">
          <p className="portafolio_filter_title">Filtro por destino de recinto</p>
          <div className="portafolio_filter_select_wrap" aria-label="Filtrar por destino de recinto">
            <select
              className="portafolio_filter_select"
              value={activeDestination}
              onChange={(event) => handleDestinationFilterChange(event.target.value)}
            >
              {destinationFilters.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="portafolio_grid" ref={gridRef}>
        {isLoading ? (
          <div className="portafolio_notice portafolio_notice-loader">
            <LoadingLoop compact label={t('portfolio.loading')} />
          </div>
        ) : null}
        {!isLoading && displayedProjects.length === 0 ? (
          <p className="portafolio_notice">{t('portfolio.empty')}</p>
        ) : null}

        {!isLoading && displayedProjects.map((p) => (
          <article
            key={p.id || p.slug}
            className={`portafolio_card js_portafolio_card cat_${normalizeProjectCategory(p.category)}`}
            data-category={normalizeProjectCategory(p.category)}
            data-destination={normalizeProjectDestination(p.destination)}
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
                {p.challenge || p.intervention || p.result ? (
                  <div className="portafolio_card_story">
                    {p.challenge && (
                      <div className="portafolio_story_item">
                        <span className="portafolio_story_label">{t('portfolio.storyChallenge')}</span>
                        <p>{p.challenge}</p>
                      </div>
                    )}
                    {p.intervention && (
                      <div className="portafolio_story_item">
                        <span className="portafolio_story_label">{t('portfolio.storyIntervention')}</span>
                        <p>{p.intervention}</p>
                      </div>
                    )}
                    {p.result && (
                      <div className="portafolio_story_item">
                        <span className="portafolio_story_label">{t('portfolio.storyResult')}</span>
                        <p>{p.result}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="portafolio_card_summary">{p.summary || t('portfolio.fallbackSummary')}</p>
                )}
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
