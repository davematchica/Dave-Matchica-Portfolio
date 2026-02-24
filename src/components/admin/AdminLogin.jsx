import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'
import { FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi'

/**
 * AdminLogin
 * Secure login form using Supabase Auth.
 */
export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) { toast.error('Please enter credentials.'); return }

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error(error.message || 'Invalid credentials.')
    } else {
      toast.success('Welcome back!')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      {/* Ambient glow */}
      <div className="fixed top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="font-syne font-black text-2xl">dave<span className="text-accent">.</span>admin</p>
          <p className="font-mono text-xs text-white/30 mt-1">// restricted access</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleLogin}
          className="relative bg-surface border border-white/5 rounded-2xl p-8 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent2" />

          <h2 className="font-syne font-bold text-xl mb-1">Sign In</h2>
          <p className="text-white/40 text-xs font-mono mb-6">Enter your admin credentials to continue.</p>

          {/* Email */}
          <div className="mb-4">
            <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1.5">
              Email
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@yoursite.com"
                className="w-full bg-white/[0.03] border border-white/8 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1.5">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/[0.03] border border-white/8 rounded-lg pl-10 pr-10 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent text-white font-medium rounded-lg hover:shadow-[0_8px_24px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>

          <p className="text-center font-mono text-[10px] text-white/20 mt-4">
            <a href="/" className="hover:text-white/50 transition-colors">← Back to portfolio</a>
          </p>
        </form>
      </div>
    </div>
  )
}