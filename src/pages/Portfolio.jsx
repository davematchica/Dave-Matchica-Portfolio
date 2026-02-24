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

/**
 * Portfolio — main public-facing page.
 * Admin access is now via the subtle gear icon in the Footer.
 * Theme toggle is also in the Footer.
 */
export default function Portfolio() {
  return (
    <PortfolioProvider>
      <div className="relative min-h-screen font-sans"
        style={{ background: 'var(--color-bg)', color: 'var(--color-text-primary)' }}>
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
      </div>
    </PortfolioProvider>
  )
}