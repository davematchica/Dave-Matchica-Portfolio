import SectionHeader from '../ui/SectionHeader'
import RevealOnScroll from '../ui/RevealOnScroll'
import { usePortfolio } from '../../context/PortfolioContext'

const InfoItem = ({ icon, label, value }) => (
  <li className="flex items-start gap-3 p-3.5 sm:p-4 bg-surface border border-white/5 rounded-xl hover:border-accent/30 hover:translate-x-1 transition-all">
    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-accent/20 to-accent2/10 border border-accent/20 flex items-center justify-center text-sm sm:text-base flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-0.5">{label}</div>
      <div className="text-xs sm:text-sm text-white/80 break-words">{value}</div>
    </div>
  </li>
)

/**
 * About
 * Education InfoItem now reads from CMS (education.degree + education.grad_year)
 * instead of a hardcoded string.
 */
export default function About() {
  const { content } = usePortfolio()
  const a = content.about     || {}
  const e = content.education || {}

  // Build education string from CMS fields
  const eduValue = (() => {
    const degree   = e.degree    || 'BS Information Technology'
    const gradYear = e.grad_year || ''
    return gradYear ? `${degree} — Expected ${gradYear}` : degree
  })()

  return (
    <section id="about" className="relative z-10 py-20 sm:py-28 lg:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <SectionHeader eyebrow="about me" title="The Developer" subtitle="Behind the Code" />
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Bio */}
          <RevealOnScroll delay={100}>
            <div className="space-y-4 text-white/60 leading-relaxed text-sm sm:text-base">
              <p>{a.bio1}</p>
              <p>{a.bio2}</p>
              <p>{a.bio3}</p>
            </div>
            <div className="relative mt-5 p-4 sm:p-5 bg-surface border border-white/5 rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent2" />
              <p className="font-mono text-[10px] text-accent uppercase tracking-widest mb-2">
                // professional strengths
              </p>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{a.strengths}</p>
            </div>
          </RevealOnScroll>

          {/* Info list — education row is now CMS-driven */}
          <RevealOnScroll delay={200}>
            <ul className="space-y-2.5 sm:space-y-3">
              <InfoItem icon="📍" label="Location"  value={a.location} />
              <InfoItem icon="📧" label="Email"     value={a.email} />
              <InfoItem icon="📱" label="Phone"     value={a.phone} />
              <InfoItem icon="🎓" label="Education" value={eduValue} />
              <InfoItem
                icon="💼"
                label="Status"
                value={
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {a.status}
                  </span>
                }
              />
            </ul>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}