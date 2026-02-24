import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import toast from 'react-hot-toast'

export default function ContactPanel({ content }) {
  const c = content?.contact || {}
  const [data, setData] = useState({ email: c.email || '', phone: c.phone || '', github: c.github || '', linkedin: c.linkedin || '', instagram: c.instagram || '' })
  const [saving, setSaving] = useState(false)
  const set = (k) => (ev) => setData((d) => ({ ...d, [k]: ev.target.value }))
  const cls = "w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent transition-all"

  const handleSave = async () => {
    setSaving(true)
    try {
      await Promise.all(Object.entries(data).map(([key, value]) =>
        supabase.from('portfolio_content').upsert({ section: 'contact', key, value }, { onConflict: 'section,key' })
      ))
      toast.success('Contact info saved!')
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
      <h2 className="font-syne font-bold text-xl mb-6 pb-4 border-b border-white/8">Contact Info</h2>
      <Field label="Email"><input type="email" value={data.email} onChange={set('email')} className={cls} /></Field>
      <Field label="Phone"><input type="text" value={data.phone} onChange={set('phone')} className={cls} /></Field>
      <Field label="GitHub URL"><input type="url" value={data.github} onChange={set('github')} className={cls} /></Field>
      <Field label="LinkedIn URL"><input type="url" value={data.linkedin} onChange={set('linkedin')} className={cls} /></Field>
      <Field label="Instagram Handle"><input type="text" value={data.instagram} onChange={set('instagram')} className={cls} /></Field>
      <button onClick={handleSave} disabled={saving}
        className="px-6 py-2.5 bg-accent text-white text-sm rounded-lg hover:-translate-y-0.5 transition-all disabled:opacity-60">
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}