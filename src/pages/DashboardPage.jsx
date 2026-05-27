import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { userHasDashboardAccess } from '../lib/accessControl'
import {
  getProjectCategoryLabel,
  normalizeProjectCategory,
  normalizeProjectDestination,
  PROJECT_CATEGORY_OPTIONS,
  PROJECT_DESTINATION_OPTIONS,
} from '../lib/projectCategories'
import LoadingLoop from '../components/LoadingLoop'

const EMPTY_FORM = {
  id: null,
  title: '',
  slug: '',
  category: 'bim_proyecto',
  destination: '',
  mandante: '',
  architect: '',
  structural_engineer: '',
  specialists: [''],
  area_m2: '',
  year: '',
  summary: '',
  description: '',
  cover_url: '',
  leader_image_url: '',
  sort_order: 0,
  is_published: true,
}

const ACCESS_TIMEOUT_MS = 12000

function slugify(value) {
  return value
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function withTimeout(promise, ms = ACCESS_TIMEOUT_MS) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId)
        reject(new Error('timeout'))
      }, ms)
    }),
  ])
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [state, setState] = useState({ loading: true, allowed: false, email: '', userId: null })
  const [projects, setProjects] = useState([])
  const [view, setView] = useState('home')
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingGallery, setIsLoadingGallery] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [coverFile, setCoverFile] = useState(null)
  const [coverPreviewUrl, setCoverPreviewUrl] = useState('')
  const [leaderFile, setLeaderFile] = useState(null)
  const [leaderPreviewUrl, setLeaderPreviewUrl] = useState('')
  const [galleryFiles, setGalleryFiles] = useState([])
  const [galleryImages, setGalleryImages] = useState([])
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      setStatus({ type: 'error', message: 'No se pudo cargar la lista de proyectos.' })
      setProjects([])
      return
    }

    setProjects(data || [])
  }

  useEffect(() => {
    if (!coverFile) {
      setCoverPreviewUrl('')
      return
    }

    const previewUrl = URL.createObjectURL(coverFile)
    setCoverPreviewUrl(previewUrl)

    return () => {
      URL.revokeObjectURL(previewUrl)
    }
  }, [coverFile])

  useEffect(() => {
    if (!leaderFile) {
      setLeaderPreviewUrl('')
      return
    }

    const previewUrl = URL.createObjectURL(leaderFile)
    setLeaderPreviewUrl(previewUrl)

    return () => {
      URL.revokeObjectURL(previewUrl)
    }
  }, [leaderFile])

  useEffect(() => {
    let isMounted = true

    const checkAccess = async () => {
      try {
        const { data, error } = await withTimeout(supabase.auth.getUser())
        const user = data?.user

        if (error || !user?.email) {
          if (isMounted) {
            setState({ loading: false, allowed: false, email: '', userId: null })
          }
          navigate('/auth', { replace: true })
          return
        }

        const allowed = await withTimeout(userHasDashboardAccess(user.email))

        if (!allowed) {
          await supabase.auth.signOut()
          if (isMounted) {
            setState({ loading: false, allowed: false, email: user.email, userId: user.id })
          }
          navigate('/auth', { replace: true })
          return
        }

        await withTimeout(loadProjects())

        if (isMounted) {
          setState({ loading: false, allowed: true, email: user.email, userId: user.id })
        }
      } catch (accessError) {
        if (isMounted) {
          setState({ loading: false, allowed: false, email: '', userId: null })
        }
        navigate('/auth', { replace: true })
      }
    }

    checkAccess()

    return () => {
      isMounted = false
    }
  }, [navigate])

  const handleFieldChange = (event) => {
    const { name, value, type, checked } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    setForm((previous) => {
      const next = { ...previous, [name]: nextValue }

      if (name === 'title' && !previous.id) {
        next.slug = slugify(value)
      }

      return next
    })
  }

  const handleCoverFileChange = (event) => {
    const nextFile = event.target.files?.[0] || null
    setCoverFile(nextFile)
  }

  const handleGalleryFilesChange = (event) => {
    const selectedFiles = Array.from(event.target.files || [])
    if (selectedFiles.length === 0) return
    setGalleryFiles((previous) => [...previous, ...selectedFiles])
  }

  const removePendingGalleryFile = (index) => {
    setGalleryFiles((previous) => previous.filter((_, itemIndex) => itemIndex !== index))
  }

  const handleSpecialistChange = (index, value) => {
    setForm((previous) => {
      const nextSpecialists = [...previous.specialists]
      nextSpecialists[index] = value
      return { ...previous, specialists: nextSpecialists }
    })
  }

  const addSpecialistField = () => {
    setForm((previous) => ({ ...previous, specialists: [...previous.specialists, ''] }))
  }

  const removeSpecialistField = (index) => {
    setForm((previous) => {
      if (previous.specialists.length === 1) {
        return { ...previous, specialists: [''] }
      }
      return {
        ...previous,
        specialists: previous.specialists.filter((_, itemIndex) => itemIndex !== index),
      }
    })
  }

  const loadProjectGallery = async (projectId) => {
    if (!projectId) {
      setGalleryImages([])
      return
    }

    setIsLoadingGallery(true)
    const { data, error } = await supabase
      .from('project_images')
      .select('id, image_url, sort_order')
      .eq('project_id', projectId)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })

    if (error) {
      setStatus({ type: 'error', message: 'No se pudieron cargar las imagenes del proyecto.' })
      setGalleryImages([])
      setIsLoadingGallery(false)
      return
    }

    setGalleryImages(data || [])
    setIsLoadingGallery(false)
  }

  const removeGalleryImage = async (imageId) => {
    if (!form.id || !imageId) return

    const { error } = await supabase
      .from('project_images')
      .delete()
      .eq('id', imageId)
      .eq('project_id', form.id)

    if (error) {
      setStatus({ type: 'error', message: 'No se pudo eliminar la imagen de la galeria.' })
      return
    }

    await loadProjectGallery(form.id)
    setStatus({ type: 'success', message: 'Imagen eliminada correctamente.' })
  }

  const moveGalleryImage = async (imageId, direction) => {
    if (!form.id || !imageId) return

    const currentIndex = galleryImages.findIndex((image) => image.id === imageId)
    if (currentIndex < 0) return

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (targetIndex < 0 || targetIndex >= galleryImages.length) return

    const reordered = [...galleryImages]
    const [movedImage] = reordered.splice(currentIndex, 1)
    reordered.splice(targetIndex, 0, movedImage)

    const updates = reordered.map((image, index) =>
      supabase
        .from('project_images')
        .update({ sort_order: index + 1 })
        .eq('id', image.id)
        .eq('project_id', form.id),
    )

    const results = await Promise.all(updates)
    const failedUpdate = results.find((result) => result.error)

    if (failedUpdate?.error) {
      setStatus({ type: 'error', message: 'No se pudo actualizar el orden de la galeria.' })
      await loadProjectGallery(form.id)
      return
    }

    setGalleryImages(
      reordered.map((image, index) => ({
        ...image,
        sort_order: index + 1,
      })),
    )
    setStatus({ type: 'success', message: 'Orden de galeria actualizado.' })
  }

  const uploadSingleImageFile = async (file, slug, folderPrefix) => {
    if (!file) return null

    const extensionFromName = file.name.includes('.')
      ? file.name.split('.').pop().toLowerCase()
      : 'jpg'
    const safeFileSlug = slugify(file.name.replace(/\.[^/.]+$/, '')) || folderPrefix
    const storagePath = `${state.userId}/${slug}/${folderPrefix}-${Date.now()}-${safeFileSlug}.${extensionFromName}`

    const { error: uploadError } = await supabase
      .storage
      .from('project-covers')
      .upload(storagePath, file, { upsert: true })

    if (uploadError) {
        throw new Error(`No se pudo subir la imagen ${file.name} al bucket project-covers: ${uploadError.message}`)
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('project-covers').getPublicUrl(storagePath)

    return publicUrl || null
  }

  const uploadCoverFile = async (slug) => {
    if (!coverFile) return form.cover_url || null

    return uploadSingleImageFile(coverFile, slug, 'portada')
  }

  const uploadGalleryFiles = async (projectId, slug) => {
    if (!projectId || galleryFiles.length === 0) return

    const startOrder = galleryImages.length

    for (let index = 0; index < galleryFiles.length; index += 1) {
      const file = galleryFiles[index]
      const extensionFromName = file.name.includes('.')
        ? file.name.split('.').pop().toLowerCase()
        : 'jpg'
      const safeFileSlug = slugify(file.name.replace(/\.[^/.]+$/, '')) || `galeria-${index + 1}`
      const storagePath = `${state.userId}/${slug}/${Date.now()}-${index + 1}-${safeFileSlug}.${extensionFromName}`

      const { error: uploadError } = await supabase
        .storage
        .from('project-gallery')
        .upload(storagePath, file, { upsert: true })

      if (uploadError) {
        throw new Error(`No se pudo subir la imagen ${file.name} al bucket project-gallery: ${uploadError.message}`)
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('project-gallery').getPublicUrl(storagePath)

      const { error: insertError } = await supabase
        .from('project_images')
        .insert({
          project_id: projectId,
          image_url: publicUrl,
          sort_order: startOrder + index + 1,
        })

      if (insertError) {
        throw new Error(`No se pudo registrar la imagen ${file.name} en la galeria: ${insertError.message}`)
      }
    }
  }

  const saveProjectWithFallback = async ({ projectId, payload, userId }) => {
    const executeMutation = async (nextPayload) => {
      if (projectId) {
        return supabase
          .from('projects')
          .update(nextPayload)
          .eq('id', projectId)
          .select('id')
          .single()
      }

      return supabase
        .from('projects')
        .insert({ ...nextPayload, created_by: userId })
        .select('id')
        .single()
    }

    let response = await executeMutation(payload)
    if (!response.error) return response

    const errorText = `${response.error.message || ''} ${response.error.details || ''} ${response.error.hint || ''}`.toLowerCase()
    const fallbackPayload = { ...payload }
    let shouldRetry = false

    if (errorText.includes('destination')) {
      delete fallbackPayload.destination
      shouldRetry = true
    }

    if (errorText.includes('mandante')) {
      delete fallbackPayload.mandante
      shouldRetry = true
    }

    if (!shouldRetry) return response

    response = await executeMutation(fallbackPayload)
    return response
  }

  const handleSave = async (event) => {
    event.preventDefault()
    setStatus({ type: 'idle', message: '' })

    if (!form.title.trim()) {
      setStatus({ type: 'error', message: 'El titulo es obligatorio.' })
      return
    }

    const normalizedSlug = slugify(form.slug || form.title)
    if (!normalizedSlug) {
      setStatus({ type: 'error', message: 'El slug no puede quedar vacio.' })
      return
    }

    setIsSaving(true)

    let error = null
    let savedProjectId = form.id

    try {
      const coverUrl = await uploadCoverFile(normalizedSlug)
      const leaderImageUrl = await uploadSingleImageFile(leaderFile, normalizedSlug, 'lider')
      const sanitizedSpecialists = form.specialists
        .map((item) => item.trim())
        .filter(Boolean)

      const payload = {
        title: form.title.trim(),
        slug: normalizedSlug,
        category: normalizeProjectCategory(form.category),
        destination: normalizeProjectDestination(form.destination) || null,
        mandante: form.mandante.trim() || null,
        architect: form.architect.trim() || null,
        structural_engineer: form.structural_engineer.trim() || null,
        specialists: sanitizedSpecialists,
        area_m2: form.area_m2.trim() || null,
        year: form.year.trim() || null,
        summary: form.summary.trim() || null,
        description: form.description.trim() || null,
        cover_url: coverUrl,
        leader_image_url: leaderImageUrl || form.leader_image_url || null,
        sort_order: Number.parseInt(form.sort_order, 10) || 0,
        is_published: form.is_published,
      }
      const response = await saveProjectWithFallback({
        projectId: form.id,
        payload,
        userId: state.userId,
      })

      savedProjectId = response.data?.id || form.id
      error = response.error

      if (!error) {
        await uploadGalleryFiles(savedProjectId, normalizedSlug)
      }
    } catch (uploadError) {
      setStatus({
        type: 'error',
        message: uploadError?.message || 'Fallo la subida de imagen. Revisa los buckets project-covers y project-gallery.',
      })
      setIsSaving(false)
      return
    }

    if (error) {
      const duplicateSlug = error.message?.toLowerCase().includes('slug')
      const detailedMessage = [error.message, error.details, error.hint].filter(Boolean).join(' | ')
      setStatus({
        type: 'error',
        message: duplicateSlug
          ? 'Ese slug ya existe. Ajusta el titulo o el slug manual.'
          : detailedMessage || 'No se pudo guardar el proyecto.',
      })
      setIsSaving(false)
      return
    }

    await loadProjects()
    setForm(EMPTY_FORM)
    setCoverFile(null)
    setLeaderFile(null)
    setGalleryFiles([])
    setGalleryImages([])
    setView('home')
    setStatus({ type: 'success', message: 'Proyecto guardado correctamente.' })
    setIsSaving(false)
  }

  const handleEdit = async (project) => {
    setForm({
      id: project.id,
      title: project.title || '',
      slug: project.slug || '',
      category: normalizeProjectCategory(project.category) || 'bim_proyecto',
      destination: normalizeProjectDestination(project.destination),
      mandante: project.mandante || '',
      architect: project.architect || '',
      structural_engineer: project.structural_engineer || '',
      specialists: Array.isArray(project.specialists) && project.specialists.length > 0 ? project.specialists : [''],
      area_m2: project.area_m2 || '',
      year: project.year || '',
      summary: project.summary || '',
      description: project.description || '',
      cover_url: project.cover_url || '',
      leader_image_url: project.leader_image_url || '',
      sort_order: project.sort_order || 0,
      is_published: Boolean(project.is_published),
    })
    setCoverFile(null)
    setLeaderFile(null)
    setGalleryFiles([])
    setView('form')
    await loadProjectGallery(project.id)
  }

  const handleReset = () => {
    setForm(EMPTY_FORM)
    setCoverFile(null)
    setLeaderFile(null)
    setGalleryFiles([])
    setGalleryImages([])
    setStatus({ type: 'idle', message: '' })
  }

  const handleDelete = async (project) => {
    const shouldDelete = window.confirm(`Eliminar el proyecto "${project.title}"?`)
    if (!shouldDelete) return

    const { error } = await supabase.from('projects').delete().eq('id', project.id)
    if (error) {
      setStatus({ type: 'error', message: 'No se pudo eliminar el proyecto.' })
      return
    }

    if (form.id === project.id) {
      handleReset()
    }

    await loadProjects()
    setStatus({ type: 'success', message: 'Proyecto eliminado.' })
  }

  const handleCreateNew = () => {
    handleReset()
    setView('form')
  }

  const publishedProjects = projects.filter((project) => project.is_published)
  const draftProjects = projects.filter((project) => !project.is_published)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/auth', { replace: true })
  }

  const profileInitial = state.email ? state.email.charAt(0).toUpperCase() : 'U'

  if (state.loading) {
    return (
      <main className="dashboard-page">
        <section className="dashboard-shell">
          <p className="eyebrow">Dashboard</p>
          <h1>Validando acceso</h1>
          <div className="section-loader-wrap">
            <LoadingLoop compact label="Preparando dashboard" />
          </div>
        </section>
      </main>
    )
  }

  if (!state.allowed) return null

  return (
    <main className="dashboard-page dashboard-page-full" aria-labelledby="dashboard-title">
      <header className="dashboard-header">
        <Link className="dashboard-brand" to="/" aria-label="MI Studio sitio principal">
          <img src="https://www.mi-studio.cl/images/template/logo.png" alt="MI Studio" />
          <span>panel interno</span>
        </Link>

        <details className="dashboard-profile">
          <summary className="dashboard-profile-trigger">
            <span className="dashboard-profile-avatar" aria-hidden="true">{profileInitial}</span>
            <span className="dashboard-profile-email">{state.email}</span>
          </summary>

          <div className="dashboard-profile-menu">
            <Link className="dashboard-profile-item" to="/" target="_blank" rel="noreferrer">
              Ver sitio principal
            </Link>
            <button className="dashboard-profile-item" type="button" onClick={handleLogout}>
              Cerrar sesion
            </button>
          </div>
        </details>
      </header>

      <section className="dashboard-shell is-crud">
        <div className="dashboard-top">
          <div>
            <p className="eyebrow">Panel interno</p>
            <h1 id="dashboard-title">Gestor de proyectos</h1>
            <p className="dashboard-copy">
              Sesion iniciada como {state.email}. Desde aqui puedes crear y editar proyectos del portafolio.
            </p>
          </div>
        </div>

        {view === 'home' ? (
          <div className="dashboard-home">
            <div className="dashboard-home-top">
              <h2>Proyectos publicados</h2>
              <div className="dashboard-home-actions">
                <button className="button primary" type="button" onClick={handleCreateNew}>+ Agregar proyecto</button>
              </div>
            </div>

            {status.message ? (
              <p className={`auth-status ${status.type === 'error' ? 'is-error' : 'is-success'}`}>
                {status.message}
              </p>
            ) : null}

            {publishedProjects.length === 0 ? (
              <p className="dashboard-empty-copy">No hay proyectos publicados todavia.</p>
            ) : (
              <div className="portafolio_grid dashboard-portafolio-grid">
                {publishedProjects.map((project) => (
                  <article key={project.id} className={`portafolio_card dashboard-portafolio-card cat_${normalizeProjectCategory(project.category)}`}>
                    <div className="portafolio_card_inner">
                      <div className="portafolio_card_front">
                        <img
                          className="portafolio_img"
                          src={project.cover_url || 'https://propuestas.dmvdigital.cl/mistudio/imgs/sketches/sketch_1.png'}
                          alt={project.title}
                        />
                      </div>
                      <div className="portafolio_card_back dashboard-card-back">
                        <h3 className="portafolio_card_title">{project.title}</h3>
                        <p className="portafolio_card_cat">{getProjectCategoryLabel(project.category)}</p>
                        <div className="dashboard-card-actions">
                          <button className="portafolio_card_btn" type="button" onClick={() => handleEdit(project)}>
                            Editar
                          </button>
                          <button className="portafolio_card_btn is-danger" type="button" onClick={() => handleDelete(project)}>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {draftProjects.length > 0 ? (
              <div className="dashboard-drafts">
                <h3>Borradores</h3>
                <div className="dashboard-draft-list">
                  {draftProjects.map((project) => (
                    <article key={project.id} className="dashboard-draft-item">
                      <div>
                        <strong>{project.title}</strong>
                        <p>{getProjectCategoryLabel(project.category)}</p>
                      </div>
                      <div className="dashboard-card-actions">
                        <button className="portafolio_card_btn" type="button" onClick={() => handleEdit(project)}>
                          Editar
                        </button>
                        <button className="portafolio_card_btn is-danger" type="button" onClick={() => handleDelete(project)}>
                          Eliminar
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <form className="dashboard-form dashboard-form-single" onSubmit={handleSave}>
            <div className="dashboard-form-top">
              <h2>{form.id ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
              <button className="button secondary" type="button" onClick={() => setView('home')}>
                Volver al dashboard
              </button>
            </div>

            <div className="dashboard-form-main-top">
              <div className="dashboard-form-main-fields">
                <label htmlFor="title">Titulo</label>
                <input id="title" name="title" value={form.title} onChange={handleFieldChange} required />

                <label htmlFor="slug">Slug</label>
                <input id="slug" name="slug" value={form.slug} onChange={handleFieldChange} required />

                <label htmlFor="category">Categoria</label>
                <select id="category" name="category" value={form.category} onChange={handleFieldChange}>
                  {PROJECT_CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>

                <label htmlFor="destination">Destino de recinto</label>
                <select id="destination" name="destination" value={form.destination} onChange={handleFieldChange}>
                  <option value="">Sin destino</option>
                  {PROJECT_DESTINATION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>

                <label htmlFor="mandante">Mandante</label>
                <input
                  id="mandante"
                  name="mandante"
                  value={form.mandante}
                  onChange={handleFieldChange}
                  placeholder="Nombre del mandante"
                />

                <div className="dashboard-row">
                  <div>
                    <label htmlFor="architect">Arquitecto</label>
                    <input id="architect" name="architect" value={form.architect} onChange={handleFieldChange} />
                  </div>
                  <div>
                    <label htmlFor="structural_engineer">Ingeniero calculista</label>
                    <input
                      id="structural_engineer"
                      name="structural_engineer"
                      value={form.structural_engineer}
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="year">Ano</label>
                    <input id="year" name="year" value={form.year} onChange={handleFieldChange} />
                  </div>
                </div>

                <div>
                  <label htmlFor="area_m2">M2</label>
                  <input id="area_m2" name="area_m2" value={form.area_m2} onChange={handleFieldChange} />
                </div>
              </div>

              <aside className="dashboard-cover-panel">
                <label htmlFor="cover_file">Portada del proyecto</label>
                <input id="cover_file" type="file" accept="image/*" onChange={handleCoverFileChange} />

                {coverPreviewUrl ? (
                  <img className="dashboard-cover-preview" src={coverPreviewUrl} alt="Portada seleccionada" />
                ) : form.cover_url ? (
                  <img className="dashboard-cover-preview" src={form.cover_url} alt="Portada actual" />
                ) : (
                  <div className="dashboard-cover-placeholder">Sin portada cargada</div>
                )}

                {coverFile ? <p className="dashboard-file-note">Archivo seleccionado: {coverFile.name}</p> : null}

                <label htmlFor="leader_file">Imagen lider</label>
                <input
                  id="leader_file"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setLeaderFile(event.target.files?.[0] || null)}
                />

                {leaderPreviewUrl ? (
                  <img className="dashboard-cover-preview" src={leaderPreviewUrl} alt="Imagen lider seleccionada" />
                ) : form.leader_image_url ? (
                  <img className="dashboard-cover-preview" src={form.leader_image_url} alt="Imagen lider actual" />
                ) : (
                  <div className="dashboard-cover-placeholder">Sin imagen lider cargada</div>
                )}

                {leaderFile ? <p className="dashboard-file-note">Archivo seleccionado: {leaderFile.name}</p> : null}
              </aside>
            </div>

            <label htmlFor="summary">Resumen corto</label>
            <textarea id="summary" name="summary" rows={2} value={form.summary} onChange={handleFieldChange} />

            <label htmlFor="description">Descripcion</label>
            <textarea id="description" name="description" rows={4} value={form.description} onChange={handleFieldChange} />

            <div className="dashboard-specialists">
              <label>Especialistas</label>
              {form.specialists.map((specialist, index) => (
                <div className="dashboard-specialist-row" key={`specialist-${index + 1}`}>
                  <input
                    value={specialist}
                    onChange={(event) => handleSpecialistChange(index, event.target.value)}
                    placeholder={`Especialista ${index + 1}`}
                  />
                  <button
                    type="button"
                    className="button secondary"
                    onClick={() => removeSpecialistField(index)}
                  >
                    Quitar
                  </button>
                </div>
              ))}
              <button type="button" className="button secondary" onClick={addSpecialistField}>
                + Agregar especialista
              </button>
            </div>

            <div className="dashboard-row">
              <div>
                <label htmlFor="sort_order">Orden</label>
                <input id="sort_order" name="sort_order" type="number" value={form.sort_order} onChange={handleFieldChange} />
              </div>
              <label className="dashboard-checkbox" htmlFor="is_published">
                <input
                  id="is_published"
                  name="is_published"
                  type="checkbox"
                  checked={form.is_published}
                  onChange={handleFieldChange}
                />
                Publicado
              </label>
            </div>

            <div className="dashboard-gallery-section">
              <label htmlFor="gallery_files">Imagenes del proyecto (slider)</label>
              <input
                id="gallery_files"
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryFilesChange}
              />

              {galleryFiles.length > 0 ? (
                <div className="dashboard-gallery-pending">
                  <p>Archivos listos para subir:</p>
                  {galleryFiles.map((file, index) => (
                    <div className="dashboard-gallery-pending-row" key={`${file.name}-${index + 1}`}>
                      <span>{file.name}</span>
                      <button type="button" className="button secondary" onClick={() => removePendingGalleryFile(index)}>
                        Quitar
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}

              {isLoadingGallery ? (
                <div className="dashboard-gallery-loader">
                  <LoadingLoop compact label="Cargando galeria" />
                </div>
              ) : null}

              {!isLoadingGallery && galleryImages.length > 0 ? (
                <div className="dashboard-gallery-grid">
                  {galleryImages.map((image, index) => (
                    <article key={image.id} className="dashboard-gallery-card">
                      <img src={image.image_url} alt="Imagen de galeria" />
                      <p className="dashboard-gallery-order">Orden: {index + 1}</p>
                      <div className="dashboard-gallery-actions">
                        <button
                          type="button"
                          className="button secondary"
                          onClick={() => moveGalleryImage(image.id, 'up')}
                          disabled={index === 0}
                        >
                          Subir
                        </button>
                        <button
                          type="button"
                          className="button secondary"
                          onClick={() => moveGalleryImage(image.id, 'down')}
                          disabled={index === galleryImages.length - 1}
                        >
                          Bajar
                        </button>
                        <button type="button" className="button secondary" onClick={() => removeGalleryImage(image.id)}>
                          Eliminar
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="dashboard-actions">
              <button className="button primary" type="submit" disabled={isSaving}>
                {isSaving ? 'Guardando...' : 'Guardar proyecto'}
              </button>
              <button className="button secondary" type="button" onClick={handleReset}>
                Limpiar formulario
              </button>
            </div>

            {status.message ? (
              <p className={`auth-status ${status.type === 'error' ? 'is-error' : 'is-success'}`}>
                {status.message}
              </p>
            ) : null}
          </form>
        )}
      </section>
    </main>
  )
}
