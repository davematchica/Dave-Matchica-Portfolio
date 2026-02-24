import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AdminLogin from '../components/admin/AdminLogin'
import AdminDashboard from '../components/admin/AdminDashboard'

/**
 * Admin page
 * Shows login if no session, dashboard if authenticated.
 */
export default function Admin() {
  const [session, setSession] = useState(undefined) // undefined = loading

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Loading state
  if (session === undefined) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="font-mono text-xs text-white/30 animate-pulse">Authenticating...</div>
      </div>
    )
  }

  if (!session) return <AdminLogin />
  return <AdminDashboard session={session} />
}