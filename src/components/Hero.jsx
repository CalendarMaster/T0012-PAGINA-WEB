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
          <p className="eyebrow">ARQUITECTURA · GESTIÓN DE INFORMACIÓN · METODOLOGÍA BIM</p>
          <h1 id="hero-title">
            Los datos son el entregable,
            <br />
            <span>no sólo el modelo.</span>
          </h1>
          <p className="hero-copy">
            Tratamos cada proyecto como una base de datos: diseñamos, coordinamos, gestionamos y
            extraemos información de forma adaptable, precisa y accionable — antes, durante y después de la obra.
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
        <div className="hero-distinctive" aria-label="Qué distingue la gestión integral de MI Studio">
          <p className="distinctive-label">Data management aplicado al ciclo completo del proyecto</p>
          <div className="distinctive-grid">
            <article>
              <span>01</span>
              <p>Modelos federados e integrados, con metodología BIM como soporte operativo para diseñar, coordinar y decidir con trazabilidad real.</p>
            </article>
            <article>
              <span>02</span>
              <p>Seguimiento de obra como objeto responsivo: contrastamos diseño y ejecución para ajustar decisiones con evidencia en terreno.</p>
            </article>
            <article>
              <span>03</span>
              <p>Continuidad post-obra: estructuramos información para operación, uso del edificio y mejora continua en el tiempo.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
