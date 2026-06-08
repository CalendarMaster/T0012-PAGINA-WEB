import { useLanguage } from '../lib/i18n.jsx'

export default function NewsPage() {
  const { lang } = useLanguage()

  return (
    <main className="content-page" aria-label={lang === 'en' ? 'News' : 'Noticias'}>
      <section className="project-shell">
        <p className="eyebrow">{lang === 'en' ? 'News' : 'Noticias'}</p>
        <h1>{lang === 'en' ? 'News' : 'Noticias'}</h1>
        <p className="project-copy">
          {lang === 'en'
            ? 'We are preparing this section to share updates, project milestones, and industry insights.'
            : 'Estamos preparando esta sección para compartir novedades, hitos de proyectos y contenido técnico del rubro.'}
        </p>
      </section>
    </main>
  )
}
