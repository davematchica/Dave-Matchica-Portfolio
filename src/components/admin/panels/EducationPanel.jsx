import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import toast from 'react-hot-toast'

const cls = "w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-accent transition-all"

const Field = ({ label, hint, children }) => (
  <div className="mb-4">
    <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1">
      {label}
    </label>
    {hint && <p className="font-mono text-[10px] text-accent/50 mb-1.5">{hint}</p>}
    {children}
  </div>
)

/**
 * EducationPanel
 * Adds three new CMS-driven fields that power the floating chips:
 *   academic_year  → shown on Hero chips + Education stat card  e.g. "4th Year"
 *   grad_year      → shown on Education stat card               e.g. "2027"
 *   focus_area     → shown on Education stat card               e.g. "Full-Stack Dev"
 * These also drive the About section's education InfoItem.
 */
export default function EducationPanel({ content }) {
  const e = content?.education || {}
  const [data, setData] = useState({
    school:        e.school        || '',
    degree:        e.degree        || '',
    period:        e.period        || '',
    description:   e.description   || '',
    academic_year: e.academic_year || '',
    grad_year:     e.grad_year     || '',
    focus_area:    e.focus_area    || '',
  })
  const [saving, setSaving] = useState(false)
  const set = (k) => (ev) => setData((d) => ({ ...d, [k]: ev.target.value }))

  const handleSave = async () => {
    setSaving(true)
    try {
      await Promise.all(
        Object.entries(data).map(([key, value]) =>
          supabase.from('portfolio_content').upsert(
            { section: 'education', key, value },
            { onConflict: 'section,key' }
          )
        )
      )
      toast.success('Education saved!')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h2 className="font-syne font-bold text-xl mb-1 pb-4 border-b border-white/8">Education</h2>
      <p className="font-mono text-[10px] text-white/25 mb-6">
        // Changes here update the Education section, Hero chips, and About section automatically.
      </p>

      <Field label="School Name">
        <input type="text" value={data.school} onChange={set('school')} className={cls}
          placeholder="Caraga State University — Main Campus" />
      </Field>

      <Field label="Degree">
        <input type="text" value={data.degree} onChange={set('degree')} className={cls}
          placeholder="Bachelor of Science in Information Technology" />
      </Field>

      <Field label="Period">
        <input type="text" value={data.period} onChange={set('period')} className={cls}
          placeholder="2021 — Present (Expected 2027)" />
      </Field>

      <Field label="Description">
        <textarea rows={4} value={data.description} onChange={set('description')}
          className={`${cls} resize-none`} />
      </Field>

      {/* ── Fields that drive live chips & stat cards ── */}
      <div className="mt-6 mb-4 p-4 bg-accent/5 border border-accent/15 rounded-xl">
        <p className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4">
          // Live chip fields — updates Hero &amp; Education cards instantly
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Current Year Level"
            hint='e.g. "4th Year" — shown on Hero chip'>
            <input type="text" value={data.academic_year} onChange={set('academic_year')}
              className={cls} placeholder="4th Year" />
          </Field>

          <Field label="Expected Graduation"
            hint='e.g. "2027" — shown on Education card'>
            <input type="text" value={data.grad_year} onChange={set('grad_year')}
              className={cls} placeholder="2027" />
          </Field>

          <Field label="Focus Area"
            hint='e.g. "Full-Stack Dev" — shown on Education card'>
            <input type="text" value={data.focus_area} onChange={set('focus_area')}
              className={cls} placeholder="Full-Stack Dev" />
          </Field>
        </div>
      </div>

      <button onClick={handleSave} disabled={saving}
        className="px-6 py-2.5 bg-accent text-white text-sm rounded-lg hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] transition-all disabled:opacity-60">
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}