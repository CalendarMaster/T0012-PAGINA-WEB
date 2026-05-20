import Header from './components/Header'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Process from './components/Process'
import Trust from './components/Trust'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main id="inicio">
        <Hero />
        <Portfolio />
        <Services />
        <Process />
        <Trust />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
