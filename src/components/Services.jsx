import { useLanguage } from '../lib/i18n.jsx'

export default function Services() {
  const { t } = useLanguage()

  return (
    <section className="services-section" id="servicios" aria-labelledby="services-title">
      <div className="section-head">
        <p className="eyebrow">{t('servicesHome.eyebrow')}</p>
        <h2 id="services-title">{t('servicesHome.title')}</h2>
      </div>

      <div className="service-grid">
        <article>
          <span>01</span>
          <h3>{t('servicesHome.items.0.title')}</h3>
          <p>{t('servicesHome.items.0.copy')}</p>
        </article>
        <article>
          <span>02</span>
          <h3>{t('servicesHome.items.1.title')}</h3>
          <p>{t('servicesHome.items.1.copy')}</p>
        </article>
        <article>
          <span>03</span>
          <h3>{t('servicesHome.items.2.title')}</h3>
          <p>{t('servicesHome.items.2.copy')}</p>
        </article>
        <article>
          <span>04</span>
          <h3>{t('servicesHome.items.3.title')}</h3>
          <p>{t('servicesHome.items.3.copy')}</p>
        </article>
      </div>
    </section>
  )
}
