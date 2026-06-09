import { useEffect, useState } from 'react'
import {
  Briefcase, PenTool, Layers, GitMerge,
  Activity, BarChart2, FileText, CalendarRange,
  Eye, HardHat, Building2, Settings2, Database, Zap,
} from 'lucide-react'
import { useLanguage } from '../lib/i18n.jsx'
import { getServicesBimDetails } from '../lib/siteContent'

const FILTERS = [
  { value: 'all',          label: { es: 'Todos',               en: 'All' } },
  { value: 'arquitectura', label: { es: 'Arquitectura',        en: 'Architecture' } },
  { value: 'bim',          label: { es: 'BIM & IM',            en: 'BIM & IM' } },
  { value: 'coordinacion', label: { es: 'Coordinación & Obra', en: 'Coordination & Works' } },
  { value: 'automatizacion', label: { es: 'Automatización',     en: 'Automation' } },
]

const SERVICE_ICONS = {
  'gerenciamiento-proyecto': Briefcase,
  'diseno':                  PenTool,
  'modelado':                Layers,
  'coordinacion':            GitMerge,
  'simulacion':              Activity,
  'evaluacion':              BarChart2,
  'documentacion':           FileText,
  'programacion':            CalendarRange,
  'visualizacion':           Eye,
  'seguimiento-obra':        HardHat,
  'facility-management':     Building2,
  'implementacion':          Settings2,
  'administracion-cde':      Database,
  'automatizacion':          Zap,
}

const SERVICE_MEDIA = {
  'gerenciamiento-proyecto': 'gerenciamiento de proyecto.jpg',
  'diseno':                  'diseño.jpg',
  'modelado':                'modelado.jpg',
  'coordinacion':            'coordinacion.jpg',
  'simulacion':              'simulacion.png',
  'evaluacion':              'evaluacion.gif',
  'documentacion':           'documentacion.jpg',
  'programacion':            'boveda-2-web.mp4',
  'visualizacion':           'imagenes.png',
  'seguimiento-obra':        'seguimiento en obra.jpg',
  'facility-management':     'facility management.jpg',
  'implementacion':          'implementacion.jpg',
  'administracion-cde':      'Administracion de CDE (Common Data Environment).jpg',
  'automatizacion':          'automatizacion.jpeg',
}

function getMedia(id) {
  const file = SERVICE_MEDIA[id] || 'imagenes.png'
  const src = encodeURI(`/assets/imagenes servicios/${file}`)
  const isVideo = file.endsWith('.mp4') || file.endsWith('.webm')
  return { src, isVideo }
}

const MODAL_LABELS = {
  when:        { es: 'Cuándo contratarlo',      en: 'When to hire us' },
  deliverables:{ es: 'Entregables habituales',  en: 'Typical deliverables' },
  cta:         { es: '¿Te interesa este servicio? Conversemos', en: 'Interested in this service? Let\'s talk' },
}

const PAGE_CTA = {
  eyebrow:  { es: '¿Tienes un proyecto?',                               en: 'Have a project in mind?' },
  headline: { es: 'Cuéntanos en qué etapa estás.\nPodemos ayudarte.',   en: 'Tell us where you are.\nWe can help.' },
  button:   { es: 'Ir a contacto',                                      en: 'Get in touch' },
}

