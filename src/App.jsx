import { useState, useEffect, useRef } from 'react'
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

  useEffect(() => {
    const frameIdx = SEQ[pos]
    const isEndpoint = frameIdx === 0 || frameIdx === PI_FRAMES.length - 1
    const delay = isEndpoint ? 2400 : 550

    const t = setTimeout(() => {
      setPos(p => (p + 1) % SEQ.length)
    }, delay)

    return () => clearTimeout(t)
  }, [pos])

  return PI_FRAMES[SEQ[pos]]
}

// ── Scroll reveal ────────────────────────────────────────────────────────────

function useReveal() {
  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const ref = useRef(null)
  const [visible, setVisible] = useState(prefersReduced)

  useEffect(() => {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [prefersReduced])

  return { ref, className: visible ? 'reveal visible' : 'reveal' }
}

// ── Icons (24x24 stroke-based SVGs) ──────────────────────────────────────────

const svgProps = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', className: 'card-icon' }

const Icons = {
  architecture: (
    <svg {...svgProps}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  mobile: (
    <svg {...svgProps}>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12" y2="18.01" />
    </svg>
  ),
  leadership: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  api: (
    <svg {...svgProps}>
      <circle cx="5" cy="12" r="3" />
      <circle cx="19" cy="12" r="3" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <circle cx="12" cy="5" r="3" />
      <line x1="12" y1="8" x2="12" y2="10" />
    </svg>
  ),
  modernize: (
    <svg {...svgProps}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  ),
  audit: (
    <svg {...svgProps}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <path d="M8 8l2 3 4-5" />
    </svg>
  ),
}

// ── Components ────────────────────────────────────────────────────────────────

const skillGroups = [
  { label: 'Architecture & Leadership', skills: ['Systems Architecture', 'Technical Leadership', 'Clean Architecture', 'Agile / Scrum'] },
  { label: 'Languages & Frameworks', skills: ['Kotlin', 'Java', 'Android SDK', 'Jetpack Compose', 'RxJava'] },
  { label: 'APIs & Backend', skills: ['API Design', 'REST APIs', 'GraphQL', 'Microservices', 'Retrofit'] },
  { label: 'DevOps & Tools', skills: ['Docker', 'CI/CD', 'Cloud Integration', 'Git', 'Secure Coding'] },
  { label: 'Patterns', skills: ['MVVM', 'MVP'] },
]

const services = [
  {
    title: 'Solutions Architecture',
    icon: Icons.architecture,
    desc: 'End-to-end system design for scalable, maintainable software — from API contracts and data flows to deployment strategy.',
  },
  {
    title: 'Mobile Development',
    icon: Icons.mobile,
    desc: 'Native Android and cross-platform mobile application development in Kotlin and Java, built for production scale.',
  },
  {
    title: 'Technical Leadership',
    icon: Icons.leadership,
    desc: 'Fractional tech lead and CTO support — architecture reviews, engineering team mentorship, and Agile process guidance.',
  },
  {
    title: 'API & Integration Design',
    icon: Icons.api,
    desc: 'Design and implementation of REST and GraphQL APIs, SDK development, and third-party system integrations.',
  },
  {
    title: 'Legacy Modernization',
    icon: Icons.modernize,
    desc: 'Assessment and migration of legacy codebases and architectures to modern, maintainable systems.',
  },
  {
    title: 'Code Review & Audits',
    icon: Icons.audit,
    desc: 'In-depth technical audits of existing systems for quality, security vulnerabilities, and performance bottlenecks.',
  },
]

function Nav() {
  const name = useAnimatedName()
  return (
    <nav className="nav">
      <span className="nav-brand">
        <span className="nav-anim">{name}</span>
        {' '}<span className="nav-brand-light">Systems LLC</span>
      </span>
      <a className="nav-link" href="mailto:james.elliott.pittman@gmail.com">Contact</a>
    </nav>
  )
}

function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { requestAnimationFrame(() => setLoaded(true)) }, [])

  return (
    <div className="hero">
      <div className={`hero-inner ${loaded ? 'hero-loaded' : ''}`}>
        <h1 className="hero-name">James Pittman</h1>
        <p className="hero-subtitle">Solutions Architect &amp; Technology Consultant</p>
        <p className="hero-desc">
          10+ years designing scalable software systems, leading engineering teams, and delivering
          production-grade applications for enterprise and government clients. Available for
          architecture consulting, technical leadership, and development engagements.
        </p>
        <a className="hero-cta" href="mailto:james.elliott.pittman@gmail.com">Get in Touch</a>
      </div>
    </div>
  )
}

function Services() {
  const reveal = useReveal()
  return (
    <section className="section" {...reveal}>
      <h2 className="section-title">Services</h2>
      <div className="grid">
        {services.map((s, i) => (
          <div className="card" key={s.title} style={{ transitionDelay: `${i * 80}ms` }}>
            {s.icon}
            <h3 className="card-title">{s.title}</h3>
            <p className="card-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  const reveal = useReveal()
  return (
    <div className="alt-band">
      <section className="section" {...reveal}>
        <h2 className="section-title">Technical Skills</h2>
        {skillGroups.map((g, gi) => (
          <div className="skill-group" key={g.label}>
            <p className="skill-group-label">{g.label}</p>
            <div className="tags">
              {g.skills.map((s, si) => (
                <span className="tag" key={s} style={{ transitionDelay: `${(gi * 5 + si) * 30}ms` }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

function About() {
  const reveal = useReveal()
  return (
    <section className="section" {...reveal}>
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
  const reveal = useReveal()
  return (
    <div className="alt-band">
      <section className="section" {...reveal}>
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
