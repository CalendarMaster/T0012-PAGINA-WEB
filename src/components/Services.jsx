import { useLanguage } from '../lib/i18n.jsx'

const INDEXES = ['01', '02', '03', '04']

export default function Services() {
  const { t } = useLanguage()
  const items = t('servicesHome.items')

  return (
    <section className="services-section" id="servicios" aria-labelledby="services-title">
      <div className="section-head">
        <p className="eyebrow">{t('servicesHome.eyebrow')}</p>
        <h2 id="services-title">
          {t('servicesHome.title').split(', ').map((part, i, arr) => (
            <span key={i} style={{ display: 'block' }}>
              {part}{i < arr.length - 1 ? ',' : ''}
            </span>
          ))}
        </h2>
        <p className="services-subtitle">{t('servicesHome.subtitle')}</p>
      </div>

      <div className="services-quad">
        {items.map((item, i) => (
          <article key={i}>
            <span className="svc-index">{INDEXES[i]}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
