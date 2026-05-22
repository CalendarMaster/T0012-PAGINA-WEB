import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { userHasDashboardAccess } from '../lib/accessControl'
import LoadingLoop from '../components/LoadingLoop'

export default function AuthPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  useEffect(() => {
    let isMounted = true

    const checkExistingSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      const activeEmail = data?.session?.user?.email

      if (!error && activeEmail) {
        const allowed = await userHasDashboardAccess(activeEmail)
        if (allowed) {
          navigate('/dashboard', { replace: true })
          return
        }
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

      const allowed = await userHasDashboardAccess(activeEmail)
      if (allowed) {
        navigate('/dashboard', { replace: true })
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
      setStatus({ type: 'error', message: 'Ingresa un correo valido.' })
      return
    }

    if (!password) {
      setStatus({ type: 'error', message: 'Ingresa tu contraseña.' })
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    })

    if (error) {
      setStatus({ type: 'error', message: 'Correo o contraseña incorrectos.' })
      return
    }

    // onAuthStateChange se encargará de redirigir al dashboard.
  }

  if (isCheckingSession) {
    return (
      <main className="auth-page" aria-labelledby="auth-title">
        <section className="auth-card">
          <p className="eyebrow">Acceso interno</p>
          <h1 id="auth-title">Verificando sesion</h1>
          <div className="section-loader-wrap">
            <LoadingLoop compact label="Validando acceso" />
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="auth-page" aria-labelledby="auth-title">
      <section className="auth-card">
        <p className="eyebrow">Acceso interno</p>
        <h1 id="auth-title">Dashboard de proyectos</h1>
        <p className="auth-copy">
          Las cuentas y contraseñas se administran desde Supabase Auth. Este acceso usa solo correo y contraseña.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@mi-studio.cl"
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            required
          />

          <button className="button primary" type="submit">Entrar</button>
        </form>

        {status.message ? (
          <p className={`auth-status ${status.type === 'error' ? 'is-error' : 'is-success'}`}>
            {status.message}
          </p>
        ) : null}

        <Link to="/" className="auth-back">Volver al sitio</Link>
      </section>
    </main>
  )
}

