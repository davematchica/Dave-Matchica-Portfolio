import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { staticContent, staticProjects, staticSkills } from '../lib/staticData'

/**
 * usePortfolioData
 * Fetches all portfolio data from Supabase.
 * Falls back to staticData if Supabase is not configured.
 */
export function usePortfolioData() {
  const [content, setContent] = useState(staticContent)
  const [projects, setProjects] = useState(staticProjects)
  const [skills, setSkills] = useState(staticSkills)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const hasSupabase =
      import.meta.env.VITE_SUPABASE_URL &&
      !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')

    if (!hasSupabase) {
      setLoading(false)
      return
    }

    async function fetchAll() {
      try {
        const [{ data: contentRows, error: cErr }, { data: projectRows, error: pErr }, { data: skillRows, error: sErr }] =
          await Promise.all([
            supabase.from('portfolio_content').select('*'),
            supabase.from('projects').select('*').order('sort_order'),
            supabase.from('skills').select('*'),
          ])

        if (cErr || pErr || sErr) throw cErr || pErr || sErr

        // Transform flat rows → nested object  {section: {key: value}}
        const contentMap = {}
        contentRows?.forEach(({ section, key, value }) => {
          if (!contentMap[section]) contentMap[section] = {}
          contentMap[section][key] = value
        })

        setContent(contentMap)
        setProjects(projectRows || [])
        setSkills(skillRows || [])
      } catch (err) {
        console.error('Supabase fetch error:', err)
        setError(err.message)
        // Keep static fallback already in state
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  return { content, projects, skills, loading, error }
}