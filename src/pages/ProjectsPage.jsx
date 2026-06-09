import Portfolio from '../components/Portfolio'
import { useLanguage } from '../lib/i18n.jsx'

export default function ProjectsPage() {
  const { t } = useLanguage()

  return (
    <main className="projects-catalog-page" aria-labelledby="projects-page-title">
      <section className="content-page-head projects-catalog-head">
        <p className="eyebrow">{t('pages.projects.eyebrow')}</p>
        <h1 id="projects-page-title">{t('pages.projects.title')}</h1>
        <p className="services-catalog-lead">{t('pages.projects.lead')}</p>
      </section>
      <Portfolio minimal />
    </main>
  )
}
