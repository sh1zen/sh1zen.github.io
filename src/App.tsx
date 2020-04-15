import { useEffect } from 'react'
import { expertise, profile } from './content'
import { Header } from './components/Header'
import { Icon } from './components/Icon'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'

function useSectionReveals() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    const elements = document.querySelectorAll('.reveal')
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) element.classList.add('is-visible')
      element.classList.add('reveal-ready')
      observer.observe(element)
    })
    return () => {
      observer.disconnect()
      elements.forEach((element) => element.classList.remove('reveal-ready'))
    }
  }, [])
}

export function App() {
  useSectionReveals()
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-landscape" aria-hidden="true">
            <img src="/images/hero-mountains.webp" srcSet="/images/hero-mountains-mobile.webp 768w, /images/hero-mountains.webp 1536w" sizes="100vw" width="1536" height="1024" alt="" fetchPriority="high" />
          </div>
          <div className="hero-inner container">
            <div className="hero-content">
              <p className="hero-kicker">EXPLORE / BUILD / IMPROVE</p>
              <h1 id="hero-title">sh1zen<span className="name-period">.</span></h1>
              <p className="hero-role">Software Engineer</p>
              <p className="hero-introduction">Building useful things. Thinking in systems.<br />From the details of Rust to the possibilities of AI,<br className="desktop-break" /> I follow curiosity and write the code.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">Explore Projects<Icon name="arrow" width="18" height="18" /></a>
                <a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer"><Icon name="github" width="18" height="18" />GitHub Profile<Icon name="arrow-up-right" width="14" height="14" /></a>
              </div>
            </div>
            <blockquote className="hero-quote">“Curiosity<br />builds better<br />software.”</blockquote>
            <div className="hero-baseline">
              <span><Icon name="location" width="16" height="16" />{profile.location}</span>
              <span className="hero-disciplines">OPEN SOURCE · SYSTEMS · AI</span>
            </div>
          </div>
        </section>
        <Projects />
        <section className="about-section section container" id="about" aria-labelledby="about-title">
          <div className="about-layout reveal"><div className="about-heading"><p className="eyebrow">A LITTLE CONTEXT</p><h2 id="about-title">Curiosity is<br />the <span className="text-soft">constant.</span></h2><div className="about-note"><Icon name="branch" width="20" height="20" /><span>Different languages.<br />The same drive to understand.</span></div></div><div className="about-copy"><p className="about-lead">I’m Andrea, a software engineer based in Turin. Online, I go by <a href={profile.github} target="_blank" rel="noreferrer">sh1zen<Icon name="arrow-up-right" width="17" height="17" /></a>.</p><p>I like understanding how things work, then finding a useful way to make them better. That curiosity takes me from concurrent data structures and memory management in Rust to developer tools and modular WordPress plugins.</p><p>My projects explore a common thread: software that makes the work around it simpler. A clearer filesystem view. Better context for a coding agent. A faster website.</p><p>Machine learning and deep learning are an ongoing learning journey. I’m interested in where solid software engineering meets new ways of solving problems.</p><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">Follow the work on GitHub<Icon name="arrow-up-right" width="16" height="16" /></a></div></div>
          <div className="principles reveal"><div><Icon name="layers" /><h3>Think in systems</h3><p>Understand the pieces.<br />Care about how they fit.</p></div><div><Icon name="code" /><h3>Build with purpose</h3><p>Useful software starts<br />with a real problem.</p></div><div><Icon name="branch" /><h3>Keep it open</h3><p>Share the source.<br />Keep learning along the way.</p></div></div>
        </section>
        <section className="expertise-section section container" id="expertise" aria-labelledby="expertise-title"><div className="section-heading reveal"><div><p className="eyebrow">THE TOOLKIT</p><h2 id="expertise-title">The right tool.<br /><span className="text-soft">A thoughtful approach.</span></h2></div><p className="section-intro">Languages I work with. Ideas I explore.<br />Always room for something new.</p></div><div className="expertise-list reveal">{expertise.map((area) => <div className="expertise-row" key={area.number}><span className="expertise-number">{area.number}</span><div className="expertise-area"><h3>{area.title}</h3><p>{area.detail}</p></div><ul className="expertise-skills" aria-label={area.title}>{area.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}</div><p className="expertise-footnote"><span className="status-dot" />Grounded in my public projects and ongoing learning.</p></section>
        <Contact />
      </main>
      <footer className="site-footer"><div className="footer-inner container"><div><a className="footer-wordmark" href="#top">sh1zen<span>.</span></a><span>© {new Date().getUTCFullYear()} Andrea Frolli</span></div><p>Made with care. Built to stay curious.</p><a className="back-to-top" href="#top">Back to top<Icon name="arrow" width="14" height="14" /></a></div></footer>
      <noscript><style>{'.js-only{display:none!important}.main-nav{display:flex!important}@media(max-width:720px){.main-nav{position:static!important;flex-wrap:wrap;gap:12px!important;padding:8px!important;background:none!important;border:0!important}.header-inner{flex-wrap:wrap}.site-header{position:relative}}'}</style></noscript>
    </>
  )
}
