import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { userHasDashboardAccess } from '../lib/accessControl'
import LoadingLoop from '../components/LoadingLoop'
import { useLanguage } from '../lib/i18n.jsx'

const ACCESS_TIMEOUT_MS = 12000

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

export default function AuthPage() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  useEffect(() => {
    let isMounted = true

    const checkExistingSession = async () => {
      try {
        const { data, error } = await withTimeout(supabase.auth.getSession())
        const activeEmail = data?.session?.user?.email

        if (!error && activeEmail) {
          const allowed = await withTimeout(userHasDashboardAccess(activeEmail))
          if (allowed) {
            navigate('/dashboard', { replace: true })
            return
          }

          await supabase.auth.signOut()
          if (isMounted) {
            setStatus({ type: 'error', message: 'Esta cuenta no tiene acceso al dashboard.' })
          }
        }
      } catch (sessionError) {
        // Si hay timeout o error de red, dejamos visible el formulario para reintentar.
      }

      if (isMounted) {
        setIsCheckingSession(false)
      }
    }

    checkExistingSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event !== 'SIGNED_IN') return

      const activeEmail = session?.user?.email
      if (!activeEmail) return

      const allowed = await withTimeout(userHasDashboardAccess(activeEmail))
      if (allowed) {
        navigate('/dashboard', { replace: true })
        return
      }

      await supabase.auth.signOut()
      if (isMounted) {
        setStatus({ type: 'error', message: 'Esta cuenta no tiene acceso al dashboard.' })
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: 'idle', message: '' })

    const cleanEmail = email.trim().toLowerCase()
    if (!cleanEmail) {
      setStatus({ type: 'error', message: t('pages.auth.errors.validEmail') })
      return
    }

    if (!password) {
      setStatus({ type: 'error', message: t('pages.auth.errors.passwordRequired') })
      return
    }

    setIsSubmitting(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    })

    if (error) {
      setStatus({ type: 'error', message: t('pages.auth.errors.invalidCredentials') })
      setIsSubmitting(false)
      return
    }

    try {
      const activeEmail = data?.user?.email || cleanEmail
      const allowed = await withTimeout(userHasDashboardAccess(activeEmail))

      if (!allowed) {
        await supabase.auth.signOut()
        setStatus({ type: 'error', message: 'Esta cuenta no tiene acceso al dashboard.' })
        setIsSubmitting(false)
        return
      }

      setIsSubmitting(false)
      navigate('/dashboard', { replace: true })
    } catch (submitError) {
      await supabase.auth.signOut()
      setStatus({ type: 'error', message: 'No pudimos validar tu acceso. Intenta nuevamente.' })
      setIsSubmitting(false)
    }
  }

  if (isCheckingSession) {
    return (
      <main className="auth-page" aria-labelledby="auth-title">
        <section className="auth-card">
          <p className="eyebrow">{t('pages.auth.eyebrow')}</p>
          <h1 id="auth-title">{t('pages.auth.checkingTitle')}</h1>
          <div className="section-loader-wrap">
            <LoadingLoop compact label={t('pages.auth.checkingLabel')} />
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="auth-page" aria-labelledby="auth-title">
      <section className="auth-card">
        <p className="eyebrow">{t('pages.auth.eyebrow')}</p>
        <h1 id="auth-title">{t('pages.auth.title')}</h1>
        <p className="auth-copy">{t('pages.auth.copy')}</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">{t('pages.auth.email')}</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('pages.auth.emailPlaceholder')}
            required
          />

          <label htmlFor="password">{t('pages.auth.password')}</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('pages.auth.passwordPlaceholder')}
            required
          />

          <button className="button primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Validando...' : t('pages.auth.submit')}
          </button>
        </form>

        {status.message ? (
          <p className={`auth-status ${status.type === 'error' ? 'is-error' : 'is-success'}`}>
            {status.message}
          </p>
        ) : null}

        <Link to="/" className="auth-back">{t('pages.auth.back')}</Link>
      </section>
    </main>
  )
}

