import { getAboutContent } from '../lib/siteContent'

export default function AboutPage() {
  const aboutContent = getAboutContent('es')

  return (
    <main className="content-page about-page about-page-stack" aria-label="Misión, visión y valores">
      <section id="mision" className="about-stack-section about-stack-section-mission" aria-labelledby="about-mision-title">
        <div className="about-stack-inner">
          <p className="eyebrow">Misión</p>
          <h1 id="about-mision-title">Misión</h1>
          <blockquote>{aboutContent.mission}</blockquote>
        </div>
      </section>

      <section id="vision" className="about-stack-section about-stack-section-vision" aria-labelledby="about-vision-title">
        <div className="about-stack-inner">
          <p className="eyebrow">Visión</p>
          <h2 id="about-vision-title">Visión</h2>
          <blockquote>{aboutContent.vision}</blockquote>
        </div>
      </section>

      <section id="valores" className="about-stack-section about-stack-section-values" aria-labelledby="about-valores-title">
        <div className="about-stack-inner">
          <p className="eyebrow">Valores</p>
          <h2 id="about-valores-title">Valores</h2>
          <ul className="about-values-stack">
            {aboutContent.values.map((value) => (
              <li key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
