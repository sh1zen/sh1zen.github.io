import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { profile } from '../content'
import { Icon } from './Icon'

const links = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'contact', label: 'Contact' },
]

function subscribeTheme(callback: () => void) {
  window.addEventListener('portfolio-theme-change', callback)
  return () => window.removeEventListener('portfolio-theme-change', callback)
}

function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, () => document.documentElement.dataset.theme, () => 'dark')

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#f7f7f5' : '#111113')
    try { localStorage.setItem('portfolio-theme', next) } catch { /* Switching still works without storage. */ }
    window.dispatchEvent(new Event('portfolio-theme-change'))
  }

  return <button className="icon-button theme-toggle js-only" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}><Icon name={theme === 'light' ? 'moon' : 'sun'} /></button>
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const toggleRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
    }, { rootMargin: '-15% 0px -65% 0px' })
    document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    function onOutside(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onOutside)
    }
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="header-inner container" ref={headerRef}>
        <a className="wordmark" href="#top" aria-label="sh1zen. — Back to top" onClick={() => setMenuOpen(false)}><span className="brand-symbol"><Icon name="code" width="23" height="23" /></span>sh1zen<span className="wordmark-dot">.</span></a>
        <nav id="primary-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {links.map(({ id, label }) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} aria-current={active === id ? 'location' : undefined}>{label}</a>)}
        </nav>
        <div className="header-actions"><ThemeToggle /><a className="header-github" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile (opens in a new tab)"><Icon name="github" width="18" height="18" /></a><button type="button" ref={toggleRef} className="icon-button menu-toggle js-only" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-controls="primary-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button></div>
      </div>
    </header>
  )
}
