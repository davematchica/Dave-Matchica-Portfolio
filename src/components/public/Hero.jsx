import { usePortfolio } from '../../context/PortfolioContext'

/* ─────────────────────────────────────────────
   MobileAvatar
   - Photo cropped from top-center so face shows
   - Three floating info chips around the circle
   - Subtle glow + gradient border ring
───────────────────────────────────────────── */
function MobileAvatar({ url, initial }) {
  return (
    /* Outer wrapper — tall enough for chips above/below */
    <div className="relative flex items-center justify-center"
      style={{ width: 260, height: 230 }}>

      {/* ── Soft bloom ── */}
      <div className="absolute pointer-events-none" style={{
        width: 160, height: 160,
        top: 16,
        left: '50%', transform: 'translateX(-50%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
        filter: 'blur(18px)',
        animation: 'breathe 5s ease-in-out infinite',
      }} />

      {/* ── Gradient border ring ── */}
      <div className="absolute pointer-events-none" style={{
        width: 148, height: 148,
        top: 12, left: '50%', transform: 'translateX(-50%)',
        borderRadius: '50%', padding: 2,
        background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 50%, #a78bfa 100%)',
      }}>
        <div className="w-full h-full rounded-full" style={{ background: '#0a0a0f' }} />
      </div>

      {/* ── Photo ── */}
      <div className="absolute overflow-hidden rounded-full" style={{
        width: 134, height: 134,
        top: 20, left: '50%', transform: 'translateX(-50%)',
        zIndex: 4,
        boxShadow: '0 8px 32px rgba(99,102,241,0.25), 0 2px 8px rgba(0,0,0,0.5)',
      }}>
        {url
          ? <img src={url} alt={initial}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 10%' }}   /* show face, not chest */
            />
          : <div className="w-full h-full flex items-center justify-center font-syne font-black text-accent text-5xl select-none"
              style={{ background: 'linear-gradient(135deg,#1a1a2e,#16213e)' }}>{initial}</div>
        }
      </div>

      {/* ── Floating chips ── */}

      {/* Top-right: role */}
      <div className="absolute flex items-center gap-1.5 font-mono whitespace-nowrap" style={{
        top: 8, right: 0, zIndex: 10,
        background: 'rgba(8,8,18,0.88)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(34,211,238,0.28)', borderRadius: 8,
        padding: '5px 10px', fontSize: 10, color: '#22d3ee',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        animation: 'float 6s ease-in-out infinite',
      }}>
        <span>💻</span> Web Dev
      </div>

      {/* Left-middle: year */}
      <div className="absolute flex items-center gap-1.5 font-mono whitespace-nowrap" style={{
        top: '38%', left: 0, zIndex: 10,
        background: 'rgba(8,8,18,0.88)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(99,102,241,0.28)', borderRadius: 8,
        padding: '5px 10px', fontSize: 10, color: '#818cf8',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        animation: 'float 6s 1s ease-in-out infinite',
      }}>
        <span>🎓</span> 4th Year IT
      </div>

      {/* Bottom: status badge */}
      <div className="absolute flex items-center gap-1.5 font-mono whitespace-nowrap" style={{
        bottom: 0, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(8,8,18,0.9)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(52,211,153,0.35)', borderRadius: 99,
        padding: '4px 12px', fontSize: 10, color: '#34d399', zIndex: 10,
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
      }}>
        <span style={{
          width: 5, height: 5, borderRadius: '50%', display: 'block', flexShrink: 0,
          background: '#34d399', boxShadow: '0 0 6px rgba(52,211,153,1)',
          animation: 'pulse2 2.5s ease-in-out infinite',
        }} />
        Available for hire
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   DesktopAvatar — square, professional, minimal
───────────────────────────────────────────── */
function DesktopAvatar({ url, initial }) {
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
        background: 'radial-gradient(ellipse at 40% 40%, rgba(99,102,241,0.22) 0%, rgba(34,211,238,0.08) 50%, transparent 75%)',
        filter: 'blur(28px)',
        animation: 'breathe 6s ease-in-out infinite',
      }} />
      {/* Static gradient border */}
      <div className="absolute pointer-events-none" style={{
        width: SIZE + 4, height: SIZE + 4, borderRadius: 24, padding: 1.5,
        background: 'linear-gradient(135deg, rgba(99,102,241,0.8) 0%, rgba(34,211,238,0.5) 40%, rgba(167,139,250,0.6) 70%, rgba(99,102,241,0.4) 100%)',
        zIndex: 3,
      }}>
        <div className="w-full h-full" style={{ borderRadius: 23, background: '#0a0a0f' }} />
      </div>
      {/* Card */}
      <div className="relative overflow-hidden" style={{
        width: SIZE, height: SIZE, borderRadius: 22, zIndex: 4,
        background: 'linear-gradient(160deg, #111120 0%, #0c1220 100%)',
        boxShadow: '0 0 0 1px rgba(99,102,241,0.2), 0 24px 64px rgba(0,0,0,0.5), 0 8px 24px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>
        {url
          ? <img src={url} alt={initial} className="w-full h-full object-cover"
              style={{ objectPosition: 'center 10%', transition: 'opacity 0.4s ease' }} />
          : <div className="w-full h-full flex items-center justify-center font-syne font-black text-accent select-none"
              style={{ fontSize: '6rem', background: 'linear-gradient(135deg,#1a1a2e,#16213e)' }}>{initial}</div>
        }
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: 90, background: 'linear-gradient(to top, rgba(8,8,18,0.75) 0%, transparent 100%)' }} />
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 pointer-events-none"     style={{ width:36,height:36,borderTop:'2px solid rgba(99,102,241,0.7)',borderLeft:'2px solid rgba(99,102,241,0.7)',borderRadius:'22px 0 0 0' }}/>
        <div className="absolute top-0 right-0 pointer-events-none"    style={{ width:36,height:36,borderTop:'2px solid rgba(34,211,238,0.6)',borderRight:'2px solid rgba(34,211,238,0.6)',borderRadius:'0 22px 0 0' }}/>
        <div className="absolute bottom-0 left-0 pointer-events-none"  style={{ width:36,height:36,borderBottom:'2px solid rgba(167,139,250,0.5)',borderLeft:'2px solid rgba(167,139,250,0.5)',borderRadius:'0 0 0 22px' }}/>
        <div className="absolute bottom-0 right-0 pointer-events-none" style={{ width:36,height:36,borderBottom:'2px solid rgba(99,102,241,0.4)',borderRight:'2px solid rgba(99,102,241,0.4)',borderRadius:'0 0 22px 0' }}/>
      </div>
      {/* Status badge */}
      <div className="absolute flex items-center gap-2 font-mono whitespace-nowrap" style={{
        bottom: 16, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(8,8,18,0.9)', backdropFilter: 'blur(16px)',
        border: '1px solid rgba(52,211,153,0.3)', borderRadius: 99,
        padding: '5px 14px', fontSize: 11, color: '#34d399', zIndex: 10,
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      }}>
        <span style={{ width:7,height:7,borderRadius:'50%',display:'block',flexShrink:0,background:'#34d399',boxShadow:'0 0 6px rgba(52,211,153,0.8)',animation:'pulse2 2.5s ease-in-out infinite' }} />
        Available for hire
      </div>
      {/* Chips */}
      {[
        { top:'14%',   right:-8,   border:'rgba(34,211,238,0.25)',  color:'#22d3ee', delay:'0s', icon:'💻', label:'Web Developer' },
        { top:'38%',   left:-8,    border:'rgba(99,102,241,0.25)',  color:'#818cf8', delay:'1s', icon:'🎓', label:'4th Year IT' },
        { bottom:'18%',left:-8,    border:'rgba(167,139,250,0.25)', color:'#a78bfa', delay:'2s', icon:'📍', label:'Philippines' },
      ].map(({ icon, label, color, border, delay, ...pos }) => (
        <div key={label} style={{
          position:'absolute', zIndex:10, ...pos,
          display:'flex', alignItems:'center', gap:8,
          background:'rgba(8,8,18,0.88)', backdropFilter:'blur(14px)',
          border:`1px solid ${border}`, borderRadius:10, padding:'7px 13px',
          fontFamily:'"DM Mono", monospace', fontSize:11, color,
          boxShadow:'0 4px 20px rgba(0,0,0,0.4)',
          animation:`float 7s ${delay} ease-in-out infinite`,
        }}>
          <span style={{ fontSize:13 }}>{icon}</span>{label}
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Hero — main section
───────────────────────────────────────────── */
export default function Hero() {
  const { content } = usePortfolio()
  const h = content.hero || {}

  const handleScroll = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  const initial = h.name?.[0] ?? 'D'

  return (
    <section id="hero" className="relative min-h-screen flex items-center z-10"
      style={{ padding: '96px 0 80px' }}>
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center"
        style={{ padding: '0 20px' }}>

        {/* ── Text column ── */}
        <div className="min-w-0 text-center md:text-left">

          {/* Mobile avatar — extra top margin so chips don't hide under nav */}
          <div className="flex justify-center mb-12 md:hidden [animation:fadeUp_0.6s_ease_both]">
            <MobileAvatar url={h.avatar_url} initial={initial} />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent2 border border-accent2/30 px-3 py-1.5 rounded-full mb-4 [animation:fadeUp_0.65s_ease_both]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent2 flex-shrink-0 [animation:pulse2_2s_ease-in-out_infinite]" />
            Available for opportunities
          </div>

          {/* Name */}
          <h1 className="font-syne font-black tracking-tight mb-3 break-words [animation:fadeUp_0.7s_0.1s_ease_both]"
            style={{ fontSize: 'clamp(2.2rem, 10vw, 5rem)', lineHeight: 1.05 }}>
            {h.name?.split(' ').slice(0, -1).join(' ') || 'Dave E.'}
            <br />
            <span className="gradient-text">{h.name?.split(' ').slice(-1)[0] || 'Matchica'}</span>
          </h1>

          {/* Role */}
          <p className="font-mono text-white/50 mb-3 [animation:fadeUp_0.7s_0.2s_ease_both]"
            style={{ fontSize: 'clamp(0.65rem, 2.5vw, 0.875rem)' }}>
            <span className="text-accent3">~/</span>{' '}
            {h.role || 'IT Student & Aspiring Web Developer'}
          </p>

          {/* Tagline */}
          <p className="text-white/60 leading-relaxed mb-8 mx-auto md:mx-0 max-w-lg [animation:fadeUp_0.7s_0.3s_ease_both]"
            style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.125rem)' }}>
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
              className="inline-flex items-center justify-center gap-1.5 border border-white/15 text-white rounded-lg font-medium hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all"
              style={{ padding: 'clamp(8px,2vw,12px) clamp(14px,3vw,24px)', fontSize: 'clamp(0.7rem,2vw,0.875rem)' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/><path d="m22 6-10 7L2 6"/></svg>
              Contact Me
            </button>
            <a href="mailto:devvkun@gmail.com"
              className="inline-flex items-center justify-center gap-1.5 border border-white/15 text-white rounded-lg font-medium hover:border-accent2 hover:text-accent2 hover:-translate-y-0.5 transition-all"
              style={{ padding: 'clamp(8px,2vw,12px) clamp(14px,3vw,24px)', fontSize: 'clamp(0.7rem,2vw,0.875rem)' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download CV
            </a>
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-6 sm:gap-10 pt-6 border-t border-white/5 [animation:fadeUp_0.7s_0.5s_ease_both]">
            {[
              { num: h.stat1_num, label: h.stat1_label },
              { num: h.stat2_num, label: h.stat2_label },
              { num: h.stat3_num, label: h.stat3_label },
            ].map(({ num, label }) => num ? (
              <div key={label}>
                <div className="font-syne font-bold gradient-text"
                  style={{ fontSize: 'clamp(1.4rem,5vw,2rem)' }}>{num}</div>
                <div className="font-mono text-white/30 mt-0.5 uppercase tracking-widest"
                  style={{ fontSize: 'clamp(8px,1.5vw,10px)' }}>{label}</div>
              </div>
            ) : null)}
          </div>
        </div>

        {/* ── Desktop avatar ── */}
        <div className="hidden md:flex items-center justify-center pr-12 [animation:fadeUp_0.8s_0.3s_ease_both]">
          <DesktopAvatar url={h.avatar_url} initial={initial} />
        </div>

      </div>
    </section>
  )
}