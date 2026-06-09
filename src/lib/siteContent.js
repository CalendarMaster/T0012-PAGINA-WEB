const SERVICES_BIM_DETAILS_ES = [
  {
    id: 'gerenciamiento-proyecto',
    category: 'bim',
    title: 'Gerenciamiento de Proyecto',
    tagline: 'Control estratégico',
    description:
      'Lideramos proyectos desde una visión integral, articulando equipos, información, plazos, costos y objetivos mediante una estructura colaborativa de trabajo. Nuestro foco es anticipar desviaciones, ordenar decisiones críticas y mantener trazabilidad entre diseño, coordinación, licitación, construcción y operación.',
    when:
      'Cuando el proyecto requiere control estratégico, coordinación entre múltiples actores o una contraparte técnica que ordene la información para decidir.',
    deliverables:
      'Ruta de trabajo, matriz de responsabilidades, reportes de avance, control de acuerdos, seguimiento de riesgos, coordinación de equipos y recomendaciones ejecutivas.',
  },
  {
    id: 'diseno',
    category: 'arquitectura',
    title: 'Diseño',
    tagline: 'Arquitectura y desarrollo técnico',
    description:
      'Desarrollamos diseño arquitectónico y técnico con foco en funcionalidad, constructibilidad, normativa, presupuesto e información útil para la toma de decisiones. Integramos criterios espaciales, operacionales y técnicos desde etapas tempranas para reducir indefiniciones y mejorar la continuidad hacia documentación, coordinación y obra.',
    when:
      'Cuando el proyecto requiere transformar una idea, requerimiento o programa en una solución arquitectónica viable, coordinable y documentable.',
    deliverables:
      'Anteproyecto, desarrollo arquitectónico, criterios técnicos, modelos de diseño, documentación base, imágenes de validación y coordinación con especialidades.',
  },
  {
    id: 'modelado',
    category: ['bim', 'arquitectura'],
    title: 'Modelado de Información',
    tagline: 'Base de información',
    description:
      'Desarrollamos modelos BIM por disciplina o integramos modelos existentes para centralizar información crítica del proyecto. No entendemos el modelo como un fin en sí mismo, sino como una base de datos útil para coordinar, cuantificar, documentar, revisar y tomar decisiones. El modelo entrega datos estructurados, no solo geometría.',
    when:
      'Cuando el proyecto necesita información estructurada, modelos confiables, integración de especialidades o una base técnica para coordinación, licitación u obra.',
    deliverables:
      'Modelos BIM, parámetros estructurados, modelos federados, reportes de revisión, extracción de datos, cuantificaciones y documentación asociada.',
  },
  {
    id: 'coordinacion',
    category: ['coordinacion', 'bim'],
    title: 'Coordinación de Información',
    tagline: 'Reducción de interferencias',
    description:
      'Coordinamos arquitectura, estructura, instalaciones y especialidades para detectar interferencias, priorizar conflictos y proponer soluciones antes de que lleguen a obra. La coordinación se basa en información trazable, modelos federados o integrados, reportes accionables y reuniones orientadas a resolver decisiones técnicas.',
    when:
      'Cuando existen múltiples especialidades, riesgo de interferencias, modelos desarrollados por terceros o necesidad de asegurar constructibilidad antes de licitar o construir.',
    deliverables:
      'Matriz de interferencias, reportes de coordinación, modelos federados, actas de acuerdos, propuestas de solución, control de pendientes y trazabilidad de decisiones.',
  },
  {
    id: 'simulacion',
    category: 'coordinacion',
    title: 'Simulación',
    tagline: 'Validación de escenarios',
    description:
      'Aplicamos simulaciones para evaluar escenarios de diseño, operación, secuencia constructiva, desempeño y uso del proyecto. Esto permite comparar alternativas antes de ejecutar, reduciendo incertidumbre y mejorando decisiones de costo, plazo, operación y sostenibilidad.',
    when:
      'Cuando el proyecto necesita validar alternativas, anticipar impactos o justificar decisiones técnicas frente a mandantes, usuarios o equipos de obra.',
    deliverables:
      'Modelos de simulación, análisis comparativos, reportes gráficos, escenarios evaluados y recomendaciones técnicas.',
  },
  {
    id: 'evaluacion',
    category: 'arquitectura',
    title: 'Evaluación',
    tagline: 'Diagnóstico técnico',
    description:
      'Evaluamos proyectos desde dimensiones técnicas, económicas, normativas y operacionales para entregar una visión objetiva antes de tomar decisiones críticas. Nuestra evaluación permite detectar brechas, riesgos, oportunidades de mejora y criterios de priorización para avanzar con mayor certeza.',
    when:
      'Cuando se necesita revisar la factibilidad, calidad técnica, consistencia documental, constructibilidad o estado de información de un proyecto.',
    deliverables:
      'Informe de diagnóstico, matriz de riesgos, revisión normativa, evaluación técnica, recomendaciones priorizadas y ruta de acción.',
  },
  {
    id: 'documentacion',
    category: 'arquitectura',
    title: 'Documentación Técnica',
    tagline: 'Documentación para obra',
    description:
      'Generamos documentación técnica consistente a partir de modelos coordinados e información validada. Nuestro objetivo es reducir errores, mantener trazabilidad entre modelo y planos, y acelerar procesos de revisión, aprobación, licitación y construcción.',
    when:
      'Cuando el proyecto requiere planos, entregables técnicos, expedientes de aprobación, documentación para licitación o información clara para obra.',
    deliverables:
      'Planos, láminas, detalles, especificaciones de apoyo, reportes, documentación para aprobación, licitación o construcción.',
  },
  {
    id: 'programacion',
    category: 'coordinacion',
    title: 'Programación 4D/5D',
    tagline: 'Plazo y costo integrados',
    description:
      'Integramos planificación temporal y financiera con modelos digitales para visualizar secuencias constructivas, anticipar conflictos y analizar impactos en plazo y costo. La programación 4D/5D permite conectar diseño, obra, logística, avance físico y presupuesto en una base común de información.',
    when:
      'Cuando el proyecto requiere planificar etapas, visualizar avances, comparar escenarios o vincular información de modelo con plazo y costo.',
    deliverables:
      'Modelo 4D, secuencia constructiva, reportes de avance, vinculación modelo-programa, cuantificaciones base y análisis 5D.',
  },
  {
    id: 'visualizacion',
    category: 'arquitectura',
    title: 'Visualización',
    tagline: 'Comunicación del proyecto',
    description:
      'Desarrollamos imágenes, videos y recorridos digitales para comunicar el proyecto a públicos técnicos y no técnicos. La visualización ayuda a validar decisiones, explicar soluciones, apoyar procesos comerciales y facilitar la comprensión del diseño antes de construir.',
    when:
      'Cuando el proyecto requiere comunicar valor, validar diseño, apoyar ventas, presentar ante mandantes o explicar decisiones complejas.',
    deliverables:
      'Imágenes, videos, recorridos virtuales, piezas para presentación, material de venta y visualizaciones de coordinación.',
  },
  {
    id: 'seguimiento-obra',
    category: 'coordinacion',
    title: 'Seguimiento en Obra',
    tagline: 'Control de ejecución',
    description:
      'Acompañamos la ejecución mediante modelos, CDE, reportes y control de información para contrastar lo proyectado con lo ejecutado. Monitoreamos avances, desviaciones, cambios y requerimientos de obra para mantener continuidad entre diseño, coordinación y construcción.',
    when:
      'Cuando la obra necesita información confiable, control de cambios, seguimiento técnico o soporte BIM permanente durante la ejecución (modelo As Built).',
    deliverables:
      'Reportes de avance, actualización de modelos As Built, control de observaciones, seguimiento de cambios, administración de información y soporte técnico a obra.',
  },
  {
    id: 'facility-management',
    category: 'bim',
    title: 'Facility Management',
    tagline: 'Continuidad post-entrega',
    description:
      'Preparamos modelos, datos y estructuras de información para que el activo pueda ser operado, mantenido y actualizado después de la entrega. Convertimos la información generada durante diseño y construcción en una base útil para operación, mantenimiento y gestión futura.',
    when:
      'Cuando el mandante necesita continuidad de información post-entrega, operación eficiente o integración del modelo con procesos de mantenimiento.',
    deliverables:
      'Modelo para operación, estructura de datos, fichas de activos, parámetros FM, documentación organizada y criterios de actualización.',
  },
  {
    id: 'implementacion',
    category: ['bim', 'arquitectura'],
    title: 'Implementación BIM / IM',
    tagline: 'Adopción BIM',
    description:
      'Acompañamos a empresas y equipos en la adopción de BIM e Information Management con foco en resultados, eficiencia y autonomía. Diseñamos procesos, estándares, roles, flujos y estructuras de información adaptadas al contexto real de cada organización o proyecto.',
    when:
      'Cuando una empresa necesita ordenar su forma de trabajar, implementar estándares, mejorar coordinación o profesionalizar su gestión de información.',
    deliverables:
      'Diagnóstico, plan de implementación, estándares BIM, protocolos de información, plantillas, capacitaciones y acompañamiento.',
  },
  {
    id: 'administracion-cde',
    category: ['bim', 'coordinacion'],
    title: 'Administración de CDE',
    tagline: 'Trazabilidad documental',
    description:
      'Configuramos y administramos entornos comunes de datos para ordenar la información del proyecto, controlar versiones, permisos, flujos y trazabilidad documental. El CDE permite que equipos, mandantes y especialistas trabajen sobre información organizada, segura y actualizada.',
    when:
      'Cuando el proyecto tiene múltiples actores, documentos dispersos, versiones conflictivas o necesidad de trazabilidad formal.',
    deliverables:
      'Estructura CDE, permisos, flujos de revisión, nomenclaturas, carpetas, reportes, control documental y soporte a usuarios.',
  },
  {
    id: 'automatizacion',
    category: ['automatizacion', 'arquitectura', 'bim', 'coordinacion'],
    title: 'Automatización de Procesos',
    tagline: 'Capacidad operativa',
    description:
      'Diseñamos rutinas, scripts, flujos y herramientas digitales para reducir tareas repetitivas, mejorar consistencia de datos y acelerar procesos de revisión, modelado, coordinación y reportabilidad. La automatización permite aumentar la capacidad operativa del equipo, reducir errores manuales y transformar datos del proyecto en información accionable.',
    when:
      'Cuando existen procesos repetitivos, revisión manual de información, extracción recurrente de datos o necesidad de reportes más rápidos y confiables.',
    deliverables:
      'Scripts, rutinas Dynamo/Python, automatización de reportes, extracción de datos, validadores, dashboards y flujos personalizados.',
  },
]

