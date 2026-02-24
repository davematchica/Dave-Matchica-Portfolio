import { usePortfolio } from '../../context/PortfolioContext'

/* ─────────────────────────────────────────────
   Chip — reusable floating label
   Uses CSS variables so it responds to theme instantly.
───────────────────────────────────────────── */
function Chip({ icon, label, accentColor, borderOpacity = 0.28, style = {} }) {
  return (
    <div
      className="absolute flex items-center gap-1.5 font-mono whitespace-nowrap"
      style={{
        background:    'var(--chip-bg)',
        backdropFilter:'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border:        `1px solid ${accentColor.replace(')', `, ${borderOpacity})`).replace('rgb', 'rgba')}`,
        borderRadius:  10,
        padding:       '6px 11px',
        fontSize:      10,
        color:         accentColor,
        boxShadow:     '0 4px 16px rgba(0,0,0,0.15)',
        zIndex:        10,
        ...style,
      }}
    >
      <span style={{ fontSize: 12 }}>{icon}</span>
      <span style={{ color: 'var(--chip-text)' }}>{label}</span>
    </div>
  )
}

/* Status badge — always green, theme-aware background */
function StatusBadge({ style = {} }) {
  return (
    <div
      className="absolute flex items-center gap-1.5 font-mono whitespace-nowrap"
      style={{
        background:    'var(--chip-bg-solid)',
        backdropFilter:'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border:        '1px solid rgba(52,211,153,0.4)',
        borderRadius:  99,
        padding:       '4px 12px',
        fontSize:      10,
        color:         '#10b981',
        boxShadow:     '0 4px 16px rgba(0,0,0,0.12)',
        zIndex:        10,
        ...style,
      }}
    >
      <span style={{
        width: 6, height: 6, borderRadius: '50%', display: 'block', flexShrink: 0,
        background: '#10b981',
        boxShadow: '0 0 6px rgba(16,185,129,0.8)',
        animation: 'pulse2 2.5s ease-in-out infinite',
      }} />
      Available for hire
    </div>
  )
}

