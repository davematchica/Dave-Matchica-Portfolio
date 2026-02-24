export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[10px] sm:text-xs text-white/25 text-center sm:text-left">
          Designed & built by{' '}
          <span className="text-accent">Dave E. Matchica</span>
          {' · '}
          <span className="text-accent2">{new Date().getFullYear()}</span>
        </p>
        <p className="font-mono text-[10px] sm:text-xs text-white/15">
          Built with ♥ and lots of ☕
        </p>
      </div>
    </footer>
  )
}