const SERVICES_BIM_DETAILS_EN = [
  {
    id: 'gerenciamiento-proyecto',
    category: 'bim',
    title: 'Project Management',
    tagline: 'Strategic control',
    description:
      'We lead projects from a strategic perspective, coordinating teams, information, timelines, costs, and goals through a collaborative work structure. Our focus is anticipating deviations, ordering critical decisions, and maintaining traceability across design, coordination, tender, construction, and operations.',
    when:
      'When the project requires strategic control, coordination between multiple stakeholders, or a technical counterpart to organize information for decision-making.',
    deliverables:
      'Work roadmap, responsibility matrix, progress reports, agreement tracking, risk monitoring, team coordination, and executive recommendations.',
  },
  {
    id: 'diseno',
    category: 'arquitectura',
    title: 'Design',
    tagline: 'Architecture & technical development',
    description:
      'We develop architectural and technical design focused on functionality, constructability, regulations, budget, and information useful for decision-making. We integrate spatial, operational, and technical criteria from early stages to reduce ambiguities and improve continuity toward documentation, coordination, and construction.',
    when:
      'When the project needs to transform an idea, brief, or program into a viable, coordinable, and documentable architectural solution.',
    deliverables:
      'Concept design, architectural development, technical criteria, design models, base documentation, validation visuals, and specialist coordination.',
  },
  {
    id: 'modelado',
    category: ['bim', 'arquitectura'],
    title: 'Information Modeling',
    tagline: 'Information base',
    description:
      'We develop BIM models by discipline or integrate existing models to centralize critical project information. We do not treat the model as an end in itself, but as a useful database for coordinating, quantifying, documenting, reviewing, and making decisions. The model delivers structured data, not just geometry.',
    when:
      'When the project needs structured information, reliable models, specialist integration, or a technical base for coordination, tendering, or construction.',
    deliverables:
      'BIM models, structured parameters, federated models, review reports, data extraction, quantity take-offs, and associated documentation.',
  },
  {
    id: 'coordinacion',
    category: ['coordinacion', 'bim'],
    title: 'Information Coordination',
    tagline: 'Clash reduction',
    description:
      'We coordinate architecture, structure, MEP, and specialties to detect clashes, prioritize conflicts, and propose solutions before they reach the construction site. Coordination is based on traceable information, federated or integrated models, actionable reports, and meetings focused on resolving technical decisions.',
    when:
      'When multiple specialties exist, there is clash risk, third-party models are involved, or constructability needs to be confirmed before tendering or building.',
    deliverables:
      'Clash matrix, coordination reports, federated models, agreement minutes, resolution proposals, pending item tracking, and decision traceability.',
  },
  {
    id: 'simulacion',
    category: 'coordinacion',
    title: 'Simulation',
    tagline: 'Scenario validation',
    description:
      'We apply simulations to evaluate design scenarios, operational flows, construction sequences, performance, and project use. This allows comparing alternatives before execution, reducing uncertainty and improving decisions on cost, schedule, operations, and sustainability.',
    when:
      'When the project needs to validate alternatives, anticipate impacts, or justify technical decisions before owners, users, or construction teams.',
    deliverables:
      'Simulation models, comparative analyses, graphic reports, evaluated scenarios, and technical recommendations.',
  },
  {
    id: 'evaluacion',
    category: 'arquitectura',
    title: 'Evaluation',
    tagline: 'Technical assessment',
    description:
      'We evaluate projects across technical, economic, regulatory, and operational dimensions to provide an objective view before critical decisions are made. Our evaluation identifies gaps, risks, improvement opportunities, and prioritization criteria to move forward with greater certainty.',
    when:
      'When there is a need to review feasibility, technical quality, document consistency, constructability, or the information state of a project.',
    deliverables:
      'Diagnostic report, risk matrix, regulatory review, technical evaluation, prioritized recommendations, and action roadmap.',
  },
  {
    id: 'documentacion',
    category: 'arquitectura',
    title: 'Technical Documentation',
    tagline: 'Construction-ready documents',
    description:
      'We generate consistent technical documentation from coordinated models and validated information. Our goal is to reduce errors, maintain traceability between model and drawings, and accelerate review, approval, tendering, and construction processes.',
    when:
      'When the project requires drawings, technical deliverables, approval packages, tender documentation, or clear information for construction.',
    deliverables:
      'Drawings, sheets, details, supporting specifications, reports, documentation for approval, tender, or construction.',
  },
  {
    id: 'programacion',
    category: 'coordinacion',
    title: '4D/5D Planning',
    tagline: 'Schedule & cost integrated',
    description:
      'We integrate schedule and cost planning with digital models to visualize construction sequences, anticipate conflicts, and analyze schedule and cost impacts. 4D/5D planning connects design, construction, logistics, physical progress, and budget on a common information base.',
    when:
      'When the project needs to plan phases, visualize progress, compare scenarios, or link model information with schedule and cost.',
    deliverables:
      '4D model, construction sequence, progress reports, model-schedule linkage, base quantities, and 5D analysis.',
  },
  {
    id: 'visualizacion',
    category: 'arquitectura',
    title: 'Visualization',
    tagline: 'Project communication',
    description:
      'We develop images, videos, and digital walkthroughs to communicate the project to technical and non-technical audiences. Visualization helps validate decisions, explain solutions, support commercial processes, and aid understanding of design before construction.',
    when:
      'When the project needs to communicate value, validate design, support sales, present to owners, or explain complex decisions.',
    deliverables:
      'Images, videos, virtual walkthroughs, presentation materials, sales assets, and coordination visuals.',
  },
  {
    id: 'seguimiento-obra',
    category: 'coordinacion',
    title: 'Construction Follow-up',
    tagline: 'Execution control',
    description:
      'We support execution through models, CDE, reports, and information control to compare what was designed with what is being built. We monitor progress, deviations, changes, and construction requirements to maintain continuity between design, coordination, and construction.',
    when:
      'When the project needs reliable information, change control, technical follow-up, or permanent BIM support during execution (As Built model).',
    deliverables:
      'Progress reports, As Built model updates, observation tracking, change control, information management, and technical support on site.',
  },
  {
    id: 'facility-management',
    category: 'bim',
    title: 'Facility Management',
    tagline: 'Post-delivery continuity',
    description:
      'We prepare models, data, and information structures so the asset can be operated, maintained, and updated after handover. We convert information generated during design and construction into a useful base for operations, maintenance, and future management.',
    when:
      'When the owner needs information continuity post-delivery, efficient operation, or model integration with maintenance processes.',
    deliverables:
      'Operations model, data structure, asset sheets, FM parameters, organized documentation, and update criteria.',
  },
  {
    id: 'implementacion',
    category: ['bim', 'arquitectura'],
    title: 'BIM / IM Implementation',
    tagline: 'BIM adoption',
    description:
      'We support companies and teams in adopting BIM and Information Management with a focus on outcomes, efficiency, and autonomy. We design processes, standards, roles, workflows, and information structures adapted to each organization or project context.',
    when:
      'When a company needs to organize its workflows, implement standards, improve coordination, or professionalize its information management.',
    deliverables:
      'Diagnostic, implementation plan, BIM standards, information protocols, templates, training, and ongoing support.',
  },
  {
    id: 'administracion-cde',
    category: ['bim', 'coordinacion'],
    title: 'CDE Administration',
    tagline: 'Document traceability',
    description:
      'We configure and manage common data environments to organize project information, control versions, permissions, workflows, and document traceability. The CDE allows teams, owners, and specialists to work from organized, secure, and up-to-date information.',
    when:
      'When the project has multiple stakeholders, scattered documents, conflicting versions, or a need for formal traceability.',
    deliverables:
      'CDE structure, permissions, review workflows, naming conventions, folders, reports, document control, and user support.',
  },
  {
    id: 'automatizacion',
    category: ['automatizacion', 'arquitectura', 'bim', 'coordinacion'],
    title: 'Process Automation',
    tagline: 'Operational capacity',
    description:
      'We design routines, scripts, workflows, and digital tools to reduce repetitive tasks, improve data consistency, and accelerate review, modeling, coordination, and reporting processes. Automation increases team operational capacity, reduces manual errors, and transforms project data into actionable information.',
    when:
      'When repetitive processes exist, manual information review is required, data extraction is recurring, or faster and more reliable reports are needed.',
    deliverables:
      'Scripts, Dynamo/Python routines, report automation, data extraction, validators, dashboards, and custom workflows.',
  },
]

