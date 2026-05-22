import { ABOUT_CONTENT } from '../lib/siteContent'

export default function AboutPage() {
  return (
    <main className="content-page" aria-labelledby="about-page-title">
      <section className="content-page-head">
        <p className="eyebrow">Nosotros</p>
        <h1 id="about-page-title">Vision estrategica y cultura de trabajo colaborativo</h1>
        <p>
          Consolidamos nuestro proposito institucional para dar claridad sobre como trabajamos,
          que valores guian la toma de decisiones y como construimos valor para cada cliente.
        </p>
      </section>

      <div className="content-shell">
        <section className="content-main content-main-about" aria-label="Contenido institucional">
          <article id="mision" className="about-block">
            <h2>Mision</h2>
            <blockquote>{ABOUT_CONTENT.mission}</blockquote>
          </article>

          <article id="vision" className="about-block">
            <h2>Vision</h2>
            <blockquote>{ABOUT_CONTENT.vision}</blockquote>
          </article>

          <article id="valores" className="about-block">
            <h2>Valores</h2>
            <ul className="about-values">
              {ABOUT_CONTENT.values.map((value) => (
                <li key={value.title}>
                  <strong>{value.title}:</strong> {value.description}
                </li>
              ))}
            </ul>
          </article>

          <article id="equipo" className="about-block">
            <h2>Equipo colaborativo</h2>
            <p>{ABOUT_CONTENT.team}</p>
          </article>
        </section>
      </div>
    </main>
  )
}
