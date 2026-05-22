import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../lib/i18n.jsx'

export default function Header() {
  const [logoAnimKey, setLogoAnimKey] = useState(0)
  const { pathname } = useLocation()
  const { lang, setLang, t } = useLanguage()

  const sectionHref = (id) => (pathname === '/' ? `#${id}` : `/#${id}`)

  const replayLogoAnimation = () => {
    setLogoAnimKey((previous) => previous + 1)
  }

  return (
    <header className="site-header">
      <Link
        className="brand"
        to="/"
        aria-label="MI Studio inicio"
        onMouseEnter={replayLogoAnimation}
        onFocus={replayLogoAnimation}
      >
        <span className="brand-symbol" aria-hidden="true">
          <svg
            key={logoAnimKey}
            className="brand-logo"
            viewBox="160 140 580 420"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
          >
            <path
              className="animate-draw-path"
              fill="none"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M 190 530 L 190 230 A 65 65 0 0 1 320 230 L 320 460 A 65 65 0 0 0 450 460 L 450 230 A 65 65 0 0 1 580 230 L 580 460 A 65 65 0 0 0 710 460 L 710 320"
            />
            <circle className="animate-dot" cx="710" cy="175" r="20" fill="var(--orange)" />
          </svg>
        </span>

        <span className="brand-wordmark" aria-hidden="true">
          <span className="brand-modelo">modelo integrado</span>
          <strong className="brand-studio">STUDIO</strong>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Navegación principal">
        <Link to="/">{t('header.nav.home')}</Link>
        <Link to="/proyectos">{t('header.nav.projects')}</Link>
        <Link to="/servicios">{t('header.nav.services')}</Link>
        <details>
          <summary>{t('header.nav.about')}</summary>
          <div className="nav-dropdown">
            <Link to="/nosotros#mision">{t('header.aboutMenu.mission')}</Link>
            <Link to="/nosotros#vision">{t('header.aboutMenu.vision')}</Link>
            <Link to="/nosotros#valores">{t('header.aboutMenu.values')}</Link>
            <Link to="/nosotros#equipo">{t('header.aboutMenu.team')}</Link>
          </div>
        </details>
        <a href={sectionHref('proceso')}>{t('header.nav.process')}</a>
        <a href={sectionHref('contacto')}>{t('header.nav.contact')}</a>
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
        <a className="header-cta" href="https://wa.me/56977666150">{t('header.cta')}</a>
      </div>
    </header>
  )
}
