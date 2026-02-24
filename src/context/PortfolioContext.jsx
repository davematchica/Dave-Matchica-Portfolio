import { createContext, useContext } from 'react'
import { usePortfolioData } from '../hooks/usePortfolioData'

const PortfolioContext = createContext(null)

/**
 * PortfolioProvider
 * Wraps the public portfolio pages and provides data from Supabase/static fallback.
 */
export function PortfolioProvider({ children }) {
  const data = usePortfolioData()
  return <PortfolioContext.Provider value={data}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used inside PortfolioProvider')
  return ctx
}