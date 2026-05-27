import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CLIENT_LOGOS = [
  {
    name: 'Cencosud',
    src: '/assets/Logos en grises clientes/cencosud.png',
  },
  {
    name: 'Concreta',
    src: '/assets/Logos en grises clientes/concreta-2.webp',
  },
  {
    name: 'Invinsa',
    src: '/assets/Logos en grises clientes/invinsa-logo.png',
  },

  {
    name: 'Urales',
    src: '/assets/Logos en grises clientes/urales (1).png',
  },
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