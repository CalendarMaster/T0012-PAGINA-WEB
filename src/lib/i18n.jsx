import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LANGUAGE_STORAGE_KEY = 'mi-site-lang'

const TRANSLATIONS = {
  es: {
    header: {
      nav: {
        home: 'Inicio',
        projects: 'Proyectos',
        services: 'Servicios',
        about: 'Nosotros',
        process: 'Proceso',
        contact: 'Contacto',
      },
      aboutMenu: {
        mission: 'Misión',
        vision: 'Visión',
        values: 'Valores',
        team: 'Equipo colaborativo',
      },
      cta: 'Contáctanos',
    },
    footer: {
      cta: 'Iniciar proyecto',
      columns: {
        company: 'Empresa',
        capabilities: 'Capacidades',
        contact: 'Contacto',
      },
      links: {
        process: 'Proceso',
        about: 'Nosotros',
        contact: 'Contacto',
        bimCoordination: 'Coordinación de Información',
        bimModeling: 'Modelado de Información',
        architecture: 'Arquitectura',
        docs45: 'Documentación + 4D/5D',
      },
      address: {
        label: 'Dirección corporativa',
        city: 'Providencia, Santiago, Chile',
        map: 'Ver ubicación',
      },
      socialLabel: 'Redes',
      teamAccess: 'Acceso equipo',
      rights: 'Todos los derechos reservados.',
      policy: 'Política de calidad y gestión documental',
    },
    hero: {
      eyebrow: 'ARQUITECTURA · GESTIÓN DE INFORMACIÓN',
      titleLine1: 'Los datos son el entregable,',
      titleLine2: 'no solo el modelo.',
      copy:
        'Tratamos cada proyecto como una base de datos: diseñamos, coordinamos, gestionamos y extraemos información de forma adaptable, precisa y accionable — antes, durante y después de la obra.',
      ctaMeeting: 'Agenda una reunión',
      ctaWhatsapp: 'Habla por WhatsApp',
      distinctiveLabel: 'Information Management aplicado al ciclo completo del proyecto',
      points: [
        'Modelos federados e integrados, con Information Management como soporte operativo para diseñar, coordinar y decidir con trazabilidad real.',
        'Seguimiento de obra como objeto responsivo: contrastamos diseño y ejecución para ajustar decisiones con evidencia en terreno.',
        'Continuidad post-obra: estructuramos información para operación, uso del edificio y mejora continua en el tiempo.',
      ],
    },
    portfolio: {
      eyebrow: 'Proyectos',
      title: 'Nuestros proyectos',
      copy: '',
      loading: 'Cargando proyectos',
      empty: 'Todavía no hay proyectos publicados en esta categoría.',
      fallbackSummary: 'Proyecto gestionado por MI-STUDIO.',
      seeMore: 'Ver más',
      catalogTitle: 'Catálogo de proyectos',
    },
    servicesHome: {
      eyebrow: 'Servicios de Information Management',
      title: 'Menos interferencias, más control y mejor información de obra',
      membersLabel: 'Somos miembros de',
      clientsLabel: 'Nuestros clientes',
      items: [
        {
          title: 'Coordinación de Información',
          copy: 'Integramos arquitectura, estructura e instalaciones para detectar interferencias antes de obra y reducir retrabajos mediante datos consistentes.',
        },
        {
          title: 'Modelado de Información',
          copy: 'Desarrollamos modelos por especialidad con información útil para diseño, coordinación, cubicaciones y documentación.',
        },
        {
          title: 'Arquitectura',
          copy: 'Diseñamos proyectos funcionales y construibles, alineados con terreno, presupuesto, normativa y criterios de Information Management.',
        },
        {
          title: 'Documentación técnica',
          copy: 'Generamos planos, entregables y reportes consistentes para aprobación, licitación, construcción y seguimiento.',
        },
      ],
    },
    process: {
      eyebrow: 'Proceso',
      title: 'Una ruta de trabajo clara desde el diagnóstico hasta la obra',
      items: [
        { title: 'Diagnóstico', copy: 'Revisamos etapa, objetivos, especialidades, formatos y entregables necesarios.' },
        { title: 'Modelado y federación', copy: 'Construimos o integramos modelos para coordinar información crítica del proyecto.' },
        { title: 'Coordinación', copy: 'Detectamos interferencias, priorizamos conflictos y generamos reportes accionables.' },
        { title: 'Entrega y acompañamiento', copy: 'Documentamos decisiones y apoyamos la transición hacia licitación, obra o post-entrega.' },
      ],
    },
    trust: {
      eyebrow: 'Confianza',
      title: 'Un equipo técnico para proyectos de arquitectura, construcción e infraestructura',
      copy:
        'Trabajamos con constructoras, inmobiliarias, oficinas de arquitectura, ingeniería y mandantes que necesitan modelos confiables, coordinación temprana y documentación precisa.',
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Dudas habituales antes de iniciar gestión de información',
      q1: '¿Qué es la gestión de información en proyectos?',
      a1: 'Es el proceso de estructurar, coordinar y gobernar datos de distintas especialidades para decidir mejor durante diseño, construcción y operación.',
      q2: '¿Cuándo conviene implementar Information Management?',
      a2: 'Mientras antes se incorpore, mayor impacto tiene en costos, plazos y calidad documental. También puede ordenar proyectos ya avanzados.',
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Cuéntanos en qué etapa está tu proyecto',
      copy: 'Te responderemos con una ruta de trabajo para levantar requerimientos, revisar el modelo o iniciar una estrategia de Information Management.',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      submit: 'Enviar consulta',
    },
    pages: {
      projects: {
        eyebrow: 'Proyectos',
        title: 'Catálogo de proyectos',
      },
      services: {
        eyebrow: 'Information Management',
        title: 'Nuestros servicios',
        jumpLabel: 'Acceso directo a servicios',
        details: 'Ver detalle',
        loadingLabel: 'Cargando servicios de Information Management',
      },
      about: {
        eyebrow: 'Nosotros',
        title: 'Visión estratégica y cultura de trabajo colaborativo',
        intro:
          'Consolidamos nuestro propósito institucional para dar claridad sobre cómo trabajamos, qué valores guían la toma de decisiones y cómo construimos valor para cada cliente.',
        manifestoEyebrow: 'Cómo pensamos',
        whyTitle: 'Por qué existimos',
        whyCopy:
          'La industria pierde tiempo y recursos cuando la información llega tarde o fragmentada. Nuestra práctica nace para convertir datos técnicos en decisiones claras desde etapas tempranas.',
        buildTitle: 'Qué estamos construyendo',
        buildCopy:
          'Desarrollamos un sistema de Information Management aplicado a todo el ciclo del proyecto: diseño, coordinación, obra y operación, con continuidad y trazabilidad real.',
        commitTitle: 'A qué nos comprometemos',
        commitCopy:
          'Priorizamos claridad, colaboración y resultados verificables. Menos incertidumbre para el equipo, más control para el cliente.',
        story: 'Nuestra historia',
        storyLead: 'Construimos una práctica centrada en Information Management, decisiones claras, datos confiables y continuidad operativa.',
        mission: 'Misión',
        vision: 'Visión',
        values: 'Valores',
        team: 'Equipo colaborativo',
      },
      projectDetail: {
        eyebrow: 'Proyecto',
        loadingTitle: 'Cargando proyecto',
        loadingLabel: 'Cargando proyecto',
        unavailable: 'No disponible',
        notFound: 'No encontramos este proyecto o aún no está publicado.',
        backToPortfolio: 'Volver al portafolio',
        description: 'Descripción',
        emptyDescription: 'Sin descripción cargada.',
        dataLabel: 'Datos del proyecto',
        destination: 'Destino',
        mandante: 'Mandante',
        architect: 'Arquitecto',
        structuralEngineer: 'Ingeniero calculista',
        specialists: 'Especialistas',
        m2: 'M2',
        year: 'Año',
        undefined: 'Por definir',
        galleryLabel: 'Galería del proyecto',
        prev: 'Anterior',
        next: 'Siguiente',
        imageAlt: 'Imagen {index} del proyecto {title}',
        thumbAlt: 'Miniatura {index}',
      },
      auth: {
        eyebrow: 'Acceso interno',
        checkingTitle: 'Verificando sesión',
        checkingLabel: 'Validando acceso',
        title: 'Dashboard de proyectos',
        copy: 'Las cuentas y contraseñas se administran desde Supabase Auth. Este acceso usa solo correo y contraseña.',
        email: 'Correo',
        emailPlaceholder: 'nombre@mi-studio.cl',
        password: 'Contraseña',
        passwordPlaceholder: 'Tu contraseña',
        submit: 'Entrar',
        back: 'Volver al sitio',
        errors: {
          validEmail: 'Ingresa un correo válido.',
          passwordRequired: 'Ingresa tu contraseña.',
          invalidCredentials: 'Correo o contraseña incorrectos.',
        },
      },
    },
  },
  en: {
    header: {
      nav: {
        home: 'Home',
        projects: 'Projects',
        services: 'Information Management',
        about: 'About Us',
        process: 'Process',
        contact: 'Contact',
      },
      aboutMenu: {
        mission: 'Mission',
        vision: 'Vision',
        values: 'Values',
        team: 'Collaborative team',
      },
      cta: 'Contact us',
    },
    footer: {
      cta: 'Start a project',
      columns: {
        company: 'Company',
        capabilities: 'Capabilities',
        contact: 'Contact',
      },
      links: {
        process: 'Process',
        about: 'About us',
        contact: 'Contact',
        bimCoordination: 'Information Coordination',
        bimModeling: 'Information Modeling',
        architecture: 'Architecture',
        docs45: 'Documentation + 4D/5D',
      },
      address: {
        label: 'Corporate address',
        city: 'Providencia, Santiago, Chile',
        map: 'View location',
      },
      socialLabel: 'Social',
      teamAccess: 'Team access',
      rights: 'All rights reserved.',
      policy: 'Quality policy and document management',
    },
    hero: {
      eyebrow: 'ARCHITECTURE · INFORMATION MANAGEMENT · ISO 19650 APPROACH',
      titleLine1: 'Data is the deliverable,',
      titleLine2: 'not only the model.',
      copy:
        'We treat each project as a data system: we design, coordinate, manage, and extract actionable information before, during, and after construction.',
      ctaMeeting: 'Book a meeting',
      ctaWhatsapp: 'Chat on WhatsApp',
      distinctiveLabel: 'Information Management applied across the full project lifecycle',
      points: [
        'Federated and integrated models, with Information Management as operational support to design, coordinate, and decide with real traceability.',
        'Construction follow-up as a responsive object: we compare design versus execution to adjust decisions with field evidence.',
        'Post-construction continuity: we structure information for operation, building use, and continuous improvement over time.',
      ],
    },
    portfolio: {
      eyebrow: 'Featured portfolio',
      title: 'Projects coordinated with technical precision',
      copy:
        'The catalog keeps the original visual language: model mosaic, category color logic, and informative card backs.',
      loading: 'Loading projects',
      empty: 'No published projects in this category yet.',
      fallbackSummary: 'Project managed by MI-STUDIO.',
      seeMore: 'See more',
      catalogTitle: 'Project catalog',
    },
    servicesHome: {
      eyebrow: 'Integrated Information Management services',
      title: 'Fewer clashes, more control, and better construction information',
      membersLabel: 'We are members of',
      clientsLabel: 'Our clients',
      items: [
        {
          title: 'Information Coordination',
          copy: 'We integrate architecture, structure, and MEP models to detect clashes before construction and reduce rework through reliable data.',
        },
        {
          title: 'Information Modeling',
          copy: 'We develop discipline-based models with useful data for design, coordination, quantity takeoffs, and documentation.',
        },
        {
          title: 'Architecture',
          copy: 'We design functional and buildable projects aligned with site conditions, budget, regulations, and Information Management criteria.',
        },
        {
          title: 'Technical Documentation',
          copy: 'We produce consistent plans, deliverables, and reports for approvals, tendering, construction, and follow-up.',
        },
      ],
    },
    process: {
      eyebrow: 'Process',
      title: 'A clear workflow from diagnosis to construction',
      items: [
        { title: 'Diagnosis', copy: 'We review stage, goals, disciplines, formats, and required deliverables.' },
        { title: 'Modeling and federation', copy: 'We build or integrate models to coordinate critical project information.' },
        { title: 'Coordination', copy: 'We detect clashes, prioritize conflicts, and issue actionable reports.' },
        { title: 'Delivery and support', copy: 'We document decisions and support transition to tendering, construction, or post-delivery.' },
      ],
    },
    trust: {
      eyebrow: 'Trust',
      title: 'A technical team for architecture, construction, and infrastructure projects',
      copy:
        'We work with contractors, developers, architecture firms, engineering teams, and owners who need reliable models, early coordination, and precise documentation.',
    },
    faq: {
      eyebrow: 'Frequently asked questions',
      title: 'Common questions before starting Information Management',
      q1: 'What is Information Management in projects?',
      a1: 'It is the process of structuring, coordinating, and governing project data across disciplines to improve decisions from design to operations.',
      q2: 'When should Information Management be implemented?',
      a2: 'The earlier it is incorporated, the greater the impact on cost, schedule, and documentation quality. It can also organize advanced-stage projects.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Tell us what stage your project is in',
      copy: 'We will reply with a work route to gather requirements, review your model environment, or start an Information Management strategy.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send inquiry',
    },
    pages: {
      projects: {
        eyebrow: 'Projects',
        title: 'Project catalog',
      },
      services: {
        eyebrow: 'Information Management',
        title: 'Our services',
        jumpLabel: 'Direct access to services',
        details: 'View details',
        loadingLabel: 'Loading Information Management services',
      },
      about: {
        eyebrow: 'About us',
        title: 'Strategic vision and collaborative work culture',
        intro:
          'We consolidate our institutional purpose to clarify how we work, which values guide decisions, and how we create value for each client.',
        manifestoEyebrow: 'How we think',
        whyTitle: 'Why we exist',
        whyCopy:
          'The industry loses time and resources when information arrives late or fragmented. Our practice exists to turn technical data into clear decisions from early stages.',
        buildTitle: 'What we are building',
        buildCopy:
          'We develop an Information Management system applied to the full project lifecycle: design, coordination, construction, and operations, with real continuity and traceability.',
        commitTitle: 'What we are committed to',
        commitCopy:
          'We prioritize clarity, collaboration, and verifiable outcomes. Less uncertainty for teams, more control for clients.',
        story: 'Our story',
        storyLead: 'We build an Information Management practice focused on clear decisions, reliable data, and operational continuity.',
        mission: 'Mission',
        vision: 'Vision',
        values: 'Values',
        team: 'Collaborative team',
      },
      projectDetail: {
        eyebrow: 'Project',
        loadingTitle: 'Loading project',
        loadingLabel: 'Loading project',
        unavailable: 'Not available',
        notFound: 'We could not find this project or it is not published yet.',
        backToPortfolio: 'Back to portfolio',
        description: 'Description',
        emptyDescription: 'No description available.',
        dataLabel: 'Project data',
        destination: 'Destination',
        mandante: 'Client',
        architect: 'Architect',
        structuralEngineer: 'Structural engineer',
        specialists: 'Specialists',
        m2: 'm2',
        year: 'Year',
        undefined: 'To be defined',
        galleryLabel: 'Project gallery',
        prev: 'Previous',
        next: 'Next',
        imageAlt: 'Image {index} of project {title}',
        thumbAlt: 'Thumbnail {index}',
      },
      auth: {
        eyebrow: 'Internal access',
        checkingTitle: 'Checking session',
        checkingLabel: 'Validating access',
        title: 'Project dashboard',
        copy: 'Accounts and passwords are managed from Supabase Auth. This access uses only email and password.',
        email: 'Email',
        emailPlaceholder: 'name@mi-studio.cl',
        password: 'Password',
        passwordPlaceholder: 'Your password',
        submit: 'Sign in',
        back: 'Back to site',
        errors: {
          validEmail: 'Enter a valid email.',
          passwordRequired: 'Enter your password.',
          invalidCredentials: 'Invalid email or password.',
        },
      },
    },
  },
}

const LanguageContext = createContext(undefined)

function getByPath(source, path) {
  return path.split('.').reduce((acc, key) => (acc && key in acc ? acc[key] : undefined), source)
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'es'
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return saved === 'en' ? 'en' : 'es'
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => {
    const t = (path, fallback = '') => getByPath(TRANSLATIONS[lang], path) ?? fallback ?? path
    return {
      lang,
      setLang,
      t,
    }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}


