import { useLanguage } from '../lib/i18n.jsx'

export default function Process() {
  const { t } = useLanguage()

  return (
    <section className="process-section" id="proceso" aria-labelledby="process-title">
      <div className="section-head">
        <p className="eyebrow">{t('process.eyebrow')}</p>
        <h2 id="process-title">{t('process.title')}</h2>
      </div>
      <ol className="process-list">
        <li>
          <strong>{t('process.items.0.title')}</strong>
          <p>{t('process.items.0.copy')}</p>
        </li>
        <li>
          <strong>{t('process.items.1.title')}</strong>
          <p>{t('process.items.1.copy')}</p>
        </li>
        <li>
          <strong>{t('process.items.2.title')}</strong>
          <p>{t('process.items.2.copy')}</p>
        </li>
        <li>
          <strong>{t('process.items.3.title')}</strong>
          <p>{t('process.items.3.copy')}</p>
        </li>
      </ol>
    </section>
  )
}
