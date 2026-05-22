import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { getProjectCategoryLabel } from '../lib/projectCategories'
import LoadingLoop from '../components/LoadingLoop'

export default function ProjectPage() {
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
        setErrorMessage('No encontramos este proyecto o aun no esta publicado.')
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
  }, [slug])

  if (isLoading) {
    return (
      <main className="project-page">
        <section className="project-shell">
          <p className="eyebrow">Proyecto</p>
          <h1>Cargando proyecto</h1>
          <div className="section-loader-wrap">
            <LoadingLoop label="Cargando proyecto" />
          </div>
        </section>
      </main>
    )
  }

  if (errorMessage || !project) {
    return (
      <main className="project-page">
        <section className="project-shell">
          <p className="eyebrow">Proyecto</p>
          <h1>No disponible</h1>
          <p className="project-copy">{errorMessage}</p>
          <Link className="button secondary" to="/#proyectos">
            Volver al portafolio
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
            <p className="eyebrow">{getProjectCategoryLabel(project.category)}</p>
            <h1 id="project-title">{project.title}</h1>
          </div>
        </div>

        <div className="project-body">
          <article>
            <h2>Descripcion</h2>
            <p className="project-copy">{project.description || project.summary || 'Sin descripcion cargada.'}</p>
          </article>

          <aside className="project-meta" aria-label="Datos del proyecto">
            <div>
              <span>Arquitecto</span>
              <strong>{project.architect || 'Por definir'}</strong>
            </div>
            <div>
              <span>Ingeniero calculista</span>
              <strong>{project.structural_engineer || 'Por definir'}</strong>
            </div>
            <div>
              <span>Especialistas</span>
              <strong>
                {Array.isArray(project.specialists) && project.specialists.length > 0
                  ? project.specialists.join(', ')
                  : 'Por definir'}
              </strong>
            </div>
            <div>
              <span>M2</span>
              <strong>{project.area_m2 || 'Por definir'}</strong>
            </div>
            <div>
              <span>Ano</span>
              <strong>{project.year || 'Por definir'}</strong>
            </div>
          </aside>
        </div>

        {hasGallery ? (
          <section className="project-slider" aria-label="Galeria del proyecto">
            <div className="project-slider-stage">
              <img src={galleryImages[activeSlide].image_url} alt={`Imagen ${activeSlide + 1} del proyecto ${project.title}`} />
              {galleryImages.length > 1 ? (
                <>
                  <button type="button" className="project-slider-arrow is-prev" onClick={goToPreviousSlide}>
                    Anterior
                  </button>
                  <button type="button" className="project-slider-arrow is-next" onClick={goToNextSlide}>
                    Siguiente
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
                    <img src={image.image_url} alt={`Miniatura ${index + 1}`} />
                  </button>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        <div className="project-actions">
          <Link className="button secondary" to="/#proyectos">
            Volver al portafolio
          </Link>
        </div>
      </section>
    </main>
  )
}