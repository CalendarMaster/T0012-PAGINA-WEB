import Portfolio from '../components/Portfolio'

export default function ProjectsPage() {
  return (
    <main className="projects-catalog-page" aria-labelledby="projects-page-title">
      <section className="projects-catalog-head">
        <p className="eyebrow">Proyectos</p>
        <h1 id="projects-page-title">Catalogo de proyectos</h1>
      </section>
      <Portfolio minimal />
    </main>
  )
}
