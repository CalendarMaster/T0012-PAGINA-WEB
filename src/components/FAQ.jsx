import { useState } from 'react'
import { useLanguage } from '../lib/i18n.jsx'

export default function FAQ() {
  const { t } = useLanguage()
  const items = t('faq.items')
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="section-head">
        <p className="eyebrow">{t('faq.eyebrow')}</p>
        <h2 id="faq-title">{t('faq.title')}</h2>
      </div>
      <div className="faq-grid">
        {items.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <article
              key={i}
              className={isOpen ? 'is-open' : ''}
              onClick={() => toggle(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggle(i)}
              aria-expanded={isOpen}
            >
              <h3>{item.q}</h3>
              <div className={`faq-answer${isOpen ? ' is-open' : ''}`}>
                <p>{item.a}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
