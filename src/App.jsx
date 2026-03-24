import { useState, useEffect } from 'react'
import './App.css'

// ── Pi animation ──────────────────────────────────────────────────────────────

const PI_FRAMES = ['Pittman', 'Pi\u03c0man', '\u03c0\u03c0man', '2\u03c0man', '\u03c4man']

// Pingpong sequence: 0,1,2,3,4,3,2,1 then repeat
const SEQ = [
  ...PI_FRAMES.map((_, i) => i),
  ...[...PI_FRAMES.map((_, i) => i)].reverse().slice(1, -1),
]

function useAnimatedName() {
  const [pos, setPos] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const frameIdx = SEQ[pos]
    const isEndpoint = frameIdx === 0 || frameIdx === PI_FRAMES.length - 1
    const delay = isEndpoint ? 2400 : 550

    const t = setTimeout(() => {
      setFade(false)
      setTimeout(() => {
        setPos(p => (p + 1) % SEQ.length)
        setFade(true)
      }, 120)
    }, delay)

    return () => clearTimeout(t)
  }, [pos])

  return { name: PI_FRAMES[SEQ[pos]], fade }
}

// ── Components ────────────────────────────────────────────────────────────────

const skills = [
  'Systems Architecture', 'Technical Leadership', 'API Design',
  'Kotlin', 'Java', 'Android SDK', 'Jetpack Compose',
  'REST APIs', 'GraphQL', 'Microservices', 'Docker',
  'CI/CD', 'Cloud Integration', 'Retrofit', 'RxJava',
  'MVVM', 'MVP', 'Clean Architecture',
  'Agile / Scrum', 'Git', 'Secure Coding',
]

const services = [
  {
    title: 'Solutions Architecture',
    desc: 'End-to-end system design for scalable, maintainable software — from API contracts and data flows to deployment strategy.',
  },
  {
    title: 'Mobile Development',
    desc: 'Native Android and cross-platform mobile application development in Kotlin and Java, built for production scale.',
  },
  {
    title: 'Technical Leadership',
    desc: 'Fractional tech lead and CTO support — architecture reviews, engineering team mentorship, and Agile process guidance.',
  },
  {
    title: 'API & Integration Design',
    desc: 'Design and implementation of REST and GraphQL APIs, SDK development, and third-party system integrations.',
  },
  {
    title: 'Legacy Modernization',
    desc: 'Assessment and migration of legacy codebases and architectures to modern, maintainable systems.',
  },
  {
    title: 'Code Review & Audits',
    desc: 'In-depth technical audits of existing systems for quality, security vulnerabilities, and performance bottlenecks.',
  },
]

function Nav() {
  const { name, fade } = useAnimatedName()
  return (
    <nav className="nav">
      <span className="nav-brand">
        <span className={`nav-anim ${fade ? 'nav-anim-in' : 'nav-anim-out'}`}>{name}</span>
        {' '}<span className="nav-brand-light">Systems LLC</span>
      </span>
      <a className="nav-link" href="mailto:james.elliott.pittman@gmail.com">Contact</a>
    </nav>
  )
}

function Hero() {
  return (
    <div className="hero">
      <h1 className="hero-name">James Pittman</h1>
      <p className="hero-subtitle">Solutions Architect &amp; Technology Consultant</p>
      <p className="hero-desc">
        10+ years designing scalable software systems, leading engineering teams, and delivering
        production-grade applications for enterprise and government clients. Available for
        architecture consulting, technical leadership, and development engagements.
      </p>
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
      <p className="about-text">
        Pittman Systems LLC is a technology consulting practice based in Ocean Springs, Mississippi,
        founded by James Pittman — a solutions architect and senior software engineer with over a
        decade of experience designing and delivering complex systems for enterprise and government clients.
      </p>
      <p className="about-text">
        Past engagements include lead architecture and development roles at Sherwin-Williams, GEICO,
        Charter Communications, and Deloitte Consulting, spanning consumer mobile, enterprise tooling,
        and government applications.
      </p>
    </section>
  )
}

function Contact() {
  return (
    <div className="alt-band">
      <section className="section">
        <h2 className="section-title">Contact</h2>
        <div className="contact-box">
          <p className="contact-desc">
            Available for architecture consulting, technical leadership, and software development
            engagements. Remote preferred.
          </p>
          <a className="email-btn" href="mailto:james.elliott.pittman@gmail.com">
            james.elliott.pittman@gmail.com
          </a>
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
