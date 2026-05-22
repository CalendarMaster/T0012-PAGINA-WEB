import { useEffect } from 'react'
import { SERVICES_BIM_DETAILS } from '../lib/siteContent'

export default function ServicesPage() {
  useEffect(() => {
    const cards = document.querySelectorAll('.services-feature')
    if (!cards.length) return () => {}

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -12% 0px',
      },
    )

    cards.forEach((card, index) => {
      card.style.setProperty('--reveal-delay', `${Math.min(index * 42, 240)}ms`)
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const getServicePreview = (description) => {
    const [firstSentence] = description.split('. ')
    if (!firstSentence) return description
    return firstSentence.endsWith('.') ? firstSentence : `${firstSentence}.`
  }

  return (
    <main className="content-page services-page" aria-labelledby="services-page-title">
      <nav className="services-jump" aria-label="Acceso directo a servicios">
        <ol>
          {SERVICES_BIM_DETAILS.map((service, index) => (
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
        <p className="eyebrow">Servicios BIM</p>
        <h1 id="services-page-title">Nuestros servicios</h1>
      </section>

      <section className="services-stream" aria-label="Detalle de servicios BIM">
        {SERVICES_BIM_DETAILS.map((service, index) => (
          <article key={service.id} id={service.id} className="services-feature">
            <header className="services-feature-head">
              <span className="services-feature-index">{String(index + 1).padStart(2, '0')}</span>
              <h2>{service.title}</h2>
            </header>

            <div className="services-feature-body">
              <p className="services-feature-preview">{getServicePreview(service.description)}</p>
              <details className="services-feature-more">
                <summary>Ver detalle</summary>
                <p>{service.description}</p>
              </details>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
