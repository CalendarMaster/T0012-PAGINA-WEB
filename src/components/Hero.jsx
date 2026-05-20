export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <video
          className="hero-video"
          src="/assets/hero-bim-walkthrough.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="hero-gridline" />
      </div>
      <div className="hero-overlay" />
      <div className="hero-inner">
        <div className="hero-offer">
          <p className="eyebrow">Arquitectura + coordinación BIM en Chile</p>
          <h1 id="hero-title">
            BIM confiable para construir con <span>menos interferencias</span>
          </h1>
          <p className="hero-copy">
            Desarrollamos arquitectura, modelamiento y coordinación BIM con modelos federados,
            información verificable y reportes accionables antes de llegar a obra.
          </p>
          <div className="hero-actions" aria-label="Canales de contacto">
            <a className="button primary" href="mailto:contacto@mi-studio.cl">Agenda una reunión</a>
            <a className="button secondary" href="https://wa.me/56912345678">Habla por WhatsApp</a>
          </div>
        </div>
        <div className="hero-distinctive" aria-label="Qué distingue el BIM de MI Studio">
          <p className="distinctive-label">BIM real, no sólo modelos 3D</p>
          <div className="distinctive-grid">
            <article>
              <span>01</span>
              <p>Modelos federados por especialidad, preparados para coordinar y documentar.</p>
            </article>
            <article>
              <span>02</span>
              <p>Detección de interferencias con criterios técnicos, prioridades y reportes accionables.</p>
            </article>
            <article>
              <span>03</span>
              <p>Información trazable para diseño, licitación, construcción y toma de decisiones.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
