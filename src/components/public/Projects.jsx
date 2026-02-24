import SectionHeader from '../ui/SectionHeader'
import RevealOnScroll from '../ui/RevealOnScroll'
import { usePortfolio } from '../../context/PortfolioContext'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

/**
 * ProjectCard — individual project tile.
 * Full width on mobile, side-by-side from sm, three-up from lg.
 */
function ProjectCard({ project, index }) {
  const { title, description, tech_stack, demo_url, github_url, emoji, accent_color } = project

  return (
    <div className="group relative flex flex-col bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(99,102,241,0.12)] transition-all duration-300 h-full">

      {/* Preview area */}
      <div
        className="relative h-36 sm:h-44 flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #13131f, #16213e)' }}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(${accent_color}55 1px, transparent 1px), linear-gradient(90deg, ${accent_color}55 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
        <span className="text-4xl sm:text-5xl z-10 drop-shadow-lg">{emoji}</span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-6">
        <p className="font-mono text-[10px] text-white/25 mb-1">
          // project {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="font-syne font-bold text-base sm:text-lg mb-2 sm:mb-3 text-white leading-snug">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-white/55 leading-relaxed flex-1 mb-3 sm:mb-4">
          {description}
        </p>

        {/* Tech tags — wrap freely */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4 sm:mb-5">
          {tech_stack?.map((t) => (
            <span key={t} className="font-mono text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded bg-white/[0.04] border border-white/8 text-white/40">
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {demo_url && (
            <a
              href={demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-mono text-white rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)]"
              style={{ background: accent_color || '#6366f1' }}
            >
              <FiExternalLink className="w-3 h-3" />
              Live Demo
            </a>
          )}
          {github_url && (
            <a
              href={github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-mono text-white/50 border border-white/10 rounded-lg hover:border-accent3/50 hover:text-accent3 transition-all"
            >
              <FiGithub className="w-3 h-3" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Projects — responsive grid.
 * Mobile:  1 column
 * sm:      2 columns
 * lg:      3 columns
 */
export default function Projects() {
  const { projects } = usePortfolio()

  return (
    <section id="projects" className="relative z-10 py-20 sm:py-28 lg:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <SectionHeader eyebrow="portfolio" title="Featured" subtitle="Projects" />
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.id} delay={i * 100}>
              <ProjectCard project={project} index={i} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}