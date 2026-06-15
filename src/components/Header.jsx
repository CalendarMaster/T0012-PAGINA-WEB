import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../lib/i18n.jsx'
import { CONTACT_EMAIL, handleContactEmailClick } from '../lib/contactEmail'

export default function Header() {
  const { pathname } = useLocation()
  const { lang, setLang, t } = useLanguage()

  const sectionHref = (id) => (pathname === '/' ? `#${id}` : `/#${id}`)
  const footerHref = pathname === '/' ? '#contacto-footer' : '/#contacto-footer'

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="MI Studio inicio">
        <span className="brand-symbol" aria-hidden="true">
          <img
            className="brand-logo"
            src="/assets/LOGO%20MISTUDIO/3f072bab-57f3-4aac-b01d-d07e90113370.png"
            alt="MI Studio"
          />
        </span>
      </Link>

      <nav className="main-nav" aria-label="Navegación principal">
        <Link to="/">{t('header.nav.home')}</Link>
        <Link to="/proyectos">{t('header.nav.projects')}</Link>
        <Link to="/servicios">{t('header.nav.services')}</Link>
        <Link to="/nosotros">{t('header.nav.about')}</Link>
        <a href={sectionHref('proceso')}>{t('header.nav.process')}</a>
        <a href={footerHref}>{t('header.nav.contact')}</a>
        <Link to="/noticias">{t('header.nav.news')}</Link>
      </nav>

      <div className="header-tools" aria-label="Selector de idioma y contacto">
        <div className="lang-switch" role="group" aria-label="Selector de idioma">
          <button
            type="button"
            className={`lang-switch-btn${lang === 'es' ? ' is-active' : ''}`}
            onClick={() => setLang('es')}
          >
            ESP
          </button>
          <span className="lang-switch-separator">|</span>
          <button
            type="button"
            className={`lang-switch-btn${lang === 'en' ? ' is-active' : ''}`}
            onClick={() => setLang('en')}
          >
            EN
          </button>
        </div>
        <a className="header-cta" href={`mailto:${CONTACT_EMAIL}`} onClick={handleContactEmailClick}>{t('header.cta')}</a>
      </div>
    </header>
  )
}
