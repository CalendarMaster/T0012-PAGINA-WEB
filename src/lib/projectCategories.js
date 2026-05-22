export const PROJECT_CATEGORY_OPTIONS = [
  { value: 'bim_proyecto', label: 'BIM - En Proyecto' },
  { value: 'bim_ejecutado', label: 'BIM - Ejecutado' },
  { value: 'gestion_proyecto', label: 'Gestion - En Proyecto' },
  { value: 'gestion_ejecutado', label: 'Gestion - Ejecutado' },
]

const PROJECT_CATEGORY_OPTIONS_EN = [
  { value: 'bim_proyecto', label: 'BIM - In Design' },
  { value: 'bim_ejecutado', label: 'BIM - Built' },
  { value: 'gestion_proyecto', label: 'Management - In Design' },
  { value: 'gestion_ejecutado', label: 'Management - Built' },
]

export const PROJECT_FILTERS = [
  { value: 'all', label: 'Todos' },
  ...PROJECT_CATEGORY_OPTIONS,
]

const PROJECT_CATEGORY_LABELS = PROJECT_CATEGORY_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.label
  return acc
}, {})

const PROJECT_CATEGORY_LABELS_EN = PROJECT_CATEGORY_OPTIONS_EN.reduce((acc, item) => {
  acc[item.value] = item.label
  return acc
}, {})

export function getProjectFilters(lang = 'es') {
  if (lang === 'en') {
    return [{ value: 'all', label: 'All' }, ...PROJECT_CATEGORY_OPTIONS_EN]
  }

  return PROJECT_FILTERS
}

export function getProjectCategoryLabel(category, lang = 'es') {
  if (lang === 'en') {
    return PROJECT_CATEGORY_LABELS_EN[category] || 'Project'
  }

  return PROJECT_CATEGORY_LABELS[category] || 'Proyecto'
}