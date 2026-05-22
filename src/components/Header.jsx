import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [logoAnimKey, setLogoAnimKey] = useState(0)
  const { pathname } = useLocation()

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
        <Link to="/proyectos">Proyectos</Link>
        <Link to="/servicios">Servicios BIM</Link>
        <details>
          <summary>Nosotros</summary>
          <div className="nav-dropdown">
            <Link to="/nosotros#mision">Mision</Link>
            <Link to="/nosotros#vision">Vision</Link>
            <Link to="/nosotros#valores">Valores</Link>
            <Link to="/nosotros#equipo">Equipo colaborativo</Link>
          </div>
        </details>
        <a href={sectionHref('proceso')}>Proceso</a>
        <a href={sectionHref('contacto')}>Contacto</a>
      </nav>
      <a className="header-cta" href="https://wa.me/56977666150">Contactanos</a>
    </header>
  )
}
