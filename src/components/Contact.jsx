import { useLanguage } from '../lib/i18n.jsx'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section className="contact-section" id="contacto" aria-labelledby="contact-title">
      <div>
        <p className="eyebrow">{t('contact.eyebrow')}</p>
        <h2 id="contact-title">{t('contact.title')}</h2>
        <p>{t('contact.copy')}</p>
      </div>
      <form className="contact-form" action="#" method="post">
        <label>
          {t('contact.name')}
          <input name="nombre" type="text" autoComplete="name" required />
        </label>
        <label>
          {t('contact.email')}
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          {t('contact.message')}
          <textarea name="mensaje" rows={4} required />
        </label>
        <button type="submit">{t('contact.submit')}</button>
      </form>
    </section>
  )
}
