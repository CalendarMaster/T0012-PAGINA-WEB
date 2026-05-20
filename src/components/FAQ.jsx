export default function FAQ() {
  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="section-head">
        <p className="eyebrow">Preguntas frecuentes</p>
        <h2 id="faq-title">Dudas habituales antes de iniciar coordinación BIM</h2>
      </div>
      <div className="faq-grid">
        <article>
          <h3>¿Qué es la coordinación BIM?</h3>
          <p>
            Es el proceso de integrar modelos de distintas especialidades para detectar interferencias,
            resolver conflictos y mejorar la información antes de construir.
          </p>
        </article>
        <article>
          <h3>¿Cuándo conviene contratar BIM?</h3>
          <p>
            Mientras antes se incorpore, mayor impacto tiene en costos, plazos y calidad de
            documentación. También puede ordenar proyectos ya avanzados.
          </p>
        </article>
      </div>
    </section>
  )
}
