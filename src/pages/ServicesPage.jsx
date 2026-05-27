import { useEffect, useState } from 'react'
import { getServicesBimDetails } from '../lib/siteContent'
import { useLanguage } from '../lib/i18n.jsx'
import LoadingLoop from '../components/LoadingLoop'

const SERVICE_MEDIA_BY_ID = {
  'gerenciamiento-proyecto': { type: 'image', file: 'gerenciamiento de proyecto.jpg' },
  diseno: { type: 'image', file: 'diseño.jpg' },
  modelado: { type: 'image', file: 'modelado.jpg' },
  coordinacion: { type: 'image', file: 'coordinacion.jpg' },
  simulacion: { type: 'image', file: 'simulacion.png' },
  evaluacion: { type: 'image', file: 'evaluacion.gif' },
  documentacion: { type: 'image', file: 'documentacion.jpg' },
  programacion: {
    type: 'video',
    file: 'boveda-2-web.mp4',
    src: '/assets/imagenes%20servicios/boveda-2-web.mp4',
    poster: 'imagenes.png',
  },
  visualizacion: { type: 'image', file: 'imagenes.png' },
  'seguimiento-obra': { type: 'image', file: 'seguimiento en obra.jpg' },
  'facility-management': { type: 'image', file: 'facility management.jpg' },
  implementacion: { type: 'image', file: 'implementacion.jpg' },
  'administracion-cde': { type: 'image', file: 'Administracion de CDE (Common Data Environment).jpg' },
}

const FALLBACK_MEDIA = { type: 'image', file: 'imagenes.png' }

function splitSentences(text = '') {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
}

function getServiceNarrative(description = '') {
  const sentences = splitSentences(description)
  const intro = sentences[0] || description
  const expanded = sentences.slice(1).join(' ')

  return {
    intro,
    expanded,
  }
}

export default function ServicesPage() {
  const { lang, t } = useLanguage()
  const services = getServicesBimDetails(lang)
  const [isLoadingServices, setIsLoadingServices] = useState(true)

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.services-feature'))
    if (!cards.length) return () => {}

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting && entry.intersectionRatio >= 0.4)
        })
      },
      {
        threshold: [0.2, 0.4, 0.65],
        rootMargin: '-8% 0px -14% 0px',
      },
    )

    cards.forEach((card, index) => {
      card.style.setProperty('--reveal-delay', `${Math.min(index * 36, 180)}ms`)
      observer.observe(card)
    })

    const getActiveCardIndex = () => {
      const viewportCenter = window.innerHeight / 2
      let activeIndex = 0
      let smallestDistance = Number.POSITIVE_INFINITY

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        const cardCenter = rect.top + rect.height / 2
        const distance = Math.abs(cardCenter - viewportCenter)
        if (distance < smallestDistance) {
          smallestDistance = distance
          activeIndex = index
        }
      })

      return activeIndex
    }

    const onKeyDown = (event) => {
      const target = event.target
      const isEditable =
        target instanceof HTMLElement &&
        (target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(target.tagName))

      if (isEditable) return

      const isForward = event.key === 'ArrowDown' || event.key === 'ArrowRight'
      const isBackward = event.key === 'ArrowUp' || event.key === 'ArrowLeft'
      if (!isForward && !isBackward) return

      event.preventDefault()
      const current = getActiveCardIndex()
      const delta = isForward ? 1 : -1
      const nextIndex = Math.max(0, Math.min(cards.length - 1, current + delta))
      const nextCard = cards[nextIndex]
      if (!nextCard) return

      nextCard.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (nextCard.id) {
        window.history.replaceState(null, '', `#${nextCard.id}`)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      observer.disconnect()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [services])

  const getServiceMedia = (serviceId) => {
    const media = SERVICE_MEDIA_BY_ID[serviceId] || FALLBACK_MEDIA
    return {
      ...media,
      src: media.src || encodeURI(`/assets/imagenes servicios/${media.file}`),
      posterSrc: media.poster ? encodeURI(`/assets/imagenes servicios/${media.poster}`) : undefined,
    }
  }

  useEffect(() => {
    let isCancelled = false
    setIsLoadingServices(true)

    const preloadImage = (src) => new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => resolve()
      img.src = src
    })

    const preloadVideo = (src) => new Promise((resolve) => {
      const video = document.createElement('video')
      video.preload = 'metadata'
      const done = () => resolve()
      video.onloadedmetadata = done
      video.onerror = done
      video.src = src
    })

    Promise.all(
      services.map((service) => {
        const media = getServiceMedia(service.id)
        return media.type === 'video' ? preloadVideo(media.src) : preloadImage(media.src)
      }),
    ).then(() => {
      if (isCancelled) return
      setIsLoadingServices(false)
    })

    return () => {
      isCancelled = true
    }
  }, [services])

  return (
    <main className="content-page services-page" aria-labelledby="services-page-title">
      <nav className="services-jump" aria-label={t('pages.services.jumpLabel')}>
        <ol>
          {services.map((service, index) => (
            <li key={service.id}>
              <a
                href={`#${service.id}`}
                className="services-jump-link"
                data-label={service.title}
                aria-label={`Ir a ${service.title}`}
              >
                {String(index + 1).padStart(2, '0')}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section className="content-page-head services-page-head">
        <p className="eyebrow">{t('pages.services.eyebrow')}</p>
        <h1 id="services-page-title">{t('pages.services.title')}</h1>
      </section>

      {isLoadingServices ? (
        <div className="section-loader-wrap" role="status" aria-live="polite">
          <LoadingLoop compact label={t('pages.services.loadingLabel', 'Cargando servicios BIM')} />
        </div>
      ) : null}

      <section className="services-stream" aria-label={t('pages.services.jumpLabel')} hidden={isLoadingServices}>
        {services.map((service, index) => {
          const narrative = getServiceNarrative(service.description)
          const media = getServiceMedia(service.id)

          return (
            <article key={service.id} id={service.id} className="services-feature">
              <header className="services-feature-head">
                <span className="services-feature-index">{String(index + 1).padStart(2, '0')}</span>
                <h2>{service.title}</h2>
                <div className="services-feature-copy">
                  <p className="services-feature-detail">{narrative.intro}</p>
                  {narrative.expanded ? (
                    <p className="services-feature-detail">{narrative.expanded}</p>
                  ) : null}
                </div>
              </header>

              <div className="services-feature-body">
                <figure className="services-feature-media">
                  {media.type === 'video' ? (
                    <>
                      <video
                        className="services-feature-video"
                        poster={media.posterSrc}
                        autoPlay
                        muted
                        loop
                        controls
                        playsInline
                        preload="auto"
                      >
                        <source src={media.src} type="video/mp4" />
                        Tu navegador no soporta reproducción de video.
                      </video>
                      <span className="services-feature-video-badge">Video</span>
                    </>
                  ) : (
                    <img src={media.src} alt="" loading="lazy" />
                  )}
                </figure>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}
