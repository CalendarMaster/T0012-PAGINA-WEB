import { useLanguage } from '../lib/i18n.jsx'

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
    name: 'Sanderson',
    src: '/assets/Logos en grises clientes/sanderson.logo.png',
  },
  {
    name: 'Urales',
    src: '/assets/Logos en grises clientes/urales (1).png',
  },
]

export default function Clients() {
  const { t } = useLanguage()
  const loopLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

  return (
    <section className="clients-section" id="clientes" aria-label={t('servicesHome.clientsLabel')}>
      <div className="clients-strip">
        <p className="clients-strip-label">{t('servicesHome.clientsLabel')}</p>
        <div className="clients-carousel" aria-live="off">
          <ul
            className="clients-strip-logos clients-strip-logos-loop"
            style={{ '--clients-total': loopLogos.length }}
          >
            {loopLogos.map((client, index) => (
              <li key={`${client.name}-${index + 1}`} style={{ '--client-index': index }}>
              <img src={client.src} alt={client.name} loading="lazy" />
            </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}