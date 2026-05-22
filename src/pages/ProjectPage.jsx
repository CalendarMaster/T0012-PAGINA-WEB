import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { getProjectCategoryLabel } from '../lib/projectCategories'
import LoadingLoop from '../components/LoadingLoop'
import { useLanguage } from '../lib/i18n.jsx'

export default function ProjectPage() {
  const { lang, t } = useLanguage()
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, slug, category, summary, description, cover_url, architect, structural_engineer, specialists, area_m2, year')
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

      setGalleryImages(imageRows || [])
      setActiveSlide(0)
      setProject(data)
      setIsLoading(false)
    }

    loadProject()

    return () => {
      isMounted = false
    }
  }, [slug, t])

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

  const goToPreviousSlide = () => {
    setActiveSlide((previous) => {
      if (previous === 0) return galleryImages.length - 1
      return previous - 1
    })
  }

  const goToNextSlide = () => {
    setActiveSlide((previous) => (previous + 1) % galleryImages.length)
  }

  return (
    <main className="project-page" aria-labelledby="project-title">
      <section className="project-shell">
        <div className="project-hero">
          {project.cover_url ? <img src={project.cover_url} alt={project.title} /> : null}
          <div className="project-hero-overlay">
            <p className="eyebrow">{getProjectCategoryLabel(project.category, lang)}</p>
            <h1 id="project-title">{project.title}</h1>
          </div>
        </div>

        <div className="project-body">
          <article>
            <h2>{t('pages.projectDetail.description')}</h2>
            <p className="project-copy">{project.description || project.summary || t('pages.projectDetail.emptyDescription')}</p>
          </article>

          <aside className="project-meta" aria-label={t('pages.projectDetail.dataLabel')}>
            <div>
              <span>{t('pages.projectDetail.architect')}</span>
              <strong>{project.architect || t('pages.projectDetail.undefined')}</strong>
            </div>
            <div>
              <span>{t('pages.projectDetail.structuralEngineer')}</span>
              <strong>{project.structural_engineer || t('pages.projectDetail.undefined')}</strong>
            </div>
            <div>
              <span>{t('pages.projectDetail.specialists')}</span>
              <strong>
                {Array.isArray(project.specialists) && project.specialists.length > 0
                  ? project.specialists.join(', ')
                  : t('pages.projectDetail.undefined')}
              </strong>
            </div>
            <div>
              <span>{t('pages.projectDetail.m2')}</span>
              <strong>{project.area_m2 || t('pages.projectDetail.undefined')}</strong>
            </div>
            <div>
              <span>{t('pages.projectDetail.year')}</span>
              <strong>{project.year || t('pages.projectDetail.undefined')}</strong>
            </div>
          </aside>
        </div>

        {hasGallery ? (
          <section className="project-slider" aria-label={t('pages.projectDetail.galleryLabel')}>
            <div className="project-slider-stage">
              <img src={galleryImages[activeSlide].image_url} alt={t('pages.projectDetail.imageAlt').replace('{index}', activeSlide + 1).replace('{title}', project.title)} />
              {galleryImages.length > 1 ? (
                <>
                  <button type="button" className="project-slider-arrow is-prev" onClick={goToPreviousSlide}>
                    {t('pages.projectDetail.prev')}
                  </button>
                  <button type="button" className="project-slider-arrow is-next" onClick={goToNextSlide}>
                    {t('pages.projectDetail.next')}
                  </button>
                </>
              ) : null}
            </div>

            {galleryImages.length > 1 ? (
              <div className="project-slider-thumbs">
                {galleryImages.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    className={`project-thumb${index === activeSlide ? ' is-active' : ''}`}
                    onClick={() => setActiveSlide(index)}
                  >
                    <img src={image.image_url} alt={t('pages.projectDetail.thumbAlt').replace('{index}', index + 1)} />
                  </button>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        <div className="project-actions">
          <Link className="button secondary" to="/#proyectos">
            {t('pages.projectDetail.backToPortfolio')}
          </Link>
        </div>
      </section>
    </main>
  )
}