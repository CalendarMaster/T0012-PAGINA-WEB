import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { pathname } = useLocation()

  const sectionHref = (id) => (pathname === '/' ? `#${id}` : `/#${id}`)

  return (
    <footer className="site-footer" id="contacto-footer">
      <div className="footer-shell">
        <section className="footer-topline" aria-label="Presentación institucional">
          <p className="footer-kicker">MI STUDIO · MODELO INTEGRADO</p>
          <a className="footer-cta" href="https://wa.me/56977666150">Iniciar proyecto</a>
        </section>

        <div className="footer-columns" aria-label="Navegación secundaria">
          <nav className="footer-column" aria-label="Información corporativa">
            <h3>Empresa</h3>
            <Link to="/proyectos">Proyectos</Link>
            <a href={sectionHref('proceso')}>Proceso</a>
            <Link to="/nosotros">Nosotros</Link>
            <a href={sectionHref('contacto')}>Contacto</a>
          </nav>

          <nav className="footer-column" aria-label="Líneas de servicio">
            <h3>Capacidades</h3>
            <Link to="/servicios#coordinacion">Coordinación BIM</Link>
            <Link to="/servicios#modelado">Modelamiento BIM</Link>
            <Link to="/servicios#diseno">Arquitectura</Link>
            <Link to="/servicios#documentacion">Documentación + 4D/5D</Link>
          </nav>

          <div className="footer-column" aria-label="Canales de contacto">
            <h3>Contacto</h3>
            <a href="mailto:contacto@mistudio.cl">contacto@mistudio.cl</a>
            <a href="tel:+56977666150">+56 9 7766 6150</a>
            <div className="footer-address" aria-label="Dirección corporativa">
              <span className="footer-address-label">Dirección corporativa</span>
              <strong>Suecia 172</strong>
              <span>Providencia, Santiago, Chile</span>
              <a
                href="https://maps.google.com/?q=Suecia+172+Providencia+Santiago+Chile"
                target="_blank"
                rel="noreferrer"
              >
                Ver ubicación
              </a>
            </div>
            <Link to="/auth">Acceso equipo</Link>
          </div>
        </div>

        <div className="footer-trust" aria-label="Red y presencia profesional">
          BIM Forum Chile · Compite Chile · Asociación de Oficinas de Arquitectos
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {currentYear} MI Studio. Todos los derechos reservados.</span>
        <span>Política de calidad y gestión documental</span>
      </div>
    </footer>
  )
}
