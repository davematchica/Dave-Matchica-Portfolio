import SectionHeader from '../ui/SectionHeader'
import RevealOnScroll from '../ui/RevealOnScroll'
import { usePortfolio } from '../../context/PortfolioContext'

const CATEGORIES = [
  { key: 'frontend', label: 'Front-End Development', icon: '🎨' },
  { key: 'backend',  label: 'Back-End Development',  icon: '⚙️' },
  { key: 'database', label: 'Database',              icon: '🗄️' },
  { key: 'tools',    label: 'Tools & Platforms',     icon: '🛠️' },
  { key: 'soft',     label: 'Professional Skills',   icon: '🤝' },
]

/**
 * Skills — responsive grid.
 * Mobile:  1 column
 * sm:      2 columns
 * lg:      3 columns
 */
export default function Skills() {
  const { skills } = usePortfolio()
  const byCategory = (key) => skills.filter((s) => s.category === key)

  return (
    <section
      id="skills"
      className="relative z-10 py-20 sm:py-28 lg:py-32 px-4 sm:px-6"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(99,102,241,0.02), transparent)' }}
    >
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <SectionHeader eyebrow="skills & tools" title="Tech Stack &" subtitle="Expertise" />
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {CATEGORIES.map(({ key, label, icon }, i) => {
            const items = byCategory(key)
            if (!items.length) return null
            return (
              <RevealOnScroll key={key} delay={i * 80}>
                <div className="group relative p-5 sm:p-6 bg-surface border border-white/5 rounded-2xl hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-xl sm:text-2xl mb-2">{icon}</div>
                  <h3 className="font-syne font-semibold text-sm mb-3 sm:mb-4 text-white">{label}</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill.id}
                        className={`font-mono text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-1 rounded ${skill.color_class || 'tag-indigo'} transition-all hover:scale-105 cursor-default`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            )
          })}

          {/* Currently Exploring card */}
          <RevealOnScroll delay={CATEGORIES.length * 80}>
            <div className="relative p-5 sm:p-6 bg-surface border border-dashed border-accent/20 rounded-2xl h-full">
              <div className="text-xl sm:text-2xl mb-2">🔭</div>
              <h3 className="font-syne font-semibold text-sm mb-3 sm:mb-4 text-white">Currently Exploring</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['Three.js', 'WebGL', 'Supabase', 'TypeScript', 'Next.js'].map((s) => (
                  <span key={s} className="font-mono text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-1 rounded tag-cyan">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}