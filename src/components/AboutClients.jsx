import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CLIENT_LOGOS = [
  { name: 'Falabella Inmobiliario', src: '/assets/Logos en grises clientes/00_Falabella Inmobiliario.png' },
  { name: 'ACHS', src: '/assets/Logos en grises clientes/ACHS SIN FONDO.png' },
  { name: 'Aeropuerto Balmaceda', src: '/assets/Logos en grises clientes/AEROPUERTO BALMACEDA SIN FONDO.png' },
  { name: 'Cencomall', src: '/assets/Logos en grises clientes/CENCOMALL SIN FONDO.png' },
  { name: 'Cencomex', src: '/assets/Logos en grises clientes/Cencomex SIN FONDO.png' },
  { name: 'CONIC-BF', src: '/assets/Logos en grises clientes/CONIC-BF SIN FONDO.png' },
  { name: 'Concreta', src: '/assets/Logos en grises clientes/concreta-2.webp' },
  { name: 'Edmond de Rothschild', src: '/assets/Logos en grises clientes/Edmond de Rothschild_SIN FONDO.png' },
  { name: 'Farma Value', src: '/assets/Logos en grises clientes/Farma Value SIN FONDO.png' },
  { name: 'Fresenius Kabi', src: '/assets/Logos en grises clientes/Fresenius Kabi_SIN FONDO.png' },
  { name: 'iCuadra', src: '/assets/Logos en grises clientes/ICUADRA.png' },
  { name: 'Iglesis Arquitectos', src: '/assets/Logos en grises clientes/Iglesis Arquitectos.png' },
  { name: 'Invinsa', src: '/assets/Logos en grises clientes/invinsa-logo.png' },
  { name: 'Merck', src: '/assets/Logos en grises clientes/MERCK SIN FONDO.png' },
  { name: 'MedifFarma', src: '/assets/Logos en grises clientes/MedifFarma SIN FONDO.png' },
  { name: 'RG Ingenieros', src: '/assets/Logos en grises clientes/RG-INGENIEROS SIN FONDO.png' },
  { name: 'Sanderson', src: '/assets/Logos en grises clientes/sanderson.logo.png' },
  { name: 'Universidad Católica de Chile', src: '/assets/Logos en grises clientes/UNIV. CATÓLICA DE CHILE V2.png' },
  { name: 'Urales', src: '/assets/Logos en grises clientes/urales (1).png' },
  { name: 'Vive Tu Barrio', src: '/assets/Logos en grises clientes/VIVE TU BARRIO SIN FONDO.png' },
]

export default function AboutClients() {
  const stageRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const stage = stageRef.current
    const cards = cardsRef.current.filter(Boolean)
    if (!stage || cards.length === 0) return undefined

    const radius = 170
    const maxScale = 1.18
    const duration = 0.24

    const onMouseMove = (event) => {
      const mx = event.clientX
      const my = event.clientY

      cards.forEach((card) => {
        const bounds = card.getBoundingClientRect()
        const distance = Math.hypot(
          mx - (bounds.left + bounds.width / 2),
          my - (bounds.top + bounds.height / 2),
        )
        const proximity = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, radius, 1, 0, distance))

        gsap.to(card, {
          scale: 1 + (maxScale - 1) * proximity,
          duration,
          overwrite: true,
          ease: 'power2.out',
        })
      })
    }

    const onMouseLeave = () => {
      cards.forEach((card) => {
        gsap.to(card, {
          scale: 1,
          duration: duration * 1.6,
          overwrite: true,
          ease: 'power2.out',
        })
      })
    }

    stage.addEventListener('mousemove', onMouseMove)
    stage.addEventListener('mouseleave', onMouseLeave)

    return () => {
      stage.removeEventListener('mousemove', onMouseMove)
      stage.removeEventListener('mouseleave', onMouseLeave)
      gsap.killTweensOf(cards)
    }
  }, [])

  const setCardRef = (index) => (element) => {
    cardsRef.current[index] = element
  }

  return (
    <section className="about-clients-section" id="clientes" aria-labelledby="about-clientes-title">
      <div className="about-clients-shell about-clients-stage" ref={stageRef}>
        <p className="eyebrow">Confianza</p>
        <h2 id="about-clientes-title" className="about-clients-title">Nuestros clientes</h2>

        <ul className="about-clients-grid" aria-label="Logos de clientes">
          {CLIENT_LOGOS.map((client, index) => (
            <li
              key={client.name}
              style={{ '--client-index': index }}
              className={client.name === 'Sanderson' ? 'is-sanderson' : undefined}
            >
              <div className="about-clients-card" ref={setCardRef(index)}>
                <img src={client.src} alt={client.name} loading="lazy" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}