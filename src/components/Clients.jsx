import { useLanguage } from '../lib/i18n.jsx'

const CLIENT_LOGOS = [
  { name: 'Falabella Inmobiliario', src: '/assets/Logos en grises clientes/00_Falabella Inmobiliario.png', scale: 1.8 },
  { name: 'ACHS', src: '/assets/Logos en grises clientes/ACHS SIN FONDO.png' },
  { name: 'Aeropuerto Balmaceda', src: '/assets/Logos en grises clientes/AEROPUERTO BALMACEDA SIN FONDO.png', scale: 1.8 },
  { name: 'Cencomall', src: '/assets/Logos en grises clientes/CENCOMALL SIN FONDO.png', scale: 1.8 },
  { name: 'Cencomex', src: '/assets/Logos en grises clientes/Cencomex SIN FONDO.png' },
  { name: 'CONIC-BF', src: '/assets/Logos en grises clientes/CONIC-BF SIN FONDO.png' },
  { name: 'Concreta', src: '/assets/Logos en grises clientes/concreta-2.webp' },
  { name: 'Edmond de Rothschild', src: '/assets/Logos en grises clientes/Edmond de Rothschild_SIN FONDO.png', scale: 1.8 },
  { name: 'Farma Value', src: '/assets/Logos en grises clientes/Farma Value SIN FONDO.png' },
  { name: 'Fresenius Kabi', src: '/assets/Logos en grises clientes/Fresenius Kabi_SIN FONDO.png' },
  { name: 'iCuadra', src: '/assets/Logos en grises clientes/ICUADRA.png', scale: 1.8 },
  { name: 'Iglesis Arquitectos', src: '/assets/Logos en grises clientes/Iglesis Arquitectos.png' },
  { name: 'Invinsa', src: '/assets/Logos en grises clientes/invinsa-logo.png' },
  { name: 'Merck', src: '/assets/Logos en grises clientes/MERCK SIN FONDO.png', scale: 1.8 },
  { name: 'MedifFarma', src: '/assets/Logos en grises clientes/MedifFarma SIN FONDO.png', scale: 1.8 },
  { name: 'RG Ingenieros', src: '/assets/Logos en grises clientes/RG-INGENIEROS SIN FONDO.png', scale: 1.3 },
  { name: 'Sanderson', src: '/assets/Logos en grises clientes/sanderson.logo.png' },
  { name: 'Universidad Católica de Chile', src: '/assets/Logos en grises clientes/universidad-catolica-chile-v2.png' },
  { name: 'Urales', src: '/assets/Logos en grises clientes/urales (1).png' },
  { name: 'Vive Tu Barrio', src: '/assets/Logos en grises clientes/VIVE TU BARRIO SIN FONDO.png' },
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
              <li
                key={`${client.name}-${index + 1}`}
                style={{
                  '--client-index': index,
                  '--client-logo-scale': client.scale ?? 1,
                }}
              >
                <img src={client.src} alt={client.name} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}