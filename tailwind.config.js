/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',   // toggle via .dark on <html>
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        // All resolved via CSS custom properties so light/dark mode
        // just swaps the variable values — no component changes needed.
        bg:       'var(--color-bg)',
        bg2:      'var(--color-bg2)',
        bg3:      'var(--color-bg3)',
        surface:  'var(--color-surface)',
        surface2: 'var(--color-surface2)',
        accent:   '#6366f1',
        accent2:  '#22d3ee',
        accent3:  '#a78bfa',
      },
      animation: {
        float:    'float 3s ease-in-out infinite',
        pulse2:   'pulse2 2s ease-in-out infinite',
        drift1:   'drift1 20s ease-in-out infinite',
        drift2:   'drift2 25s ease-in-out infinite',
        'fade-up':'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pulse2:  { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: 0.5, transform: 'scale(1.4)' } },
        drift1:  { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(80px,60px) scale(1.1)' }, '66%': { transform: 'translate(-40px,80px) scale(0.9)' } },
        drift2:  { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(-60px,-80px) scale(1.2)' }, '66%': { transform: 'translate(40px,-40px) scale(0.8)' } },
        fadeUp:  { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}