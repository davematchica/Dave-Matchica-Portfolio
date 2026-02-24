import SectionHeader from '../ui/SectionHeader'
import RevealOnScroll from '../ui/RevealOnScroll'
import { usePortfolio } from '../../context/PortfolioContext'

/**
 * Education
 * All values — including stat cards — pulled from CMS.
 * Fields: school, degree, period, description,
 *         academic_year, grad_year, focus_area
 */
export default function Education() {
  const { content } = usePortfolio()
  const e = content.education || {}

  // Stat card values from CMS with sensible fallbacks
  const statCards = [
    { icon: '🏆', label: 'Academic Year',  value: e.academic_year || '—' },
    { icon: '📅', label: 'Expected Grad',  value: e.grad_year     || '—' },
    { icon: '💻', label: 'Focus Area',     value: e.focus_area    || '—' },
  ]

  // Relevant skill tags — driven by degree field keywords, or fallback list
  const skillTags = ['Web Development', 'Database Management', 'Software Engineering', 'Systems Analysis']

  return (
    <section
      id="education"
      className="relative z-10 py-20 sm:py-28 lg:py-32 px-4 sm:px-6"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(34,211,238,0.02), transparent)' }}
    >
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <SectionHeader eyebrow="background" title="Academic" subtitle="Journey" />
        </RevealOnScroll>

        {/* Timeline */}
        <RevealOnScroll delay={100}>
          <div className="relative max-w-2xl">
            <div className="absolute left-[21px] top-11 bottom-0 w-px bg-gradient-to-b from-accent via-accent2 to-transparent" />

            <div className="flex gap-4 sm:gap-8 items-start">
              <div className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 rounded-xl bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-lg sm:text-xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                🎓
              </div>

              <div className="flex-1 relative p-4 sm:p-6 bg-surface border border-white/5 rounded-2xl hover:border-accent/20 transition-colors overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent2" />

                <p className="font-mono text-[10px] sm:text-xs text-accent2 mb-2">{e.period || '—'}</p>
                <h3 className="font-syne font-bold text-base sm:text-xl mb-1 leading-snug">{e.school || '—'}</h3>
                <p className="text-accent font-medium text-xs sm:text-sm mb-2 sm:mb-3">{e.degree || '—'}</p>
                <p className="text-xs sm:text-sm text-white/55 leading-relaxed">{e.description}</p>

                <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-1.5">
                  {skillTags.map((tag) => (
                    <span key={tag} className="font-mono text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded tag-indigo">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Stat cards — fully CMS-driven */}
        <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl">
          {statCards.map(({ icon, label, value }) => (
            <RevealOnScroll key={label} delay={200}>
              <div className="p-3 sm:p-4 bg-surface border border-white/5 rounded-xl text-center hover:border-accent/20 transition-colors">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{icon}</div>
                <div className="font-mono text-[8px] sm:text-[10px] text-white/30 uppercase tracking-widest mb-0.5 sm:mb-1">{label}</div>
                <div className="font-syne font-bold text-sm sm:text-base">{value}</div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}