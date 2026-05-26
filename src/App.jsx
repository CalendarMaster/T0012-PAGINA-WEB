import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Process from './components/Process'
import Members from './components/Members'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import ProjectPage from './pages/ProjectPage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const targetId = decodeURIComponent(hash.slice(1))
      let attempts = 0
      let rafId = 0

      const scrollToHashTarget = () => {
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        attempts += 1
        if (attempts < 10) {
          rafId = window.requestAnimationFrame(scrollToHashTarget)
          return
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }

      rafId = window.requestAnimationFrame(scrollToHashTarget)

      return () => window.cancelAnimationFrame(rafId)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

function HomePage() {
  return (
    <PublicLayout>
      <main id="inicio">
        <Hero />
        <Portfolio />
        <Services />
        <Process />
        <FAQ />
        <Members />
        <Contact />
      </main>
    </PublicLayout>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/proyectos"
          element={(
            <PublicLayout>
              <ProjectsPage />
            </PublicLayout>
          )}
        />
        <Route
          path="/proyectos/:slug"
          element={(
            <PublicLayout>
              <ProjectPage />
            </PublicLayout>
          )}
        />
        <Route
          path="/servicios"
          element={(
            <PublicLayout>
              <ServicesPage />
            </PublicLayout>
          )}
        />
        <Route
          path="/nosotros"
          element={(
            <PublicLayout>
              <AboutPage />
            </PublicLayout>
          )}
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
