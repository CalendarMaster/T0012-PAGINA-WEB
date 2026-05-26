import { useLanguage } from '../lib/i18n.jsx'

const MEMBER_LOGOS = [
  {
    name: 'BIM Forum Chile',
    src: '/assets/miembros/logo-pagina-bimforum-2019.png',
  },
  {
    name: 'Camara Chilena de la Construccion',
    src: '/assets/miembros/logo.png',
  },
  {
    name: 'Asociacion de Oficinas de Arquitectos',
    src: '/assets/miembros/logoaoa_web2024.png',
  },
]

export default function Members() {
  const { t } = useLanguage()

  return (
    <section className="members-section" id="miembros" aria-label={t('servicesHome.membersLabel')}>
      <div className="members-strip">
        <p className="members-strip-label">{t('servicesHome.membersLabel')}</p>
        <ul className="members-strip-logos">
          {MEMBER_LOGOS.map((member) => (
            <li key={member.name}>
              <img src={member.src} alt={member.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
