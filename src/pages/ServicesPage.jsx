import { useEffect } from 'react'
import { getServicesBimDetails } from '../lib/siteContent'
import { useLanguage } from '../lib/i18n.jsx'

export default function ServicesPage() {
  const { lang, t } = useLanguage()
  const services = getServicesBimDetails(lang)

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
        {services.map((service, index) => (
          <article key={service.id} id={service.id} className="services-feature">
            <header className="services-feature-head">
              <span className="services-feature-index">{String(index + 1).padStart(2, '0')}</span>
              <h2>{service.title}</h2>
            </header>

            <div className="services-feature-body">
              <p className="services-feature-preview">{getServicePreview(service.description)}</p>
              <details className="services-feature-more">
                <summary>{t('pages.services.details')}</summary>
                <p>{service.description}</p>
              </details>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