function ServiceModal({ service, originRect, onClose, lang }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1280
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const originX = originRect ? ((originRect.left + originRect.width  / 2) / vw * 100) : 50
  const originY = originRect ? ((originRect.top  + originRect.height / 2) / vh * 100) : 50

  return (
    <div className="svc-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="svc-modal"
        style={{ '--origin-x': `${originX}%`, '--origin-y': `${originY}%` }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="svc-modal-title"
      >
        <figure className="svc-modal-media">
          {(() => { const { src, isVideo } = getMedia(service.id); return isVideo
            ? <video src={src} autoPlay muted loop playsInline />
            : <img src={src} alt={service.title} />
          })()}
          <button className="svc-modal-close" onClick={onClose} aria-label="Cerrar">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </figure>
        <div className="svc-modal-body">
          {service.tagline && <p className="svc-modal-tagline">{service.tagline}</p>}
          <h2 id="svc-modal-title">{service.title}</h2>
          <p className="svc-modal-desc">{service.description}</p>
          {service.when && (
            <div className="svc-modal-section">
              <h4 className="svc-modal-section-label">{MODAL_LABELS.when[lang] ?? MODAL_LABELS.when.es}</h4>
              <p>{service.when}</p>
            </div>
          )}
          {service.deliverables && (
            <div className="svc-modal-section">
              <h4 className="svc-modal-section-label">{MODAL_LABELS.deliverables[lang] ?? MODAL_LABELS.deliverables.es}</h4>
              <p>{service.deliverables}</p>
            </div>
          )}
          <div className="svc-modal-cta">
            <a href="/#contacto" className="svc-modal-cta-link">
              {MODAL_LABELS.cta[lang] ?? MODAL_LABELS.cta.es} →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const { lang, t } = useLanguage()
  const services = getServicesBimDetails(lang)
  const [active,  setActive]  = useState('all')
  const [modal,   setModal]   = useState(null)

  const visible = active === 'all'
    ? services
    : services.filter((s) =>
        Array.isArray(s.category) ? s.category.includes(active) : s.category === active
      )

  const openModal = (service, e) => {
    e.stopPropagation()
    const card = e.currentTarget.closest('.portafolio_card')
    setModal({ service, rect: card?.getBoundingClientRect() ?? null })
  }

  return (
    <main className="services-catalog-page" aria-labelledby="services-page-title">
      <section className="content-page-head services-catalog-head">
        <p className="eyebrow">{t('pages.services.eyebrow')}</p>
        <h1 id="services-page-title">{t('pages.services.title')}</h1>
        <p className="services-catalog-lead">{t('servicesHome.subtitle')}</p>
      </section>

      <div className="services-catalog-filters portafolio_filter_buttons" aria-label="Filtrar servicios">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className={`portafolio_filtro svc-filter-btn${active === f.value ? ' is_active' : ''}`}
            onClick={() => setActive(f.value)}
          >
            {f.label[lang] ?? f.label.es}
          </button>
        ))}
      </div>

      <div className="services-catalog-grid">
        {visible.length === 0 && (
          <p className="svc-catalog-empty">Próximamente agregaremos servicios en esta línea.</p>
        )}
        {visible.map((service, i) => (
          <article key={service.id} className="portafolio_card svc-catalog-card" data-category={Array.isArray(service.category) ? service.category[0] : service.category}>
            <div className="portafolio_card_inner">
              <div className="portafolio_card_front svc-catalog-front">
                <span className="svc-catalog-index">{String(i + 1).padStart(2, '0')}</span>
                {(() => { const Icon = SERVICE_ICONS[service.id]; return Icon ? <Icon className="svc-catalog-icon" strokeWidth={0.6} /> : null })()}
                <div className="svc-catalog-name-group">
                  <h2 className="svc-catalog-name">{service.title}</h2>
                  {service.tagline && <p className="svc-catalog-tagline">{service.tagline}</p>}
                </div>
              </div>
              <div className="portafolio_card_back">
                <h3 className="portafolio_card_title">{service.title}</h3>
                <p className="portafolio_card_summary">{service.description}</p>
                <button
                  type="button"
                  className="portafolio_card_btn"
                  onClick={(e) => openModal(service, e)}
                >
                  {t('pages.services.details')}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {modal && (
        <ServiceModal
          service={modal.service}
          originRect={modal.rect}
          onClose={() => setModal(null)}
          lang={lang}
        />
      )}
      <div className="svc-contact-band">
        <p className="eyebrow svc-cta-eyebrow">{PAGE_CTA.eyebrow[lang] ?? PAGE_CTA.eyebrow.es}</p>
        <h2 className="svc-cta-headline">
          {(PAGE_CTA.headline[lang] ?? PAGE_CTA.headline.es).split('\n').map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h2>
        <a href="/#contacto" className="svc-cta-btn">
          {PAGE_CTA.button[lang] ?? PAGE_CTA.button.es}
        </a>
      </div>
    </main>
  )
}
