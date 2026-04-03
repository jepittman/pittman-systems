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

// ── Social / hero icons ──────────────────────────────────────────────────────

const heroIconProps = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', width: 18, height: 18 }

const SocialIcons = {
  github: (
    <svg {...heroIconProps}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  linkedin: (
    <svg {...heroIconProps}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  mail: (
    <svg {...heroIconProps}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  ),
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
  ai: (
    <svg {...svgProps}>
      <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.4V11h3a3 3 0 0 1 3 3v1.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a1 1 0 0 0-1-1h-3v2.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V13H7a1 1 0 0 0-1 1v1.6C4.8 16.2 4 17.5 4 19a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a3 3 0 0 1 3-3h3V9.4C2.8 8.8 2 7.5 2 6a4 4 0 0 1 4-4" />
    </svg>
  ),
  automation: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
}

// ── Data ─────────────────────────────────────────────────────────────────────

const clients = ['GEICO', 'Sherwin-Williams', 'Charter Communications', 'Deloitte', 'Angi']

const socialLinks = [
  { label: 'GitHub', icon: SocialIcons.github, href: 'https://github.com/jamesPittmanII' },
  { label: 'LinkedIn', icon: SocialIcons.linkedin, href: 'https://www.linkedin.com/in/james-pittman-ii/' },
  { label: 'Email', icon: SocialIcons.mail, href: 'mailto:james.elliott.pittman@gmail.com' },
]

// ── Components ────────────────────────────────────────────────────────────────

const skillGroups = [
  { label: 'Architecture & Leadership', skills: ['Systems Architecture', 'Technical Leadership', 'Event-Driven Architecture', 'Clean Architecture', 'Agile / Scrum'] },
  { label: 'Languages & Frameworks', skills: ['Kotlin', 'Java', 'C#', 'Scala', 'JavaScript', 'HTML/CSS', 'Android SDK', 'Jetpack Compose', 'RxJava'] },
  { label: 'APIs & Backend', skills: ['API Design', 'REST APIs', 'GraphQL', 'Microservices', 'SDK Development', 'Webhooks', 'Retrofit'] },
  { label: 'AI & Machine Learning', skills: ['LLM Integration', 'Prompt Engineering', 'ML Pipelines', 'Bot Frameworks'] },
  { label: 'DevOps & Tools', skills: ['Docker', 'CI/CD', 'Gradle', 'Cloud Integration', 'Git', 'Secure Coding'] },
  { label: 'Patterns', skills: ['MVVM', 'MVP', 'MVI'] },
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
    title: 'AI & ML Integration',
    icon: Icons.ai,
    desc: 'Integration of machine learning models, LLM-powered features, and intelligent automation into existing products and workflows.',
  },
  {
    title: 'Automation & Workflows',
    icon: Icons.automation,
    desc: 'Event-driven architectures, CI/CD pipeline design, and process automation to eliminate manual bottlenecks and accelerate delivery.',
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
        <div className="hero-columns">
          <div className="hero-left">
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              Available for engagements
            </span>
            <h1 className="hero-name">James Pittman</h1>
            <p className="hero-tagline">I architect systems that scale.</p>
            <p className="hero-desc">
              12+ years designing scalable software architectures, automated systems, and API integrations
              for enterprise clients. Proven track record building event-driven workflows, ML-powered
              tooling, and cross-platform system integrations.
            </p>
            <div className="hero-pills">
              {socialLinks.map(l => (
                <a className="hero-pill" key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  {l.icon}
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hero-right">
            <p className="hero-clients-label">Trusted by teams at</p>
            {clients.map(c => (
              <p className="hero-client" key={c}>{c}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <span className="hero-scroll-text">SCROLL</span>
        <svg className="hero-scroll-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
          <polyline points="6 9 12 15 18 9" />
        </svg>
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
          <div className="card" key={s.title} style={{ transitionDelay: `${i * 100}ms` }}>
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
          <div className="skill-group" key={g.label} style={{ transitionDelay: `${gi * 60}ms` }}>
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
        founded by James Pittman — a solutions architect and senior software engineer with over 12 years
        of experience designing and delivering automated systems, API integrations, and ML-powered
        solutions for enterprise and government clients.
      </p>
      <p className="about-text">
        Past engagements include lead architecture and development roles at Sherwin-Williams, GEICO,
        Angi, Charter Communications, and Deloitte Consulting — spanning consumer mobile,
        AI-powered products, enterprise tooling, and government applications for clients including
        the Department of Homeland Security.
      </p>
      <p className="about-text about-education">
        <strong>Education:</strong> BS in Computer Science, University of Southern Mississippi
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
