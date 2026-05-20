export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="MI Studio inicio">
        <img src="https://www.mi-studio.cl/images/template/logo.png" alt="MI Studio" />
        <span>modelo integrado</span>
      </a>
      <nav className="main-nav" aria-label="Navegación principal">
        <a href="#proyectos">Proyectos</a>
        <details>
          <summary>Servicios</summary>
          <div className="nav-dropdown">
            <a href="#servicios">Coordinación BIM</a>
            <a href="#servicios">Modelamiento BIM</a>
            <a href="#servicios">Arquitectura</a>
            <a href="#servicios">Documentación</a>
            <a href="#servicios">4D / 5D</a>
          </div>
        </details>
        <a href="#proceso">Proceso</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <a className="header-cta" href="https://wa.me/56912345678">WhatsApp</a>
    </header>
  )
}
