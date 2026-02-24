import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import toast from 'react-hot-toast'

/**
 * AboutPanel — Edit About section content.
 */
export default function AboutPanel({ content }) {
  const a = content?.about || {}
  const [data, setData] = useState({
    bio1: a.bio1 || '', bio2: a.bio2 || '', bio3: a.bio3 || '',
    strengths: a.strengths || '', location: a.location || '',
    email: a.email || '', phone: a.phone || '', status: a.status || '',
  })
  const [saving, setSaving] = useState(false)

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }))
  const baseClass = "w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent transition-all"

  const handleSave = async () => {
    setSaving(true)
    try {
      await Promise.all(
        Object.entries(data).map(([key, value]) =>
          supabase.from('portfolio_content').upsert({ section: 'about', key, value }, { onConflict: 'section,key' })
        )
      )
      toast.success('About section saved!')
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  const Field = ({ label, children }) => (
    <div className="mb-4">
      <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1.5">{label}</label>
      {children}
    </div>
  )

  return (
    <div>
      <h2 className="font-syne font-bold text-xl mb-6 pb-4 border-b border-white/8">About Me</h2>

      {['bio1', 'bio2', 'bio3'].map((k, i) => (
        <Field key={k} label={`Bio Paragraph ${i + 1}`}>
          <textarea rows={3} value={data[k]} onChange={set(k)} className={`${baseClass} resize-none`} />
        </Field>
      ))}
      <Field label="Professional Strengths">
        <textarea rows={2} value={data.strengths} onChange={set('strengths')} className={`${baseClass} resize-none`} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        {[['location', 'Location'], ['email', 'Email'], ['phone', 'Phone'], ['status', 'Status']].map(([k, l]) => (
          <Field key={k} label={l}>
            <input type="text" value={data[k]} onChange={set(k)} className={baseClass} />
          </Field>
        ))}
      </div>

      <button onClick={handleSave} disabled={saving}
        className="px-6 py-2.5 bg-accent text-white text-sm rounded-lg hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-60 mt-2">
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}