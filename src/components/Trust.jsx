import { useLanguage } from '../lib/i18n.jsx'

export default function Trust() {
  const { t } = useLanguage()

  return (
    <section className="trust-section" id="nosotros" aria-labelledby="trust-title">
      <div className="section-head">
        <p className="eyebrow">{t('trust.eyebrow')}</p>
        <h2 id="trust-title">{t('trust.title')}</h2>
      </div>
      <div className="trust-layout">
        <p>{t('trust.copy')}</p>
        <ul>
          <li>BIM Forum Chile</li>
          <li>Compite Chile</li>
          <li>Asociación de Oficinas de Arquitectos</li>
        </ul>
      </div>
    </section>
  )
}
