import { Link } from 'react-router-dom'
import { PortfolioProvider } from '../context/PortfolioContext'
import AmbientBackground from '../components/ui/AmbientBackground'
import NavBar from '../components/ui/NavBar'
import Hero from '../components/public/Hero'
import About from '../components/public/About'
import Skills from '../components/public/Skills'
import Projects from '../components/public/Projects'
import Education from '../components/public/Education'
import Contact from '../components/public/Contact'
import Footer from '../components/public/Footer'

export default function Portfolio() {
  return (
    <PortfolioProvider>
      <div className="relative min-h-screen bg-bg text-white font-sans">
        <AmbientBackground />
        <NavBar />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>

        <Footer />

        {/* ── Subtle Admin Access Button ── */}
        <Link
          to="/admin"
          title="Admin Panel"
          className="fixed bottom-6 left-6 z-50 w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-white/8 text-white/30 hover:text-accent hover:border-accent/40 transition-all hover:shadow-[0_0_16px_rgba(99,102,241,0.3)] backdrop-blur"
        >
          {/* Gear icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </Link>
      </div>
    </PortfolioProvider>
  )
}