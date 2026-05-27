export const PROJECT_CATEGORY_OPTIONS = [
  { value: 'bim_proyecto', label: 'Diseno - En Proyecto' },
  { value: 'bim_ejecutado', label: 'Diseno - Ejecutado' },
  { value: 'gestion_proyecto', label: 'Gestion - En Proyecto' },
  { value: 'gestion_ejecutado', label: 'Gestion - Ejecutado' },
]

const PROJECT_CATEGORY_OPTIONS_EN = [
  { value: 'bim_proyecto', label: 'Design - In Design' },
  { value: 'bim_ejecutado', label: 'Design - Built' },
  { value: 'gestion_proyecto', label: 'Management - In Design' },
  { value: 'gestion_ejecutado', label: 'Management - Built' },
]

const LEGACY_CATEGORY_ALIASES = {
  arquitectura_diseno: 'bim_proyecto',
  arquitectura_proyecto: 'bim_proyecto',
  arquitectura_ejecutado: 'bim_ejecutado',
}

export const PROJECT_DESTINATION_OPTIONS = [
  { value: 'almacenamiento', label: 'Almacenamiento' },
  { value: 'comercio', label: 'Comercio' },
  { value: 'educacional', label: 'Educacional' },
  { value: 'espacio_publico', label: 'Espacio Publico' },
  { value: 'habitacional', label: 'Habitacional' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'infraestructura', label: 'Infraestructura' },
  { value: 'retail', label: 'Retail' },
  { value: 'salud', label: 'Salud' },
]

const PROJECT_DESTINATION_OPTIONS_EN = [
  { value: 'almacenamiento', label: 'Storage' },
  { value: 'comercio', label: 'Commerce' },
  { value: 'educacional', label: 'Education' },
  { value: 'espacio_publico', label: 'Public Space' },
  { value: 'habitacional', label: 'Residential' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'infraestructura', label: 'Infrastructure' },
  { value: 'retail', label: 'Retail' },
  { value: 'salud', label: 'Health' },
]

export const PROJECT_FILTERS = [
  { value: 'all', label: 'Todos' },
  ...PROJECT_CATEGORY_OPTIONS,
]

const PROJECT_DESTINATION_FILTERS = [
  { value: 'all', label: 'Todos los destinos' },
  ...PROJECT_DESTINATION_OPTIONS,
]

const PROJECT_CATEGORY_LABELS = PROJECT_CATEGORY_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.label
  return acc
}, {})

const PROJECT_CATEGORY_LABELS_EN = PROJECT_CATEGORY_OPTIONS_EN.reduce((acc, item) => {
  acc[item.value] = item.label
  return acc
}, {})

const PROJECT_DESTINATION_LABELS = PROJECT_DESTINATION_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.label
  return acc
}, {})

const PROJECT_DESTINATION_LABELS_EN = PROJECT_DESTINATION_OPTIONS_EN.reduce((acc, item) => {
  acc[item.value] = item.label
  return acc
}, {})

export function normalizeProjectCategory(category) {
  return LEGACY_CATEGORY_ALIASES[category] || category
}

export function normalizeProjectDestination(destination) {
  if (!destination) return ''
  const normalized = destination
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')

  return PROJECT_DESTINATION_LABELS[normalized] ? normalized : ''
}

export function getProjectFilters(lang = 'es') {
  if (lang === 'en') {
    return [{ value: 'all', label: 'All' }, ...PROJECT_CATEGORY_OPTIONS_EN]
  }

  return PROJECT_FILTERS
}

export function getProjectDestinationFilters(lang = 'es') {
  if (lang === 'en') {
    return [{ value: 'all', label: 'All destinations' }, ...PROJECT_DESTINATION_OPTIONS_EN]
  }

  return PROJECT_DESTINATION_FILTERS
}

export function getProjectCategoryLabel(category, lang = 'es') {
  const normalizedCategory = normalizeProjectCategory(category)

  if (lang === 'en') {
    return PROJECT_CATEGORY_LABELS_EN[normalizedCategory] || 'Project'
  }

  return PROJECT_CATEGORY_LABELS[normalizedCategory] || 'Proyecto'
}

export function getProjectDestinationLabel(destination, lang = 'es') {
  const normalizedDestination = normalizeProjectDestination(destination)
  if (!normalizedDestination) return lang === 'en' ? 'Unspecified destination' : 'Destino no especificado'

  if (lang === 'en') {
    return PROJECT_DESTINATION_LABELS_EN[normalizedDestination] || 'Destination'
  }

  return PROJECT_DESTINATION_LABELS[normalizedDestination] || 'Destino'
}