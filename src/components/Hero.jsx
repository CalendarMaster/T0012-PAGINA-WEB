import { useEffect, useRef } from 'react'

const HERO_START_AT = 10
const HERO_CUT_BEFORE_END = 6

export default function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const ensureStartFrame = () => {
      if (video.duration && video.currentTime < HERO_START_AT) {
        video.currentTime = HERO_START_AT
      }
    }

    const handleTimeUpdate = () => {
      if (!video.duration) return

      const cutPoint = video.duration - HERO_CUT_BEFORE_END

      if (video.currentTime >= cutPoint) {
        video.currentTime = HERO_START_AT
        video.play()
      }
    }

    video.currentTime = HERO_START_AT
    video.addEventListener('loadedmetadata', ensureStartFrame)
    video.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      video.removeEventListener('loadedmetadata', ensureStartFrame)
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <video
          ref={videoRef}
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
          <p className="eyebrow">ARQUITECTURA · BIM · GESTIÓN DE INFORMACIÓN</p>
          <h1 id="hero-title">
            El modelo no es el entregable.
            <br />
            <span>Los datos son el entregable.</span>
          </h1>
          <p className="hero-copy">
            Tratamos cada proyecto como una base de datos: coordinamos, gestionamos y extraemos
            información BIM de forma adaptable, precisa y accionable — antes de llegar a obra.
          </p>
          <div className="hero-actions" aria-label="Canales de contacto">
            <a
              className="button primary"
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reunion%20MI%20Studio&details=Hola%2C%20me%20gustaria%20agendar%20una%20reunion%20para%20revisar%20mi%20proyecto.&add=jsimpson%40mi-studio.cl"
              target="_blank"
              rel="noreferrer"
            >
              Agenda una reunión
            </a>
            <a className="button secondary" href="https://wa.me/56977666150">Habla por WhatsApp</a>
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
