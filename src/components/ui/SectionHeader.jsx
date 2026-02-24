/**
 * SectionHeader
 * Reusable section heading with eyebrow label, title, and accent line.
 */
export default function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-16">
      <p className="eyebrow font-mono text-xs text-accent tracking-widest uppercase mb-3">
        {eyebrow}
      </p>
      <h2 className="font-syne font-bold text-4xl md:text-5xl tracking-tight leading-none">
        {title}
        {subtitle && (
          <>
            <br />
            <span className="text-white/20">{subtitle}</span>
          </>
        )}
      </h2>
      <div className="w-14 h-0.5 bg-gradient-to-r from-accent to-accent2 rounded-full mt-5" />
    </div>
  )
}