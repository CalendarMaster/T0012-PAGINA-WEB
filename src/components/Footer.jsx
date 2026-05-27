import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../lib/i18n.jsx'
import { CONTACT_EMAIL, handleContactEmailClick } from '../lib/contactEmail'

function SocialIcon({ kind }) {
  const commonProps = {
    className: 'footer-social-icon',
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': 'true',
  }

  if (kind === 'youtube') {
    return (
      <svg {...commonProps}>
        <rect x="3" y="6" width="18" height="12" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 9.5L15 12L10 14.5V9.5Z" fill="currentColor" />
      </svg>
    )
  }

  if (kind === 'facebook') {
    return (
      <svg {...commonProps}>
        <path d="M13.2 21V13.2H15.8L16.2 10.2H13.2V8.3C13.2 7.43 13.46 6.84 14.71 6.84H16.3V4.15C16.02 4.11 15.04 4 13.9 4C11.53 4 9.9 5.39 9.9 8.09V10.2H7.3V13.2H9.9V21H13.2Z" fill="currentColor" />
      </svg>
    )
  }

  if (kind === 'linkedin') {
    return (
      <svg {...commonProps}>
        <path d="M7 9.5V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 18V13.1C12 11.75 12.87 10.8 14.15 10.8C15.43 10.8 16 11.66 16 13.1V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12C12.45 11.1 13.38 10.2 14.9 10.2C17.1 10.2 18.3 11.67 18.3 14.38V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="6.7" r="1.25" fill="currentColor" />
      </svg>
    )
  }

  if (kind === 'instagram') {
    return (
      <svg {...commonProps}>
        <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.7" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 7L12 12L18.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { pathname } = useLocation()
  const { t } = useLanguage()

  const sectionHref = (id) => (pathname === '/' ? `#${id}` : `/#${id}`)

  return (
    <footer className="site-footer" id="contacto-footer">
      <div className="footer-shell">
        <section className="footer-topline" aria-label="Presentación institucional">
          <p className="footer-kicker">MI STUDIO · MODELO INTEGRADO</p>
          <a className="footer-cta" href={`mailto:${CONTACT_EMAIL}`} onClick={handleContactEmailClick}>{t('footer.cta')}</a>
        </section>

        <div className="footer-columns" aria-label="Navegación secundaria">
          <nav className="footer-column" aria-label="Información corporativa">
            <h3>{t('footer.columns.company')}</h3>
            <Link to="/proyectos">{t('header.nav.projects')}</Link>
            <a href={sectionHref('proceso')}>{t('footer.links.process')}</a>
            <Link to="/nosotros">{t('footer.links.about')}</Link>
            <a href={sectionHref('contacto')}>{t('footer.links.contact')}</a>
          </nav>

          <nav className="footer-column" aria-label="Líneas de servicio">
            <h3>{t('footer.columns.capabilities')}</h3>
            <Link to="/servicios#coordinacion">{t('footer.links.bimCoordination')}</Link>
            <Link to="/servicios#modelado">{t('footer.links.bimModeling')}</Link>
            <Link to="/servicios#diseno">{t('footer.links.architecture')}</Link>
            <Link to="/servicios#documentacion">{t('footer.links.docs45')}</Link>
          </nav>

          <div className="footer-column" aria-label="Canales de contacto">
            <h3>{t('footer.columns.contact')}</h3>
            <a href={`mailto:${CONTACT_EMAIL}`} onClick={handleContactEmailClick}>contacto@mi-studio.cl</a>
            <a href="tel:+56977666150">+56 9 7766 6150</a>
            <div className="footer-socials" aria-label={t('footer.socialLabel')}>
              <span className="footer-socials-title">{t('footer.socialLabel')}</span>
              <div className="footer-socials-list">
                <a
                  className="footer-social-link"
                  href="https://www.youtube.com/@modelointegradostudio2985"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon kind="youtube" />
                  YouTube
                </a>
                <a
                  className="footer-social-link"
                  href="https://www.facebook.com/modelointegradostudio/?locale=es_LA"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon kind="facebook" />
                  Facebook
                </a>
                <a
                  className="footer-social-link"
                  href="https://cl.linkedin.com/company/modelo-integrado-estudio"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon kind="linkedin" />
                  LinkedIn
                </a>
                <a
                  className="footer-social-link"
                  href="https://www.instagram.com/modelointegradostudio/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon kind="instagram" />
                  Instagram
                </a>
                <a className="footer-social-link" href={`mailto:${CONTACT_EMAIL}`} onClick={handleContactEmailClick}>
                  <SocialIcon kind="gmail" />
                  Gmail
                </a>
              </div>
            </div>
            <div className="footer-address" aria-label="Dirección corporativa">
              <span className="footer-address-label">{t('footer.address.label')}</span>
              <strong>Suecia 172</strong>
              <span>{t('footer.address.city')}</span>
              <a
                href="https://maps.google.com/?q=Suecia+172+Providencia+Santiago+Chile"
                target="_blank"
                rel="noreferrer"
              >
                {t('footer.address.map')}
              </a>
            </div>
            <Link to="/auth">{t('footer.teamAccess')}</Link>
          </div>
        </div>

        <div className="footer-trust" aria-label="Red y presencia profesional">
          BIM Forum Chile · Compite Chile · Asociación de Oficinas de Arquitectos
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {currentYear} MI Studio. {t('footer.rights')}</span>
        <span>{t('footer.policy')}</span>
      </div>
    </footer>
  )
}
