import './App.css'

const skills = [
  'Kotlin', 'Java', 'Android SDK', 'Jetpack Compose',
  'Android Architecture Components', 'MVVM', 'MVP', 'Clean Architecture',
  'REST APIs', 'GraphQL', 'Retrofit', 'RxJava',
  'JUnit', 'Espresso', 'CI/CD', 'Docker',
  'Git', 'Agile / Scrum', 'Swift', 'Secure Coding',
]

const services = [
  { title: 'Android Development', desc: 'Native Android application development in Kotlin and Java, from greenfield builds to legacy modernization.' },
  { title: 'Architecture & Design', desc: 'Mobile architecture consulting — MVVM, MVP, Clean Architecture, and scalable SDK design for production.' },
  { title: 'SDK & API Integration', desc: 'Custom SDK development and REST API integration for data-intensive mobile applications.' },
  { title: 'Code Review & Audits', desc: 'Technical review of existing Android codebases for quality, security, and performance improvements.' },
  { title: 'Legacy Modernization', desc: 'Migration of legacy Android codebases to modern architecture components and current Android standards.' },
  { title: 'Technical Leadership', desc: 'Embedded technical lead support for mobile teams — mentoring, sprint planning, and engineering direction.' },
]

function Nav() {
  return (
    <nav className="nav">
      <span className="nav-brand">Pittman Systems <span className="nav-brand-light">LLC</span></span>
      <a className="nav-link" href="mailto:james.elliott.pittman@gmail.com">Contact</a>
    </nav>
  )
}

function Hero() {
  return (
    <div className="hero">
      <h1 className="hero-name">James Pittman</h1>
      <p className="hero-subtitle">Independent Android Consultant</p>
      <p className="hero-desc">Senior Android developer with 10+ years delivering production-grade mobile applications for enterprise clients. Available for contract and consulting engagements.</p>
      <a className="hero-cta" href="mailto:james.elliott.pittman@gmail.com">Get in Touch</a>
    </div>
  )
}

function Services() {
  return (
    <section className="section">
      <h2 className="section-title">Services</h2>
      <div className="grid">
        {services.map(s => (
          <div className="card" key={s.title}>
            <h3 className="card-title">{s.title}</h3>
            <p className="card-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  return (
    <div className="alt-band">
      <section className="section">
        <h2 className="section-title">Technical Skills</h2>
        <div className="tags">
          {skills.map(s => <span className="tag" key={s}>{s}</span>)}
        </div>
      </section>
    </div>
  )
}

function About() {
  return (
    <section className="section">
      <h2 className="section-title">About</h2>
      <p className="about-text">Pittman Systems LLC is an independent Android consulting practice based in Ocean Springs, Mississippi, founded by James Pittman — a senior mobile developer with over a decade of experience building production applications for enterprise and government clients.</p>
      <p className="about-text">Past engagements include lead development roles at Sherwin-Williams, GEICO, and Charter Communications, delivering high-quality mobile solutions across consumer, enterprise, and government sectors.</p>
    </section>
  )
}

function Contact() {
  return (
    <div className="alt-band">
      <section className="section">
        <h2 className="section-title">Contact</h2>
        <div className="contact-box">
          <p className="contact-desc">Available for Android development contracts, architecture consulting, and technical leadership engagements. Remote preferred.</p>
          <a className="email-btn" href="mailto:james.elliott.pittman@gmail.com">james.elliott.pittman@gmail.com</a>
          <p className="contact-detail">Ocean Springs, Mississippi &nbsp;·&nbsp; Remote Available</p>
        </div>
      </section>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      &copy; {new Date().getFullYear()} Pittman Systems LLC &nbsp;·&nbsp; Ocean Springs, Mississippi
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
