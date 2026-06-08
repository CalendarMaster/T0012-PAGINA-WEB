import { useRef } from 'react'
import { useLanguage } from '../lib/i18n.jsx'
import { CONTACT_EMAIL, handleContactEmailClick } from '../lib/contactEmail'

function buildEmailContent(data) {
  const get = (key) => data.get(key) || '—'
  const subject = 'Solicitud de diagnóstico de información — MI Studio'
  const body =
    `Nombre: ${get('nombre')}\n` +
    `Correo: ${get('email')}\n\n` +
    `Etapa del proyecto: ${get('etapa')}\n` +
    `Tipo de proyecto: ${get('tipo')}\n` +
    `Superficie aproximada: ${get('superficie')}\n` +
    `¿Existe modelo BIM?: ${get('modelo_bim')}\n` +
    `Servicio de interés: ${get('servicio')}\n\n` +
    `Comentarios adicionales:\n${get('mensaje')}`
  return { subject, body }
}

function openDiagnosisEmail(data, contactEmail) {
  const { subject, body } = buildEmailContent(data)
  const su = encodeURIComponent(subject)
  const bo = encodeURIComponent(body)
  const mailtoUrl = `mailto:${contactEmail}?subject=${su}&body=${bo}`
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}&su=${su}&body=${bo}`

  window.location.href = mailtoUrl

  window.setTimeout(() => {
    if (typeof document !== 'undefined' && document.hasFocus()) {
      window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    }
  }, 700)
}

function SelectField({ label, name, placeholder, options }) {
  return (
    <label className="contact-label">
      {label}
      <select name={name} defaultValue="">
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  const formRef = useRef(null)

  const handleSend = () => {
    openDiagnosisEmail(new FormData(formRef.current), CONTACT_EMAIL)
  }

  return (
    <section className="contact-section" id="contacto" aria-labelledby="contact-title">
      <div className="contact-intro">
        <p className="eyebrow">{t('contact.eyebrow')}</p>
        <h2 id="contact-title">{t('contact.title')}</h2>
        <p className="contact-copy">{t('contact.copy')}</p>
        <div className="contact-meta">
          <span>⏱ {t('contact.responseTime')}</span>
          <span> {t('contact.confidentiality')}</span>
        </div>
      </div>

      <form className="contact-form" ref={formRef}>
        <div className="contact-row">
          <label className="contact-label">
            {t('contact.name')}
            <input name="nombre" type="text" autoComplete="name" />
          </label>
          <label className="contact-label">
            {t('contact.email')}
            <input name="email" type="email" autoComplete="email" />
          </label>
        </div>

        <div className="contact-row">
          <SelectField
            label={t('contact.stagePlaceholder')}
            name="etapa"
            placeholder={t('contact.selectDefault')}
            options={t('contact.stages')}
          />
          <SelectField
            label={t('contact.typePlaceholder')}
            name="tipo"
            placeholder={t('contact.selectDefault')}
            options={t('contact.types')}
          />
        </div>

        <div className="contact-row">
          <SelectField
            label={t('contact.areaPlaceholder')}
            name="superficie"
            placeholder={t('contact.selectDefault')}
            options={t('contact.areas')}
          />
          <SelectField
            label={t('contact.hasBimPlaceholder')}
            name="modelo_bim"
            placeholder={t('contact.selectDefault')}
            options={t('contact.hasBimOptions')}
          />
        </div>

        <SelectField
          label={t('contact.servicePlaceholder')}
          name="servicio"
          placeholder={t('contact.selectDefault')}
          options={t('contact.services')}
        />

        <label className="contact-label">
          {t('contact.message')}
          <textarea name="mensaje" rows={3} />
        </label>

        <div className="contact-actions">
          <button type="button" className="button primary contact-submit" onClick={handleSend}>
            {t('contact.submit')}
          </button>
          <a
            className="button secondary contact-wa"
            href="https://wa.me/56977666150"
            target="_blank"
            rel="noreferrer"
          >
            {t('contact.whatsapp')}
          </a>
        </div>

        <div className="contact-download">
          <span className="contact-download-label">{t('contact.downloadLabel')}</span>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Solicito guía de diagnóstico de riesgos de información`}
            onClick={handleContactEmailClick}
            className="contact-download-link"
          >
            {t('contact.downloadNote')} →
          </a>
        </div>
      </form>
    </section>
  )
}
