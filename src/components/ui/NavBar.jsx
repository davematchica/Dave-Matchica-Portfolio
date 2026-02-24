import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { href: '#about',     label: 'About',     index: '01' },
  { href: '#skills',    label: 'Skills',    index: '02' },
  { href: '#projects',  label: 'Projects',  index: '03' },
  { href: '#education', label: 'Education', index: '04' },
  { href: '#contact',   label: 'Contact',   index: '05' },
]

/**
 * NavBar — fully theme-aware.
 *
 * All colors come from CSS custom properties so dark ↔ light
 * switching works instantly at every scroll position.
 *
 * Key fix: --nav-bg-scrolled is set per theme in index.css:
 *   dark  → rgba(10,10,15,0.92)   near-black frosted
 *   light → rgba(248,248,252,0.92) near-white frosted
 */
export default function NavBar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNav = (href) => {
    setMobileOpen(false)
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const active = scrolled || mobileOpen

  return (
    <>
      {/* ── Main nav bar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background:    active ? 'var(--nav-bg-scrolled)' : 'transparent',
          backdropFilter: active ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: active ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom:  active
            ? '1px solid var(--color-border)'
            : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => handleNav('#hero')}
            className="font-syne font-black text-lg tracking-tight z-10 transition-colors duration-300"
            style={{ color: 'var(--color-text-primary)' }}
          >
            dave<span className="text-accent">.</span>dev
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map(({ href, label, index }) => (
              <li key={href}>
                <button
                  onClick={() => handleNav(href)}
                  className="font-mono text-xs tracking-wider transition-colors duration-200"
                  style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--nav-link-hover)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
                >
                  <span className="text-accent mr-1">{index}</span>
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop: toggle + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="mailto:devvkun@gmail.com"
              className="inline-flex items-center px-4 py-2 border border-accent text-accent font-mono text-xs rounded hover:bg-accent hover:text-white transition-all duration-200"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2 z-10">
            <ThemeToggle size="sm" />
            <button
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span
                className={`block w-5 h-px transition-all duration-300 origin-center
                  ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`}
                style={{ background: 'var(--color-text-primary)' }}
              />
              <span
                className={`block w-5 h-px transition-all duration-300
                  ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`}
                style={{ background: 'var(--color-text-primary)' }}
              />
              <span
                className={`block w-5 h-px transition-all duration-300 origin-center
                  ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`}
                style={{ background: 'var(--color-text-primary)' }}
              />
            </button>
          </div>

        </div>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6
                    transition-all duration-300 md:hidden
                    ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{
          background: 'var(--color-bg)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {NAV_LINKS.map(({ href, label, index }, i) => (
          <button
            key={href}
            onClick={() => handleNav(href)}
            className="font-syne font-bold text-3xl transition-all duration-200 hover:scale-105"
            style={{
              color: 'var(--color-text-secondary)',
              transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#6366f1' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-secondary)' }}
          >
            <span className="text-accent font-mono text-base mr-3">{index}</span>
            {label}
          </button>
        ))}

        <a
          href="mailto:devvkun@gmail.com"
          onClick={() => setMobileOpen(false)}
          className="mt-4 px-8 py-3 bg-accent text-white font-mono text-sm rounded-xl hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] transition-all"
        >
          Hire Me →
        </a>
      </div>
    </>
  )
}