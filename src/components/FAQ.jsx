import { useLanguage } from '../lib/i18n.jsx'

export default function FAQ() {
  const { t } = useLanguage()

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="section-head">
        <p className="eyebrow">{t('faq.eyebrow')}</p>
        <h2 id="faq-title">{t('faq.title')}</h2>
      </div>
      <div className="faq-grid">
        <article>
          <h3>{t('faq.q1')}</h3>
          <p>{t('faq.a1')}</p>
        </article>
        <article>
          <h3>{t('faq.q2')}</h3>
          <p>{t('faq.a2')}</p>
        </article>
      </div>
    </section>
  )
}