const ABOUT_CONTENT_ES = {
  history:
    'Nacimos desde la práctica de arquitectura, ingeniería y construcción para resolver una brecha concreta: proyectos con gran esfuerzo técnico, pero con información fragmentada para decidir. Evolucionamos hacia un enfoque de Information Management donde cada etapa deja trazabilidad, continuidad y valor operativo para el cliente.',
  mission:
    '"Optimizar los procesos y mejorar la toma de decisiones, entregando soluciones integrales y personalizadas maximizando el valor para nuestros clientes."',
  vision:
    '"Ser reconocidos como líderes en la industria de la construcción, transformando la forma en que se desarrollan los proyectos a través de la implementación de tecnologías de vanguardia y la generación de modelos de información que permitan una gestión eficiente y colaborativa. Conectamos los mundos de la arquitectura, la ingeniería y la construcción (AEC) con la tecnología."',
  values: [
    {
      title: 'Excelencia',
      description:
        'Buscamos la perfección en cada etapa del proyecto, desde el diseño hasta la ejecución, asegurando la calidad y la satisfacción del cliente.',
    },
    {
      title: 'Innovación',
      description:
        'Estamos comprometidos con la adopción de nuevas tecnologías y metodologías que permitan mejorar continuamente nuestros servicios.',
    },
    {
      title: 'Colaboración',
      description:
        'Fomentamos el trabajo en equipo y la comunicación abierta con todos los actores involucrados en el proyecto.',
    },
    {
      title: 'Transparencia',
      description:
        'Garantizamos la claridad y la accesibilidad de la información, facilitando la toma de decisiones y la gestión del proyecto.',
    },
    {
      title: 'Adaptabilidad',
      description:
        'Somos flexibles y nos adaptamos a las necesidades cambiantes de nuestros clientes y a los desafíos propios de cada proyecto y entorno.',
    },
  ],
  team:
    'Equipo colaborativo multidisciplinario enfocado en arquitectura, ingeniería, coordinación de información y gestión documental para proyectos de alta exigencia técnica.',
}

