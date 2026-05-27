import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { getProjectCategoryLabel, getProjectDestinationLabel, normalizeProjectCategory } from '../lib/projectCategories'
import LoadingLoop from '../components/LoadingLoop'
import { useLanguage } from '../lib/i18n.jsx'

const FALLBACK_IMAGE = 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_1.png'

export default function ProjectPage() {
  const { lang, t } = useLanguage()
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])
  const [relatedProjects, setRelatedProjects] = useState([])
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle()

      if (!isMounted) return

      if (error || !data) {
        setErrorMessage(t('pages.projectDetail.notFound'))
        setProject(null)
        setIsLoading(false)
        return
      }

      const { data: imageRows } = await supabase
        .from('project_images')
        .select('id, image_url, sort_order')
        .eq('project_id', data.id)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true })

      const { data: relatedRows } = await supabase
        .from('projects')
        .select('id, slug, title, category, cover_url, summary')
        .eq('is_published', true)
        .neq('id', data.id)
        .order('created_at', { ascending: false })
        .limit(48)

      const normalizedCategory = normalizeProjectCategory(data.category)
      const sameCategoryProjects = (relatedRows || []).filter(
        (item) => normalizeProjectCategory(item.category) === normalizedCategory,
      )

      const randomizedRelated = [...sameCategoryProjects]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)

      setGalleryImages(imageRows || [])
      setRelatedProjects(randomizedRelated)
      setProject(data)
      setIsLoading(false)
    }

    loadProject()

    return () => {
      isMounted = false
    }
  }, [slug, t])

  useEffect(() => {
    if (lightboxIndex === null) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null)
      }

      if (event.key === 'ArrowRight') {
        setLightboxIndex((previous) => {
          if (previous === null || galleryImages.length === 0) return null
          return (previous + 1) % galleryImages.length
        })
      }

      if (event.key === 'ArrowLeft') {
        setLightboxIndex((previous) => {
          if (previous === null || galleryImages.length === 0) return null
          return (previous - 1 + galleryImages.length) % galleryImages.length
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [galleryImages.length, lightboxIndex])

  if (isLoading) {
    return (
      <main className="project-page">
        <section className="project-shell">
          <p className="eyebrow">{t('pages.projectDetail.eyebrow')}</p>
          <h1>{t('pages.projectDetail.loadingTitle')}</h1>
          <div className="section-loader-wrap">
            <LoadingLoop label={t('pages.projectDetail.loadingLabel')} />
          </div>
        </section>
      </main>
    )
  }

  if (errorMessage || !project) {
    return (
      <main className="project-page">
        <section className="project-shell">
          <p className="eyebrow">{t('pages.projectDetail.eyebrow')}</p>
          <h1>{t('pages.projectDetail.unavailable')}</h1>
          <p className="project-copy">{errorMessage}</p>
          <Link className="button secondary" to="/#proyectos">
            {t('pages.projectDetail.backToPortfolio')}
          </Link>
        </section>
      </main>
    )
  }

  const hasGallery = galleryImages.length > 0
  const heroImageUrl = project.leader_image_url || project.cover_url || galleryImages[0]?.image_url || ''
  const normalizeFactValue = (value) => {
    if (value === null || value === undefined) return ''
    if (typeof value === 'string') return value.trim()
    return String(value).trim()
  }
  const specialistsList = Array.isArray(project.specialists)
    ? project.specialists.map((item) => item?.trim()).filter(Boolean)
    : []
  const factRows = [
    {
      key: 'destination',
      label: t('pages.projectDetail.destination'),
      value: project.destination ? getProjectDestinationLabel(project.destination, lang) : '',
    },
    { key: 'mandante', label: t('pages.projectDetail.mandante'), value: project.mandante },
    { key: 'architect', label: t('pages.projectDetail.architect'), value: project.architect },
    { key: 'structural', label: t('pages.projectDetail.structuralEngineer'), value: project.structural_engineer },
    { key: 'year', label: t('pages.projectDetail.year'), value: project.year },
    { key: 'area', label: t('pages.projectDetail.m2'), value: project.area_m2 ? `${project.area_m2} m²` : '' },
  ]
    .map((item) => ({ ...item, value: normalizeFactValue(item.value) }))
    .filter((item) => item.value)
  const activeLightboxImage = lightboxIndex !== null ? galleryImages[lightboxIndex] : null
  const relatedTitle = lang === 'en' ? 'Related projects' : 'Proyectos relacionados'
  const relatedCopy = lang === 'en'
    ? 'Keep exploring similar work.'
    : 'Sigue navegando proyectos de la misma categoria.'

  const openLightbox = (index) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const showPreviousLightboxImage = () => {
    setLightboxIndex((previous) => {
      if (previous === null || galleryImages.length === 0) return null
      return (previous - 1 + galleryImages.length) % galleryImages.length
    })
  }

  const showNextLightboxImage = () => {
    setLightboxIndex((previous) => {
      if (previous === null || galleryImages.length === 0) return null
      return (previous + 1) % galleryImages.length
    })
  }

  return (
    <main className="project-page" aria-labelledby="project-title">
      <section className="project-hero project-hero-leader">
        {heroImageUrl ? <img src={heroImageUrl} alt={project.title} /> : null}
        <div className="project-hero-overlay">
          <h1 id="project-title" className="project-hero-title">{project.title}</h1>
        </div>
      </section>

      <section className="project-shell">
        <div className="project-body">
          <article>
            <p className="project-copy">{project.description || project.summary || t('pages.projectDetail.emptyDescription')}</p>
          </article>

          <aside className="project-facts" aria-label={t('pages.projectDetail.dataLabel')}>
            {factRows.map((row) => (
              <div key={row.key} className="project-fact-row">
                <span className="project-fact-label">{row.label}</span>
                <strong className="project-fact-value">{row.value}</strong>
              </div>
            ))}

            {specialistsList.length > 0 ? (
              <details className="project-fact-row project-fact-expand" open>
                <summary className="project-fact-summary">
                  <span className="project-fact-label">{t('pages.projectDetail.specialists')}</span>
                  <span className="project-fact-value">
                    {`${specialistsList.length} ${t('pages.projectDetail.specialists').toLowerCase()}`}
                  </span>
                </summary>
                <div className="project-fact-panel" role="list">
                  {specialistsList.map((specialist) => (
                    <p key={specialist} role="listitem">{specialist}</p>
                  ))}
                </div>
              </details>
            ) : null}
          </aside>
        </div>

        {hasGallery ? (
          <section className="project-mosaic" aria-label={t('pages.projectDetail.galleryLabel')}>
            {galleryImages.map((image, index) => (
              <figure key={image.id} className="project-mosaic-item">
                <button
                  type="button"
                  className="project-mosaic-trigger"
                  onClick={() => openLightbox(index)}
                  aria-label={t('pages.projectDetail.imageAlt').replace('{index}', index + 1).replace('{title}', project.title)}
                >
                  <img
                    src={image.image_url}
                    alt={t('pages.projectDetail.imageAlt').replace('{index}', index + 1).replace('{title}', project.title)}
                    loading="lazy"
                  />
                </button>
              </figure>
            ))}
          </section>
        ) : null}

        {activeLightboxImage ? (
          <section className="project-lightbox" role="dialog" aria-modal="true" aria-label={t('pages.projectDetail.galleryLabel')} onClick={closeLightbox}>
            <button type="button" className="project-lightbox-close" onClick={closeLightbox} aria-label="Close image viewer">
              ×
            </button>

            {galleryImages.length > 1 ? (
              <button
                type="button"
                className="project-lightbox-nav is-prev"
                onClick={(event) => {
                  event.stopPropagation()
                  showPreviousLightboxImage()
                }}
                aria-label={t('pages.projectDetail.prev')}
              >
                ‹
              </button>
            ) : null}

            <figure
              className="project-lightbox-stage"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={activeLightboxImage.image_url}
                alt={t('pages.projectDetail.imageAlt').replace('{index}', lightboxIndex + 1).replace('{title}', project.title)}
              />
            </figure>

            {galleryImages.length > 1 ? (
              <button
                type="button"
                className="project-lightbox-nav is-next"
                onClick={(event) => {
                  event.stopPropagation()
                  showNextLightboxImage()
                }}
                aria-label={t('pages.projectDetail.next')}
              >
                ›
              </button>
            ) : null}
          </section>
        ) : null}

        <div className="project-actions">
          <Link className="button secondary" to="/#proyectos">
            {t('pages.projectDetail.backToPortfolio')}
          </Link>
        </div>

        {relatedProjects.length > 0 ? (
          <section className="project-related" aria-label={relatedTitle}>
            <header className="project-related-head">
              <h2>{relatedTitle}</h2>
              <p>{relatedCopy}</p>
            </header>
            <div className="project-related-grid">
              {relatedProjects.map((item) => (
                <article key={item.id || item.slug} className="project-related-card">
                  <img src={item.cover_url || FALLBACK_IMAGE} alt={item.title} loading="lazy" />
                  <div className="project-related-meta">
                    <p>{getProjectCategoryLabel(item.category, lang)}</p>
                    <h3>{item.title}</h3>
                    <Link className="project-related-link" to={`/proyectos/${item.slug}`}>
                      {t('portfolio.seeMore')}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  )
}