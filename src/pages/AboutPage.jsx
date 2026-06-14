import AboutClients from '../components/AboutClients'
import { handleJobsEmailClick } from '../lib/contactEmail'

const VALUES = [
  {
    id: 'excelencia',
    name: 'Excelencia',
    description:
      'Buscamos la perfección en cada etapa del proyecto, desde el diseño hasta la ejecución, asegurando la calidad y la satisfacción del cliente.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 8l2.06 5.26L24 14l-4 3.8.94 5.2L16 20.4l-4.94 2.6.94-5.2L8 14l5.94-.74L16 8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'innovacion',
    name: 'Innovación',
    description:
      'Estamos comprometidos con la adopción de nuevas tecnologías y metodologías que permitan mejorar continuamente nuestros servicios.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 6v2M16 24v2M6 16H4M28 16h-2M9.17 9.17l-1.41-1.42M24.24 24.24l-1.41-1.41M9.17 22.83l-1.41 1.42M24.24 7.76l-1.41 1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'colaboracion',
    name: 'Colaboración',
    description:
      'Fomentamos el trabajo en equipo y la comunicación abierta con todos los actores involucrados en el proyecto.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="11" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="21" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 26c0-4 3.13-7 7-7h10c3.87 0 7 3 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'transparencia',
    name: 'Transparencia',
    description:
      'Garantizamos la claridad y la accesibilidad de la información, facilitando la toma de decisiones y la gestión del proyecto.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="6" y="10" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 10V8a5 5 0 0110 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'adaptabilidad',
    name: 'Adaptabilidad',
    description:
      'Somos flexibles y nos adaptamos a las necesidades cambiantes de nuestros clientes y a los desafíos propios de cada proyecto y entorno.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M8 16a8 8 0 018-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 16a8 8 0 01-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 8l2-2 2 2M18 24l-2 2-2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <main className="about-page" aria-label="Nosotros">

      {/* 1. HERO */}
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero-inner">
          <p className="about-hero-eyebrow">Nosotros</p>
          <h1 id="about-hero-title" className="about-hero-title">Arquitectura + Tecnología</h1>
          <p className="about-hero-subtitle">
            Conectamos la industria AEC con tecnología de vanguardia para transformar la manera en que se diseñan, gestionan y construyen los proyectos.
          </p>
        </div>
      </section>

      {/* 2. MISIÓN Y VISIÓN */}
      <section id="mision-vision" className="about-mv" aria-label="Misión y visión">
        <div className="about-mv-shell">
          <div className="about-mv-block">
            <p className="about-mv-label">Misión</p>
            <blockquote className="about-mv-quote">
              "Optimizar los procesos y mejorar la toma de decisiones, entregando soluciones integrales y personalizadas maximizando el valor para nuestros clientes."
            </blockquote>
          </div>
          <div className="about-mv-divider" aria-hidden="true" />
          <div className="about-mv-block">
            <p className="about-mv-label">Visión</p>
            <blockquote className="about-mv-quote">
              "Ser reconocidos como líderes en la industria de la construcción, transformando la forma en que se desarrollan los proyectos a través de la implementación de tecnologías de vanguardia y la generación de modelos de información que permitan una gestión eficiente y colaborativa. Conectamos los mundos de la arquitectura, la ingeniería y la construcción (AEC) con la tecnología."
            </blockquote>
          </div>
        </div>
      </section>

      {/* 3. VALORES */}
      <section id="valores" className="about-values" aria-labelledby="about-valores-title">
        <div className="about-values-shell">
          <header className="about-values-head">
            <p className="about-values-eyebrow">Valores</p>
            <h2 id="about-valores-title" className="about-values-title">Lo que nos define</h2>
          </header>
          <ul className="about-values-grid" role="list">
            {VALUES.map((value) => (
              <li key={value.id} className="about-value-card">
                <span className="about-value-icon">{value.icon}</span>
                <strong className="about-value-name">{value.name}</strong>
                <p className="about-value-desc">{value.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. TRABAJA CON NOSOTROS */}
      <section className="about-jobs" aria-labelledby="about-jobs-title">
        <div className="about-jobs-shell">
          <div className="about-jobs-content">
            <p className="about-jobs-eyebrow">Únete al equipo</p>
            <h2 id="about-jobs-title" className="about-jobs-title">Trabaja con nosotros</h2>
            <p className="about-jobs-copy">
              Buscamos personas apasionadas por la tecnología y la construcción. Si quieres
              ser parte de un equipo que transforma la industria AEC, escríbenos con tu
              currículum y portafolio.
            </p>
          </div>
          <div className="about-jobs-action">
            <a
              href={`mailto:modelointegrado@mi-studio.cl`}
              className="button primary"
              onClick={handleJobsEmailClick}
            >
              Enviar postulación
            </a>
            <p className="about-jobs-email">modelointegrado@mi-studio.cl</p>
          </div>
        </div>
      </section>

      {/* 5. CLIENTES */}
      <AboutClients />

    </main>
  )
}
