import { useEffect, useRef } from 'react'
import { useLanguage } from '../lib/i18n.jsx'

const HERO_START_AT = 0
const HERO_CUT_BEFORE_END = 6

export default function Hero() {
  const videoRef = useRef(null)
  const { t } = useLanguage()

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
          src="/assets/CD%20FALABELLA%20INSTALACIONES.mp4"
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
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h1 id="hero-title">
            {t('hero.titleLine1')}
            <br />
            <span>{t('hero.titleLine2')}</span>
          </h1>
          <p className="hero-copy">{t('hero.copy')}</p>
          <div className="hero-actions" aria-label="Canales de contacto">
            <a
              className="button primary"
              href="mailto:contacto@mistudio.cl?subject=Solicitud%20de%20reuni%C3%B3n%20-%20MI%20Studio&body=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20reuni%C3%B3n%20para%20revisar%20mi%20proyecto."
            >
              {t('hero.ctaMeeting')}
            </a>
            <a className="button secondary" href="https://wa.me/56977666150">{t('hero.ctaWhatsapp')}</a>
          </div>
        </div>
        <div className="hero-distinctive" aria-label="Qué distingue la gestión integral de MI Studio">
          <p className="distinctive-label">{t('hero.distinctiveLabel')}</p>
          <div className="distinctive-grid">
            <article>
              <span>01</span>
              <p>{t('hero.points.0')}</p>
            </article>
            <article>
              <span>02</span>
              <p>{t('hero.points.1')}</p>
            </article>
            <article>
              <span>03</span>
              <p>{t('hero.points.2')}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
