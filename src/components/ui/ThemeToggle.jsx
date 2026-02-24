import { useTheme } from '../../hooks/useTheme'

/**
 * ThemeToggle
 * A polished pill-shaped toggle button.
 * Icons animate in/out on switch.
 * Can be rendered anywhere — used in Footer and NavBar.
 */
export default function ThemeToggle({ size = 'md' }) {
  const { isDark, toggle } = useTheme()

  const isLg = size === 'lg'

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="relative inline-flex items-center gap-1.5 rounded-full border transition-all duration-300 select-none cursor-pointer group"
      style={{
        padding: isLg ? '5px 12px 5px 8px' : '4px 10px 4px 6px',
        background: isDark
          ? 'rgba(255,255,255,0.04)'
          : 'rgba(0,0,0,0.05)',
        borderColor: isDark
          ? 'rgba(255,255,255,0.1)'
          : 'rgba(0,0,0,0.12)',
        fontSize: isLg ? 13 : 11,
      }}
    >
      {/* Track — sliding indicator */}
      <div
        className="relative flex-shrink-0 rounded-full transition-colors duration-300"
        style={{
          width:  isLg ? 32 : 26,
          height: isLg ? 18 : 15,
          background: isDark ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)',
          border: `1px solid ${isDark ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.3)'}`,
        }}
      >
        {/* Thumb */}
        <div
          className="absolute top-1/2 rounded-full transition-all duration-300 shadow-sm"
          style={{
            width:  isLg ? 12 : 10,
            height: isLg ? 12 : 10,
            transform: `translate(${isDark ? (isLg ? '16px' : '13px') : '1px'}, -50%)`,
            background: isDark ? '#6366f1' : '#818cf8',
            boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
          }}
        />
      </div>

      {/* Icon */}
      <span
        className="transition-all duration-200"
        style={{
          fontSize: isLg ? 14 : 12,
          animation: 'icon-in 0.25s ease both',
          key: String(isDark),   // forces re-render animation
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </span>

      {/* Label — hidden on xs, visible sm+ */}
      <span
        className="hidden sm:block font-mono transition-colors duration-300"
        style={{
          fontSize: isLg ? 11 : 10,
          color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)',
          letterSpacing: '0.04em',
        }}
      >
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}