import { useState } from 'react'
import SectionHeader from '../ui/SectionHeader'
import RevealOnScroll from '../ui/RevealOnScroll'
import { usePortfolio } from '../../context/PortfolioContext'
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi'
import toast from 'react-hot-toast'

const inputCls =
  'w-full bg-white/[0.03] border border-white/8 rounded-lg px-3 sm:px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all'

/**
 * Contact — responsive two-column → single column on mobile.
 * Form name/email fields go side-by-side on sm+, stacked on xs.
 */
export default function Contact() {
  const { content } = usePortfolio()
  const c = content.contact || {}

  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setSending(true)
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    window.location.href = `mailto:${c.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(body)}`
    setTimeout(() => {
      setSending(false)
      setForm({ name: '', email: '', subject: '', message: '' })
      toast.success('Opening your mail client...')
    }, 1000)
  }

  const socials = [
    { icon: <FiMail />,    label: 'Email',    value: c.email,                    href: `mailto:${c.email}` },
    { icon: <FiPhone />,   label: 'Phone',    value: c.phone,                    href: `tel:${c.phone?.replace(/\s/g, '')}` },
    { icon: <FiGithub />,  label: 'GitHub',   value: 'github.com/davematchica', href: c.github },
    { icon: <FiLinkedin />,label: 'LinkedIn', value: 'dave-matchica',            href: c.linkedin },
  ]

  return (
    <section id="contact" className="relative z-10 py-20 sm:py-28 lg:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <SectionHeader eyebrow="let's connect" title="Get In" subtitle="Touch" />
        </RevealOnScroll>

        {/* Stack on mobile, two-column md+ */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Info column */}
          <RevealOnScroll delay={100}>
            <h3 className="font-syne font-bold text-xl sm:text-2xl mb-3 sm:mb-4 leading-snug">
              Let's build something great together.
            </h3>
            <p className="text-white/55 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              Whether you have a project in mind, an opportunity to share, or just want to connect — my inbox is always open.
            </p>

            <div className="space-y-2.5 sm:space-y-3">
              {socials.map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 sm:p-4 bg-surface border border-white/5 rounded-xl hover:border-accent/30 hover:translate-x-1 transition-all group"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-sm flex-shrink-0">
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">{label}</div>
                    <div className="text-xs sm:text-sm text-white/70 group-hover:text-white transition-colors truncate">{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </RevealOnScroll>

          {/* Form */}
          <RevealOnScroll delay={200}>
            <form
              onSubmit={handleSubmit}
              className="relative p-4 sm:p-6 lg:p-7 bg-surface border border-white/5 rounded-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent2 to-accent3" />

              {/* Name + Email: stacked on xs, side-by-side on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div>
                  <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1.5">Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={inputCls} />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1.5">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="hello@example.com" className={inputCls} />
                </div>
              </div>

              <div className="mb-3 sm:mb-4">
                <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1.5">Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="Project collaboration..." className={inputCls} />
              </div>

              <div className="mb-4 sm:mb-6">
                <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1.5">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell me about your project or idea..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-accent to-accent3 text-white font-medium text-sm rounded-lg hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <FiSend className="w-4 h-4" />
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}