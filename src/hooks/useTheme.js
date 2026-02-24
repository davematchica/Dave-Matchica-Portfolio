import { useState, useEffect } from 'react'

/**
 * useTheme
 * Manages dark / light mode by toggling a class on <html>.
 *
 * Strategy (industry standard — same as Vercel, Linear, Radix):
 *  1. Read saved preference from localStorage on mount.
 *  2. Fall back to OS preference via prefers-color-scheme.
 *  3. Apply 'light' or 'dark' class to <html>.
 *  4. Persist every change to localStorage.
 *
 * Why class-based (not data-attribute or media-query only):
 *  - Gives us explicit user control that overrides OS setting.
 *  - Works perfectly with Tailwind's darkMode: 'class'.
 *  - No flash-of-wrong-theme because we read localStorage synchronously
 *    in an inline script (see index.html).
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
      root.classList.remove('light')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return { theme, toggle, isDark: theme === 'dark' }
}