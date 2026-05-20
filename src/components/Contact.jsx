export default function Contact() {
  return (
    <section className="contact-section" id="contacto" aria-labelledby="contact-title">
      <div>
        <p className="eyebrow">Contacto</p>
        <h2 id="contact-title">Cuéntanos en qué etapa está tu proyecto</h2>
        <p>
          Te responderemos con una ruta de trabajo para levantar requerimientos, revisar el modelo o
          iniciar coordinación BIM.
        </p>
      </div>
      <form className="contact-form" action="#" method="post">
        <label>
          Nombre
          <input name="nombre" type="text" autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Mensaje
          <textarea name="mensaje" rows={4} required />
        </label>
        <button type="submit">Enviar consulta</button>
      </form>
    </section>
  )
}
