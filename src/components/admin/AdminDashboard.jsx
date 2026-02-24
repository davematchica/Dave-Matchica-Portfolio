import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { usePortfolioData } from '../../hooks/usePortfolioData'
import HeroPanel from './panels/HeroPanel'
import AboutPanel from './panels/AboutPanel'
import ProjectsPanel from './panels/ProjectsPanel'
import SkillsPanel from './panels/SkillsPanel'
import EducationPanel from './panels/EducationPanel'
import ContactPanel from './panels/ContactPanel'
import { FiHome, FiUser, FiFolder, FiZap, FiBook, FiMail, FiLogOut, FiExternalLink, FiMenu, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

const NAV = [
  { id: 'hero',      label: 'Hero',      Icon: FiHome    },
  { id: 'about',     label: 'About',     Icon: FiUser    },
  { id: 'projects',  label: 'Projects',  Icon: FiFolder  },
  { id: 'skills',    label: 'Skills',    Icon: FiZap     },
  { id: 'education', label: 'Education', Icon: FiBook    },
  { id: 'contact',   label: 'Contact',   Icon: FiMail    },
]

/**
 * AdminDashboard — responsive sidebar.
 * Mobile:  sidebar hidden, toggled by hamburger button
 * md+:     persistent left sidebar
 *
 * Import path reference (from src/components/admin/):
 *   ../../lib/supabase          → src/lib/supabase
 *   ../../hooks/usePortfolioData → src/hooks/usePortfolioData
 *   ./panels/HeroPanel           → src/components/admin/panels/HeroPanel
 */
export default function AdminDashboard({ session }) {
  const [active, setActive]           = useState('hero')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { content, projects, skills, loading } = usePortfolioData()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Logged out.')
  }

  const handleNav = (id) => {
    setActive(id)
    setSidebarOpen(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="font-mono text-xs text-white/30 animate-pulse">Loading data...</div>
      </div>
    )
  }

  const panelProps = { content, projects, skills }

  return (
    <div className="min-h-screen bg-bg flex overflow-hidden">

      {/* ── Mobile sidebar backdrop ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed md:relative top-0 left-0 h-full w-56 bg-bg2 border-r border-white/5
                    flex flex-col z-40 transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
          <div>
            <p className="font-syne font-black text-base sm:text-lg">
              dave<span className="text-accent">.</span>admin
            </p>
            <p className="font-mono text-[10px] text-accent mt-0.5">// content manager</p>
          </div>
          <button
            className="md:hidden text-white/40 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-2 sm:p-3 space-y-1 overflow-y-auto">
          {NAV.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active === id
                  ? 'bg-accent/15 border border-accent/20 text-accent'
                  : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-2 sm:p-3 border-t border-white/5 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-white/30 hover:text-white transition-all font-mono"
          >
            <FiExternalLink className="w-3.5 h-3.5" />
            View Portfolio
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-400/60 hover:text-red-400 transition-all font-mono"
          >
            <FiLogOut className="w-3.5 h-3.5" />
            Logout
          </button>
          <p className="font-mono text-[9px] text-white/15 px-3 truncate">{session?.user?.email}</p>
        </div>
      </aside>

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/5 bg-bg2 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="text-white/60 hover:text-white">
            <FiMenu className="w-5 h-5" />
          </button>
          <p className="font-syne font-bold text-sm capitalize">{active}</p>
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-accent transition-colors">
            <FiExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Panel content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            {active === 'hero'      && <HeroPanel      {...panelProps} />}
            {active === 'about'     && <AboutPanel     {...panelProps} />}
            {active === 'projects'  && <ProjectsPanel  {...panelProps} />}
            {active === 'skills'    && <SkillsPanel    {...panelProps} />}
            {active === 'education' && <EducationPanel {...panelProps} />}
            {active === 'contact'   && <ContactPanel   {...panelProps} />}
          </div>
        </main>
      </div>
    </div>
  )
}