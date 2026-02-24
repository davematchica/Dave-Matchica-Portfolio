import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#about',     label: 'About',     index: '01' },
  { href: '#skills',    label: 'Skills',    index: '02' },
  { href: '#projects',  label: 'Projects',  index: '03' },
  { href: '#education', label: 'Education', index: '04' },
  { href: '#contact',   label: 'Contact',   index: '05' },
]

/**
 * NavBar — responsive with hamburger menu for mobile.
 * Mobile:  hamburger toggles full-width dropdown
 * Desktop: inline links + hire-me CTA
 */
export default function NavBar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNav = (href) => {
    setMobileOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-bg/90 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => handleNav('#hero')}
            className="font-syne font-black text-lg tracking-tight z-10"
          >
            dave<span className="text-accent">.</span>dev
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map(({ href, label, index }) => (
              <li key={href}>
                <button
                  onClick={() => handleNav(href)}
                  className="font-mono text-xs text-white/40 hover:text-white transition-colors tracking-wider"
                >
                  <span className="text-accent mr-1">{index}</span>
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="mailto:devvkun@gmail.com"
            className="hidden md:inline-flex items-center px-4 py-2 border border-accent text-accent font-mono text-xs rounded hover:bg-accent hover:text-white transition-all"
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <span className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen menu ── */}
      <div
        className={`fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6
                    transition-all duration-300 md:hidden
                    ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {NAV_LINKS.map(({ href, label, index }, i) => (
          <button
            key={href}
            onClick={() => handleNav(href)}
            className="font-syne font-bold text-3xl text-white/60 hover:text-white transition-all hover:scale-105"
            style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms' }}
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