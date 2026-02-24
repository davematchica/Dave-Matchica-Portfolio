export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay opacity-40" />

      {/* Blob 1 — top-left, indigo */}
      <div
        className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full opacity-[0.10] blur-[120px]"
        style={{ background: '#6366f1', animation: 'drift1 20s ease-in-out infinite' }}
      />

      {/* Blob 2 — bottom-right, cyan */}
      <div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.09] blur-[120px]"
        style={{ background: '#22d3ee', animation: 'drift2 25s ease-in-out infinite' }}
      />

      {/* Blob 3 — center, violet */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[120px]"
        style={{ background: '#a78bfa', animation: 'drift1 30s ease-in-out infinite reverse' }}
      />
    </div>
  )
}