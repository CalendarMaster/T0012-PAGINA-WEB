import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../lib/i18n.jsx'

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
          <a className="footer-cta" href="https://wa.me/56977666150">{t('footer.cta')}</a>
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
            <a href="mailto:contacto@mistudio.cl">contacto@mistudio.cl</a>
            <a href="tel:+56977666150">+56 9 7766 6150</a>
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
