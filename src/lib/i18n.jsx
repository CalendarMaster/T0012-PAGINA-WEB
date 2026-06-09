import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LANGUAGE_STORAGE_KEY = 'mi-site-lang'

const TRANSLATIONS = {
  es: {
    header: {
      nav: {
        home: 'Inicio',
        projects: 'Proyectos',
        news: 'Noticias',
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
      eyebrow: 'ARQUITECTURA · BIM · COORDINACIÓN · SEGUIMIENTO DE OBRA',
      titleLine1: 'Los datos son el entregable,',
      titleLine2: 'no solo el modelo.',
      copy:
        'Integramos arquitectura, BIM, coordinación y seguimiento de obra para transformar información dispersa en decisiones confiables de diseño, costo, plazo y construcción.',
      audience: 'Para mandantes, inmobiliarias, constructoras, concesionarias y equipos técnicos.',
      ctaPrimary: 'Solicitar diagnóstico de información',
      ctaWhatsapp: 'Habla por WhatsApp',
      kpis: [
        { value: '+2 MM m²', label: 'coordinados y documentados' },
        { value: '+10 años', label: 'experiencia en proyectos de obra' },
      ],
      distinctiveLabel: 'Information Management aplicado al ciclo completo del proyecto',
      points: [
        'Modelos federados e integrados, con Information Management como soporte operativo para diseñar, coordinar y decidir con trazabilidad real.',
        'Seguimiento de obra como objeto responsivo: contrastamos diseño y ejecución para ajustar decisiones con evidencia en terreno.',
        'Continuidad post-obra: estructuramos información para operación, uso del edificio y mejora continua en el tiempo.',
      ],
    },
    portfolio: {
      eyebrow: 'Portafolio',
      title: 'Proyectos',
      copy: '',
      loading: 'Cargando proyectos',
      empty: 'Todavía no hay proyectos publicados en esta categoría.',
      fallbackSummary: 'Proyecto gestionado por MI-STUDIO.',
      seeMore: 'Ver más',
      catalogTitle: 'Catálogo de proyectos',
      storyChallenge: 'Desafío',
      storyIntervention: 'Intervención',
      storyResult: 'Resultado',
    },
    servicesHome: {
      eyebrow: 'Servicios de Information Management',
      title: 'Menos interferencias, más control.',
      subtitle: 'Información que reduce costo, protege el plazo y mejora las decisiones.',
      membersLabel: 'Somos miembros de',
      clientsLabel: 'Nuestros clientes',
      problemLabel: 'Problema que resuelve',
      whenLabel: 'Cuándo contratarlo',
      deliverableLabel: 'Entregables',
      items: [
        {
          title: 'Arquitectura y Desarrollo Técnico',
          copy: 'Diseñamos y desarrollamos proyectos funcionales, construibles y documentados, alineando arquitectura, normativa, presupuesto e información crítica para avanzar con mayor certeza hacia aprobación, licitación y obra.',
          problem: 'Proyectos que llegan a obra con documentación inconsistente, cambios sin trazabilidad o desalineación entre diseño y presupuesto.',
          when: 'Desde etapas tempranas de diseño hasta el cierre de documentos para licitación o permisos.',
          deliverable: 'Planos coordinados, documentación técnica para aprobación o licitación y modelos coherentes con la realidad del proyecto.',
        },
        {
          title: 'BIM & Gestión de Información',
          copy: 'Estructuramos modelos, datos y documentos como una fuente confiable para coordinar especialidades, controlar cambios, mantener trazabilidad y tomar decisiones con evidencia.',
          problem: 'Información dispersa entre planos, correos y versiones distintas que genera retrabajo, errores y pérdida de control.',
          when: 'Cuando el proyecto involucra múltiples especialidades, etapas o actores que necesitan trabajar desde la misma información.',
          deliverable: 'Modelos BIM federados, CDE configurado, auditorías de modelo y reportes de trazabilidad para obra o licitación.',
        },
        {
          title: 'Coordinación y Seguimiento de Obra',
          copy: 'Integramos diseño, especialidades y obra para detectar interferencias, anticipar riesgos y contrastar avance físico, plazo y costos mediante modelos, datos, reportes y planificación 4D/5D.',
          problem: 'Interferencias detectadas en obra, retrasos por falta de coordinación temprana y pérdida de control entre lo proyectado y lo ejecutado.',
          when: 'Durante coordinación previa a licitación o en fases activas de construcción con múltiples especialidades.',
          deliverable: 'Reportes de interferencias, modelos coordinados, tableros de seguimiento 4D/5D y alertas de avance de obra.',
        },
        {
          title: 'Automatización y Flujos Digitales',
          copy: 'Diseñamos flujos, rutinas y herramientas digitales para reducir tareas repetitivas, mejorar consistencia de datos, acelerar revisiones y aumentar la capacidad operativa del equipo y del proyecto.',
          problem: 'Tareas manuales que consumen tiempo, errores por procesos sin estandarizar y equipos sin capacidad para escalar.',
          when: 'Cuando hay procesos repetitivos en modelado, documentación, revisión o reportería que pueden sistematizarse.',
          deliverable: 'Rutinas automatizadas, plantillas estandarizadas, scripts y flujos configurados para el stack tecnológico del equipo.',
        },
      ],
    },
    process: {
      eyebrow: 'Proceso',
      title: 'Una ruta de trabajo clara desde el diagnóstico hasta la obra',
      items: [
        { title: 'Diagnóstico', copy: 'Revisamos etapa, objetivos, especialidades, formatos y entregables necesarios. Identificamos brechas de información, definimos la estrategia de gestión de datos y establecemos los criterios de calidad del proyecto.' },
        { title: 'Modelado y federación', copy: 'Construimos o integramos modelos federados por especialidad, con Information Management como soporte operativo para diseñar, coordinar y decidir con trazabilidad real a lo largo del ciclo del proyecto.' },
        { title: 'Coordinación', copy: 'Detectamos interferencias, priorizamos conflictos y generamos reportes accionables. Realizamos seguimiento de obra como objeto responsivo: contrastamos diseño y ejecución para ajustar decisiones con evidencia en terreno.' },
        { title: 'Entrega y acompañamiento', copy: 'Documentamos decisiones y apoyamos la transición hacia licitación, obra o post-entrega. Estructuramos información para operación, uso del edificio y mejora continua en el tiempo.' },
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
      title: 'Lo que preguntan mandantes, constructoras e inmobiliarias antes de contratar',
      items: [
        {
          q: '¿Cuándo conviene contratar gestión de información?',
          a: 'Mientras antes, mayor impacto: reduce retrabajo, mejora coordinación temprana y evita errores que aparecen en obra. En proyectos ya iniciados también podemos entrar — auditamos el estado actual, ordenamos la información existente y continuamos desde donde está el equipo.',
        },
        {
          q: '¿Pueden integrarse con el proyecto ya en marcha o con modelos de terceros?',
          a: 'Sí. Trabajamos con modelos de cualquier plataforma o equipo, documentación existente y cualquier etapa del proyecto. Hacemos una revisión de estado (auditoría de información), definimos criterios de calidad y continuamos. No es necesario empezar desde cero ni cambiar de software.',
        },
        {
          q: '¿Qué diferencia hay entre modelado BIM, coordinación e Information Management?',
          a: 'El modelado genera geometría e información por especialidad. La coordinación integra esos modelos para detectar interferencias antes de obra. El Information Management es la capa que organiza, gobierna y hace útil toda esa información — para diseñar, decidir, contratar y operar. Sin IM, el modelo existe pero no necesariamente decide.',
        },
        {
          q: '¿Qué entregables recibe el cliente?',
          a: 'Depende del servicio, pero en general: modelos federados y coordinados, reportes de interferencias, planos para licitación o aprobación, tableros de seguimiento, documentación técnica y — si se requiere — estructuras de información para operación del edificio. Todo con trazabilidad sobre qué se decidió, cuándo y por qué.',
        },
        {
          q: '¿Qué es un CDE y para qué sirve en mi proyecto?',
          a: 'Un Common Data Environment es el entorno digital centralizado donde vive la información del proyecto: planos, modelos, documentos, revisiones y versiones. Evita que la información quede fragmentada en correos y carpetas sin orden. Configurado correctamente, reduce errores de versiones, mejora el control documental y deja trazabilidad sobre cada decisión del equipo.',
        },
        {
          q: '¿Qué es el seguimiento de obra y qué problema resuelve?',
          a: 'Es el proceso de contrastar lo proyectado con lo ejecutado en terreno. Actualizamos modelos y CDE según el avance real, generamos reportes comparativos y alertamos desviaciones de plazo y costo. El resultado: el mandante y el equipo toman decisiones con evidencia concreta, no con informes de avance subjetivos.',
        },
        {
          q: '¿Qué incluye la planificación 4D/5D?',
          a: '4D integra el modelo con la programación de obra: permite visualizar la secuencia constructiva, anticipar conflictos logísticos y ajustar el plazo antes de que ocurran en terreno. 5D agrega control de costos sobre esa secuencia. Juntos permiten contrastar avance físico, plazo y presupuesto desde una sola fuente de datos.',
        },
        {
          q: '¿Qué pasa con la información al terminar la obra?',
          a: 'Si la información se estructura correctamente desde el diseño, puede transformarse en una base de datos útil para operar, mantener y mejorar el edificio después de la entrega. Esto evita que el cliente reciba un modelo BIM que nadie puede usar. Preparamos esa transición hacia facility management o administración de activos cuando el proyecto lo requiere.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Cuéntanos en qué etapa está tu proyecto',
      copy: 'Completa el diagnóstico breve y te respondemos con una ruta preliminar de trabajo adaptada a tu situación.',
      responseTime: 'Respondemos en 24/48 horas hábiles.',
      confidentiality: 'La información que compartes es tratada con confidencialidad.',
      name: 'Nombre',
      email: 'Correo electrónico',
      stagePlaceholder: 'Etapa del proyecto',
      stages: ['Anteproyecto / Perfil', 'Diseño / Desarrollo', 'Licitación / Concurso', 'Construcción / Obra', 'Operación / Post-entrega', 'Otro'],
      typePlaceholder: 'Tipo de proyecto',
      types: ['Residencial', 'Comercial / Retail', 'Salud', 'Educacional', 'Infraestructura', 'Industrial / Logístico', 'Otro'],
      areaPlaceholder: 'Superficie aproximada',
      areas: ['Menos de 2.000 m²', '2.000 – 10.000 m²', '10.000 – 50.000 m²', 'Más de 50.000 m²', 'No definida'],
      hasBimPlaceholder: '¿Existe modelo BIM?',
      hasBimOptions: ['Sí, tenemos modelo', 'Parcialmente', 'No, partimos desde cero', 'No sé / Por definir'],
      servicePlaceholder: 'Servicio de interés',
      services: ['Diagnóstico de información', 'Coordinación BIM', 'Modelado BIM', 'Seguimiento de obra', 'Planificación 4D/5D', 'Automatización', 'Implementación BIM', 'Otro / No sé'],
      message: 'Comentarios adicionales (opcional)',
      submit: 'Solicitar diagnóstico de información',
      whatsapp: 'Respuesta inmediata por WhatsApp',
      downloadLabel: 'Guía: cómo diagnosticar riesgos de información en tu proyecto',
      downloadNote: 'Solicitar por correo',
      selectDefault: 'Seleccionar…',
    },
    pages: {
      projects: {
        eyebrow: 'Proyectos',
        title: 'Catálogo de proyectos',
        lead: 'Arquitectura, BIM, coordinación y seguimiento de obra aplicados a proyectos de alta exigencia técnica.',
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
        news: 'News',
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
      eyebrow: 'ARCHITECTURE · BIM · COORDINATION · CONSTRUCTION FOLLOW-UP',
      titleLine1: 'Data is the deliverable,',
      titleLine2: 'not only the model.',
      copy:
        'We integrate architecture, BIM, coordination, and construction follow-up to transform scattered information into reliable decisions on design, cost, schedule, and construction.',
      audience: 'For owners, developers, contractors, concessionaires, and technical teams.',
      ctaPrimary: 'Request an information diagnosis',
      ctaWhatsapp: 'Chat on WhatsApp',
      kpis: [
        { value: '+2M m²', label: 'coordinated and documented' },
        { value: '+10 years', label: 'experience in construction projects' },
      ],
      distinctiveLabel: 'Information Management applied across the full project lifecycle',
      points: [
        'Federated and integrated models, with Information Management as operational support to design, coordinate, and decide with real traceability.',
        'Construction follow-up as a responsive object: we compare design versus execution to adjust decisions with field evidence.',
        'Post-construction continuity: we structure information for operation, building use, and continuous improvement over time.',
      ],
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Projects',
      copy:
        'The catalog keeps the original visual language: model mosaic, category color logic, and informative card backs.',
      loading: 'Loading projects',
      empty: 'No published projects in this category yet.',
      fallbackSummary: 'Project managed by MI-STUDIO.',
      seeMore: 'See more',
      catalogTitle: 'Project catalog',
      storyChallenge: 'Challenge',
      storyIntervention: 'Intervention',
      storyResult: 'Result',
    },
    servicesHome: {
      eyebrow: 'Integrated Information Management services',
      title: 'Fewer clashes, more control.',
      subtitle: 'Information that reduces cost, protects the schedule, and improves decisions.',
      membersLabel: 'We are members of',
      clientsLabel: 'Our clients',
      problemLabel: 'Problem it solves',
      whenLabel: 'When to engage',
      deliverableLabel: 'Deliverables',
      items: [
        {
          title: 'Architecture & Technical Development',
          copy: 'We design and develop functional, buildable, and documented projects, aligning architecture, regulations, budget, and critical information to advance with greater certainty toward permitting, tendering, and construction.',
          problem: 'Projects that reach construction with inconsistent documentation, untracked changes, or misalignment between design and budget.',
          when: 'From early design stages through document closeout for tendering or permits.',
          deliverable: 'Coordinated drawings, technical documentation for approvals or tendering, and models consistent with project reality.',
        },
        {
          title: 'BIM & Information Management',
          copy: 'We structure models, data, and documents as a reliable source to coordinate disciplines, control changes, maintain traceability, and make evidence-based decisions.',
          problem: 'Information scattered across drawings, emails, and conflicting versions, generating rework, errors, and loss of control.',
          when: 'When a project involves multiple disciplines, phases, or stakeholders who need to work from the same information.',
          deliverable: 'Federated BIM models, configured CDE, model audits, traceability reports, and deliverables for construction or tendering.',
        },
        {
          title: 'Coordination & Construction Follow-up',
          copy: 'We integrate design, disciplines, and construction to detect clashes, anticipate risks, and compare physical progress, schedule, and costs through models, data, reports, and 4D/5D planning.',
          problem: 'Clashes detected on site, delays from lack of early coordination, and loss of control between design intent and actual execution.',
          when: 'During pre-tender coordination or in active construction phases with multiple disciplines.',
          deliverable: 'Clash reports, coordinated discipline models, 4D/5D progress dashboards, and construction alerts.',
        },
        {
          title: 'Automation & Digital Workflows',
          copy: 'We design workflows, routines, and digital tools to reduce repetitive tasks, improve data consistency, accelerate reviews, and expand the operational capacity of teams and projects.',
          problem: 'Manual tasks consuming time, errors from non-standardized processes, and teams without the capacity to scale.',
          when: 'When there are repetitive processes in modeling, documentation, review, or reporting that can be systematized.',
          deliverable: 'Automated routines, standardized templates, scripts, and configured workflows for the team\'s technology stack.',
        },
      ],
    },
    process: {
      eyebrow: 'Process',
      title: 'A clear workflow from diagnosis to construction',
      items: [
        { title: 'Diagnosis', copy: 'We review stage, goals, disciplines, formats, and required deliverables. We identify information gaps, define the data management strategy, and establish quality criteria for the project.' },
        { title: 'Modeling and federation', copy: 'We build or integrate federated models by discipline, with Information Management as operational support to design, coordinate, and decide with real traceability throughout the project lifecycle.' },
        { title: 'Coordination', copy: 'We detect clashes, prioritize conflicts, and issue actionable reports. We carry out construction follow-up as a responsive object: comparing design versus execution to adjust decisions with field evidence.' },
        { title: 'Delivery and support', copy: 'We document decisions and support transition to tendering, construction, or post-delivery. We structure information for operation, building use, and continuous improvement over time.' },
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
      title: 'What owners, contractors, and developers ask before engaging',
      items: [
        {
          q: 'When is the right time to bring in Information Management?',
          a: 'The earlier, the greater the impact: it reduces rework costs, improves early coordination, and prevents errors that would otherwise surface on site. We can also join projects already underway — we audit the current information state, organize existing data, and continue from where the team is. No need to start from scratch.',
        },
        {
          q: 'Can you work with an ongoing project or third-party models?',
          a: 'Yes. We work with models from any platform or team, existing documentation, and any project stage. We run an information audit, set quality criteria, and continue. We do not require ownership of the original files to add value.',
        },
        {
          q: 'What is the difference between BIM modeling, coordination, and Information Management?',
          a: 'Modeling generates geometry and data per discipline. Coordination integrates those models to detect clashes before construction. Information Management is the layer that organizes, governs, and makes all that information useful — for design, decisions, procurement, and operations. Without IM, the model exists but does not necessarily drive decisions.',
        },
        {
          q: 'What deliverables does the client receive?',
          a: 'It depends on the service, but typically: federated and coordinated models, clash reports, drawings for tendering or approval, progress dashboards, technical documentation, and — when required — information structures for building operations. Everything with traceability on what was decided, when, and why.',
        },
        {
          q: 'What is a CDE and why does my project need one?',
          a: 'A Common Data Environment is the centralized digital space where all project information lives: drawings, models, documents, reviews, and version history. It prevents information from being scattered across emails and unstructured folders. Properly configured, it reduces version errors, improves document control, and creates a traceable record of every team decision.',
        },
        {
          q: 'What is construction follow-up and what problem does it solve?',
          a: 'It is the process of comparing what was designed with what is actually being built on site. We update models and the CDE based on real progress, generate comparative reports, and flag schedule and cost deviations. The result: the owner and team make decisions with concrete evidence, not subjective progress reports.',
        },
        {
          q: 'What does 4D/5D planning include?',
          a: '4D links the model with the construction schedule: it visualizes the build sequence, anticipates logistics conflicts, and allows schedule adjustments before they become site problems. 5D adds cost control to that sequence. Together, they allow comparing physical progress, schedule, and budget from a single data source.',
        },
        {
          q: 'What happens to the information after construction is complete?',
          a: 'If information is structured correctly from design, it becomes a useful database for operating, maintaining, and improving the building after handover. This prevents the client from receiving a BIM model that no one can use. We prepare that transition to facility management or asset administration when the project requires it.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Tell us what stage your project is in',
      copy: 'Complete the brief diagnosis and we will reply with a preliminary work route tailored to your situation.',
      responseTime: 'We respond within 24/48 business hours.',
      confidentiality: 'The information you share is treated with full confidentiality.',
      name: 'Name',
      email: 'Email address',
      stagePlaceholder: 'Project stage',
      stages: ['Pre-design / Brief', 'Design / Development', 'Tendering / Competition', 'Construction / Site', 'Operations / Post-handover', 'Other'],
      typePlaceholder: 'Project type',
      types: ['Residential', 'Commercial / Retail', 'Healthcare', 'Education', 'Infrastructure', 'Industrial / Logistics', 'Other'],
      areaPlaceholder: 'Approximate area',
      areas: ['Under 2,000 m²', '2,000 – 10,000 m²', '10,000 – 50,000 m²', 'Over 50,000 m²', 'Not defined'],
      hasBimPlaceholder: 'Does a BIM model exist?',
      hasBimOptions: ['Yes, we have a model', 'Partially', 'No, starting from scratch', 'Not sure / To be defined'],
      servicePlaceholder: 'Service of interest',
      services: ['Information diagnosis', 'BIM Coordination', 'BIM Modeling', 'Construction follow-up', '4D/5D Planning', 'Automation', 'BIM Implementation', 'Other / Not sure'],
      message: 'Additional comments (optional)',
      submit: 'Request information diagnosis',
      whatsapp: 'Quick reply via WhatsApp',
      downloadLabel: 'Guide: how to diagnose information risks in your project',
      downloadNote: 'Request by email',
      selectDefault: 'Select…',
    },
    pages: {
      projects: {
        eyebrow: 'Projects',
        title: 'Project catalog',
        lead: 'Architecture, BIM, coordination and construction follow-up applied to technically demanding projects.',
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