/* ─────────────────────────────────────────────
   MobileAvatar — circular
───────────────────────────────────────────── */
function MobileAvatar({ url, initial, roleChip, yearChip }) {
  return (
    <div className="relative flex items-center justify-center"
      style={{ width: 260, height: 230 }}>

      {/* Soft bloom */}
      <div className="absolute pointer-events-none" style={{
        width: 160, height: 160,
        top: 16, left: '50%', transform: 'translateX(-50%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
        filter: 'blur(18px)',
        animation: 'breathe 5s ease-in-out infinite',
      }} />

      {/* Gradient border ring */}
      <div className="absolute pointer-events-none" style={{
        width: 148, height: 148,
        top: 12, left: '50%', transform: 'translateX(-50%)',
        borderRadius: '50%', padding: 2,
        background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 50%, #a78bfa 100%)',
      }}>
        {/* Inner fill uses bg-color variable */}
        <div className="w-full h-full rounded-full"
          style={{ background: 'var(--color-bg)' }} />
      </div>

      {/* Photo */}
      <div className="absolute overflow-hidden rounded-full" style={{
        width: 134, height: 134,
        top: 20, left: '50%', transform: 'translateX(-50%)',
        zIndex: 4,
        boxShadow: '0 8px 32px rgba(99,102,241,0.25), 0 2px 8px rgba(0,0,0,0.3)',
      }}>
        {url
          ? <img src={url} alt={initial} className="w-full h-full object-cover"
              style={{ objectPosition: 'center 10%' }} />
          : <div className="w-full h-full flex items-center justify-center font-syne font-black text-accent text-5xl select-none"
              style={{ background: 'var(--color-surface)' }}>{initial}</div>
        }
      </div>

      {/* Top-right chip: role */}
      <Chip
        icon="💻" label={roleChip} accentColor="rgb(34,211,238)"
        style={{ top: 8, right: 0, animation: 'float 6s ease-in-out infinite' }}
      />

      {/* Left chip: year */}
      <Chip
        icon="🎓" label={yearChip} accentColor="rgb(99,102,241)"
        style={{ top: '38%', left: 0, animation: 'float 6s 1s ease-in-out infinite' }}
      />

      {/* Bottom: status */}
      <StatusBadge style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)' }} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   DesktopAvatar — square card
───────────────────────────────────────────── */
function DesktopAvatar({ url, initial, roleChip, yearChip, locationChip }) {
  const SIZE = 300

  return (
    <div className="relative flex-shrink-0" style={{
      width: SIZE + 100, height: SIZE + 120,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'float 6s ease-in-out infinite',
    }}>

      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{
        width: SIZE + 80, height: SIZE + 80, borderRadius: 32,
        background: 'radial-gradient(ellipse at 40% 40%, rgba(99,102,241,0.2) 0%, rgba(34,211,238,0.07) 50%, transparent 75%)',
        filter: 'blur(28px)',
        animation: 'breathe 6s ease-in-out infinite',
      }} />

      {/* Gradient border */}
      <div className="absolute pointer-events-none" style={{
        width: SIZE + 4, height: SIZE + 4, borderRadius: 24, padding: 1.5,
        background: 'linear-gradient(135deg, rgba(99,102,241,0.8) 0%, rgba(34,211,238,0.5) 40%, rgba(167,139,250,0.6) 70%, rgba(99,102,241,0.4) 100%)',
        zIndex: 3,
      }}>
        {/* Card border inner fill — theme-aware */}
        <div className="w-full h-full" style={{ borderRadius: 23, background: 'var(--color-bg)' }} />
      </div>

      {/* Photo card */}
      <div className="relative overflow-hidden" style={{
        width: SIZE, height: SIZE, borderRadius: 22, zIndex: 4,
        background: 'var(--color-surface)',
        boxShadow: '0 0 0 1px rgba(99,102,241,0.15), 0 24px 64px rgba(0,0,0,0.3), 0 8px 24px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
        transition: 'box-shadow 0.3s ease',
      }}>
        {url
          ? <img src={url} alt={initial} className="w-full h-full object-cover"
              style={{ objectPosition: 'center 10%', transition: 'opacity 0.4s ease' }} />
          : <div className="w-full h-full flex items-center justify-center font-syne font-black text-accent select-none"
              style={{ fontSize: '6rem' }}>{initial}</div>
        }

        {/* Bottom vignette — theme-aware */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
          height: 90,
          background: 'linear-gradient(to top, var(--chip-vignette) 0%, transparent 100%)',
        }} />

        {/* Corner brackets */}
        <div className="absolute top-0 left-0 pointer-events-none"     style={{ width:36,height:36,borderTop:'2px solid rgba(99,102,241,0.7)',borderLeft:'2px solid rgba(99,102,241,0.7)',borderRadius:'22px 0 0 0' }}/>
        <div className="absolute top-0 right-0 pointer-events-none"    style={{ width:36,height:36,borderTop:'2px solid rgba(34,211,238,0.6)',borderRight:'2px solid rgba(34,211,238,0.6)',borderRadius:'0 22px 0 0' }}/>
        <div className="absolute bottom-0 left-0 pointer-events-none"  style={{ width:36,height:36,borderBottom:'2px solid rgba(167,139,250,0.5)',borderLeft:'2px solid rgba(167,139,250,0.5)',borderRadius:'0 0 0 22px' }}/>
        <div className="absolute bottom-0 right-0 pointer-events-none" style={{ width:36,height:36,borderBottom:'2px solid rgba(99,102,241,0.4)',borderRight:'2px solid rgba(99,102,241,0.4)',borderRadius:'0 0 22px 0' }}/>
      </div>

      {/* Status badge */}
      <StatusBadge style={{ bottom: 16, left: '50%', transform: 'translateX(-50%)' }} />

      {/* Floating chips */}
      <Chip
        icon="💻" label={roleChip} accentColor="rgb(34,211,238)"
        style={{ top: '14%', right: -8, animation: 'float 7s 0s ease-in-out infinite' }}
      />
      <Chip
        icon="🎓" label={yearChip} accentColor="rgb(99,102,241)"
        style={{ top: '38%', left: -8, animation: 'float 7s 1s ease-in-out infinite' }}
      />
      <Chip
        icon="📍" label={locationChip} accentColor="rgb(167,139,250)"
        style={{ bottom: '18%', left: -8, animation: 'float 7s 2s ease-in-out infinite' }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Hero — main section
───────────────────────────────────────────── */
export default function Hero() {
  const { content } = usePortfolio()
  const h = content.hero      || {}
  const e = content.education || {}
  const a = content.about     || {}

  const handleScroll = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  const initial = h.name?.[0] ?? 'D'

  const roleChip = (() => {
    const role = h.role || 'Web Developer'
    const cut  = role.split(/\s*[&|and]\s*/i)[0].trim()
    return cut.length > 18 ? cut.split(' ').slice(0, 2).join(' ') : cut
  })()

  const yearChip     = e.academic_year || 'IT Student'
  const locationChip = (() => {
    const loc   = a.location || 'Philippines'
    const parts = loc.split(',').map(s => s.trim())
    return parts[parts.length - 1] || loc
  })()

  return (
    <section id="hero" className="relative min-h-screen flex items-center z-10"
      style={{ padding: '96px 0 80px' }}>
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center"
        style={{ padding: '0 20px' }}>

        {/* Text column */}
        <div className="min-w-0 text-center md:text-left">

          {/* Mobile avatar */}
          <div className="flex justify-center mb-12 md:hidden [animation:fadeUp_0.6s_ease_both]">
            <MobileAvatar url={h.avatar_url} initial={initial} roleChip={roleChip} yearChip={yearChip} />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent2 border border-accent2/30 px-3 py-1.5 rounded-full mb-4 [animation:fadeUp_0.65s_ease_both]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent2 flex-shrink-0 [animation:pulse2_2s_ease-in-out_infinite]" />
            Available for opportunities
          </div>

          {/* Name */}
          <h1 className="font-syne font-black tracking-tight mb-3 break-words [animation:fadeUp_0.7s_0.1s_ease_both]"
            style={{ fontSize: 'clamp(2.2rem, 10vw, 5rem)', lineHeight: 1.05, color: 'var(--color-text-primary)' }}>
            {h.name?.split(' ').slice(0, -1).join(' ') || 'Dave E.'}
            <br />
            <span className="gradient-text">{h.name?.split(' ').slice(-1)[0] || 'Matchica'}</span>
          </h1>

          {/* Role */}
          <p className="font-mono mb-3 [animation:fadeUp_0.7s_0.2s_ease_both]"
            style={{ fontSize: 'clamp(0.65rem, 2.5vw, 0.875rem)', color: 'var(--color-text-muted)' }}>
            <span className="text-accent3">~/</span>{' '}
            {h.role || 'IT Student & Aspiring Web Developer'}
          </p>

          {/* Tagline */}
          <p className="leading-relaxed mb-8 mx-auto md:mx-0 max-w-lg [animation:fadeUp_0.7s_0.3s_ease_both]"
            style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.125rem)', color: 'var(--color-text-secondary)' }}>
            {h.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row flex-wrap justify-center md:justify-start gap-2 sm:gap-3 mb-10 [animation:fadeUp_0.7s_0.4s_ease_both]">
            <button onClick={() => handleScroll('#projects')}
              className="inline-flex items-center justify-center gap-1.5 bg-accent text-white rounded-lg font-medium hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)] transition-all"
              style={{ padding: 'clamp(8px,2vw,12px) clamp(14px,3vw,24px)', fontSize: 'clamp(0.7rem,2vw,0.875rem)' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              View Projects
            </button>
            <button onClick={() => handleScroll('#contact')}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg font-medium hover:-translate-y-0.5 transition-all"
              style={{
                padding: 'clamp(8px,2vw,12px) clamp(14px,3vw,24px)',
                fontSize: 'clamp(0.7rem,2vw,0.875rem)',
                border: '1px solid var(--color-border-hover)',
                color: 'var(--color-text-primary)',
              }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/><path d="m22 6-10 7L2 6"/></svg>
              Contact Me
            </button>
            <a href="mailto:devvkun@gmail.com"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg font-medium hover:-translate-y-0.5 transition-all"
              style={{
                padding: 'clamp(8px,2vw,12px) clamp(14px,3vw,24px)',
                fontSize: 'clamp(0.7rem,2vw,0.875rem)',
                border: '1px solid var(--color-border-hover)',
                color: 'var(--color-text-primary)',
              }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download CV
            </a>
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-6 sm:gap-10 pt-6 [animation:fadeUp_0.7s_0.5s_ease_both]"
            style={{ borderTop: '1px solid var(--color-border)' }}>
            {[
              { num: h.stat1_num, label: h.stat1_label },
              { num: h.stat2_num, label: h.stat2_label },
              { num: h.stat3_num, label: h.stat3_label },
            ].map(({ num, label }) => num ? (
              <div key={label}>
                <div className="font-syne font-bold gradient-text"
                  style={{ fontSize: 'clamp(1.4rem,5vw,2rem)' }}>{num}</div>
                <div className="font-mono mt-0.5 uppercase tracking-widest"
                  style={{ fontSize: 'clamp(8px,1.5vw,10px)', color: 'var(--color-text-muted)' }}>{label}</div>
              </div>
            ) : null)}
          </div>
        </div>

        {/* Desktop avatar */}
        <div className="hidden md:flex items-center justify-center pr-12 [animation:fadeUp_0.8s_0.3s_ease_both]">
          <DesktopAvatar
            url={h.avatar_url} initial={initial}
            roleChip={roleChip} yearChip={yearChip} locationChip={locationChip}
          />
        </div>

      </div>
    </section>
  )
}