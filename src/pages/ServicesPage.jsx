import { useEffect } from 'react'
import { getServicesBimDetails } from '../lib/siteContent'
import { useLanguage } from '../lib/i18n.jsx'

const SERVICE_IMAGE_BY_ID = {
  'gerenciamiento-proyecto': 'gerenciamiento de proyecto.jpg',
  diseno: 'diseño.jpg',
  modelado: 'modelado.jpg',
  coordinacion: 'coordinacion.jpg',
  simulacion: 'simulacion.png',
  evaluacion: 'evaluacion.gif',
  documentacion: 'documentacion.jpg',
  programacion: 'imagenes.png',
  visualizacion: 'imagenes.png',
  'seguimiento-obra': 'seguimiento en obra.jpg',
  'facility-management': 'facility management.jpg',
  implementacion: 'implementacion.jpg',
  'administracion-cde': 'Administracion de CDE (Common Data Environment).jpg',
}

const FALLBACK_IMAGE = 'imagenes.png'

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

  const getServiceImagePath = (serviceId) => {
    const imageName = SERVICE_IMAGE_BY_ID[serviceId] || FALLBACK_IMAGE
    return encodeURI(`/assets/imagenes servicios/${imageName}`)
  }

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

      <section className="services-stream" aria-label={t('pages.services.jumpLabel')}>
        {services.map((service, index) => {
          const narrative = getServiceNarrative(service.description)

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
                <figure className="services-feature-media" aria-hidden="true">
                  <img src={getServiceImagePath(service.id)} alt="" loading="lazy" />
                </figure>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}
