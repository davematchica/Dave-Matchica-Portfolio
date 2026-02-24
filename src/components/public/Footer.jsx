import { Link } from 'react-router-dom'

/**
 * Footer
 * Theme toggle removed — it lives in the NavBar.
 * Admin gear icon is the only interactive element here.
 */
export default function Footer() {
  return (
    <footer
      className="relative z-10 px-4 sm:px-6 py-5 sm:py-6"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">

        {/* Credit */}
        <p className="font-mono text-[10px] sm:text-xs"
          style={{ color: 'var(--color-text-muted)' }}>
          Designed &amp; built by{' '}
          <span className="text-accent">Dave E. Matchica</span>
          {' · '}
          <span className="text-accent2">{new Date().getFullYear()}</span>
        </p>

        {/* Right: tagline + subtle admin gear */}
        <div className="flex items-center gap-3">
          <p className="font-mono text-[10px] sm:text-xs hidden sm:block"
            style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}>
            Built with ♥ and lots of ☕
          </p>

          {/* Admin gear — ultra-subtle, no label */}
          <Link
            to="/admin"
            title="Admin"
            aria-label="Admin Panel"
            className="flex items-center justify-center rounded-lg transition-all duration-200"
            style={{
              width: 28, height: 28,
              color: 'var(--color-text-muted)',
              opacity: 0.4,
              border: '1px solid transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.color = '#6366f1'
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'
              e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '0.4'
              e.currentTarget.style.color = 'var(--color-text-muted)'
              e.currentTarget.style.borderColor = 'transparent'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </Link>
        </div>

      </div>
    </footer>
  )
}