const ABOUT_CONTENT_EN = {
  history:
    'We were born from architecture, engineering, and construction practice to solve a concrete gap: technically demanding projects with fragmented information for decision-making. We evolved toward an Information Management approach where every stage creates traceability, continuity, and long-term operational value for the client.',
  mission:
    'Optimize processes and improve decision-making by delivering integrated and tailored solutions that maximize value for our clients.',
  vision:
    'To be recognized as leaders in the construction industry, transforming how projects are developed through advanced technologies and information models that enable efficient and collaborative management.',
  values: [
    {
      title: 'Excellence',
      description:
        'We seek excellence at every project stage, from design to execution, ensuring quality and client satisfaction.',
    },
    {
      title: 'Innovation',
      description:
        'We are committed to adopting new technologies and methodologies that continuously improve our services.',
    },
    {
      title: 'Collaboration',
      description:
        'We promote teamwork and open communication among all project stakeholders.',
    },
    {
      title: 'Transparency',
      description:
        'We ensure clarity and accessibility of information, enabling better decisions and project management.',
    },
    {
      title: 'Adaptability',
      description:
        'We are flexible and adapt to changing client needs and the specific challenges of each project and context.',
    },
  ],
  team:
    'A multidisciplinary collaborative team focused on architecture, engineering, information coordination, and information management for high-demand technical projects.',
}

export const SERVICES_BIM_DETAILS = SERVICES_BIM_DETAILS_ES
export const ABOUT_CONTENT = ABOUT_CONTENT_ES

export function getServicesBimDetails(lang = 'es') {
  return lang === 'en' ? SERVICES_BIM_DETAILS_EN : SERVICES_BIM_DETAILS_ES
}

export function getAboutContent(lang = 'es') {
  return lang === 'en' ? ABOUT_CONTENT_EN : ABOUT_CONTENT_ES
}
