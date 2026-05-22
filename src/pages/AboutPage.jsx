import { getAboutContent } from '../lib/siteContent'
import { useLanguage } from '../lib/i18n.jsx'

export default function AboutPage() {
  const { lang, t } = useLanguage()
  const aboutContent = getAboutContent(lang)

  return (
    <main className="content-page" aria-labelledby="about-page-title">
      <section className="content-page-head">
        <p className="eyebrow">{t('pages.about.eyebrow')}</p>
        <h1 id="about-page-title">{t('pages.about.title')}</h1>
        <p>{t('pages.about.intro')}</p>
      </section>

      <div className="content-shell">
        <section className="content-main content-main-about" aria-label="Contenido institucional">
          <article id="mision" className="about-block">
            <h2>{t('pages.about.mission')}</h2>
            <blockquote>{aboutContent.mission}</blockquote>
          </article>

          <article id="vision" className="about-block">
            <h2>{t('pages.about.vision')}</h2>
            <blockquote>{aboutContent.vision}</blockquote>
          </article>

          <article id="valores" className="about-block">
            <h2>{t('pages.about.values')}</h2>
            <ul className="about-values">
              {aboutContent.values.map((value) => (
                <li key={value.title}>
                  <strong>{value.title}:</strong> {value.description}
                </li>
              ))}
            </ul>
          </article>

          <article id="equipo" className="about-block">
            <h2>{t('pages.about.team')}</h2>
            <p>{aboutContent.team}</p>
          </article>
        </section>
      </div>
    </main>
  )
}
