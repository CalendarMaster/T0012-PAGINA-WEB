export const PROJECT_CATEGORY_OPTIONS = [
  { value: 'bim_proyecto', label: 'BIM - En Proyecto' },
  { value: 'bim_ejecutado', label: 'BIM - Ejecutado' },
  { value: 'gestion_proyecto', label: 'Gestion - En Proyecto' },
  { value: 'gestion_ejecutado', label: 'Gestion - Ejecutado' },
]

export const PROJECT_FILTERS = [
  { value: 'all', label: 'Todos' },
  ...PROJECT_CATEGORY_OPTIONS,
]

const PROJECT_CATEGORY_LABELS = PROJECT_CATEGORY_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.label
  return acc
}, {})

export function getProjectCategoryLabel(category) {
  return PROJECT_CATEGORY_LABELS[category] || 'Proyecto'
}