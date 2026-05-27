export const CONTACT_EMAIL = 'contacto@mi-studio.cl'
export const CONTACT_MEETING_SUBJECT = 'Solicitud de reunión - MI Studio'
export const CONTACT_JOBS_SUBJECT = 'Postulación - MI Studio'
export const CONTACT_JOBS_BODY = 'Hola, me gustaría postular para trabajar en MI Studio. Adjunto mi currículum y portafolio.'
export const CONTACT_MEETING_BODY = 'Hola, me gustaría agendar una reunión para revisar mi proyecto.'

export function buildContactMailtoUrl() {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_MEETING_SUBJECT)}&body=${encodeURIComponent(CONTACT_MEETING_BODY)}`
}

export function buildContactGmailComposeUrl() {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(CONTACT_MEETING_SUBJECT)}&body=${encodeURIComponent(CONTACT_MEETING_BODY)}`
}

export function handleJobsEmailClick(event) {
  if (event) event.preventDefault()
  if (typeof window === 'undefined') return

  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_JOBS_SUBJECT)}&body=${encodeURIComponent(CONTACT_JOBS_BODY)}`
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(CONTACT_JOBS_SUBJECT)}&body=${encodeURIComponent(CONTACT_JOBS_BODY)}`

  window.location.href = mailtoUrl
  window.setTimeout(() => {
    if (typeof document !== 'undefined' && document.hasFocus()) {
      window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    }
  }, 700)
}

export function handleContactEmailClick(event) {
  if (event) {
    event.preventDefault()
  }

  if (typeof window === 'undefined') return

  const mailtoUrl = buildContactMailtoUrl()
  const gmailUrl = buildContactGmailComposeUrl()

  window.location.href = mailtoUrl

  window.setTimeout(() => {
    if (typeof document !== 'undefined' && document.hasFocus()) {
      window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    }
  }, 700)
}
