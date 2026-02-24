import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import toast from 'react-hot-toast'
import { FiTrash2, FiPlus } from 'react-icons/fi'

const CATS = [
  { key: 'frontend', label: 'Front-End' },
  { key: 'backend',  label: 'Back-End' },
  { key: 'database', label: 'Database' },
  { key: 'tools',    label: 'Tools' },
  { key: 'soft',     label: 'Soft Skills' },
]
const COLOR_MAP = { frontend: 'tag-indigo', backend: 'tag-cyan', database: 'tag-violet', tools: 'tag-green', soft: 'tag-indigo' }

export default function SkillsPanel({ skills: initialSkills }) {
  const [skills, setSkills] = useState(initialSkills || [])
  const [newSkill, setNewSkill] = useState({ name: '', category: 'frontend' })
  const [saving, setSaving] = useState(false)

  const handleAdd = async () => {
    if (!newSkill.name.trim()) { toast.error('Skill name required.'); return }
    setSaving(true)
    const payload = { name: newSkill.name.trim(), category: newSkill.category, color_class: COLOR_MAP[newSkill.category] }
    const { data, error } = await supabase.from('skills').insert(payload).select().single()
    if (error) { toast.error(error.message) }
    else { setSkills((s) => [...s, data]); setNewSkill({ name: '', category: 'frontend' }); toast.success('Skill added!') }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('skills').delete().eq('id', id)
    if (error) { toast.error(error.message) } else { setSkills((s) => s.filter((sk) => sk.id !== id)) }
  }

  return (
    <div>
      <h2 className="font-syne font-bold text-xl mb-6 pb-4 border-b border-white/8">Skills</h2>

      {/* Add new skill */}
      <div className="flex gap-2 mb-8">
        <input type="text" value={newSkill.name} onChange={(e) => setNewSkill((s) => ({ ...s, name: e.target.value }))}
          placeholder="e.g. TypeScript"
          className="flex-1 bg-white/[0.03] border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-accent transition-all" />
        <select value={newSkill.category} onChange={(e) => setNewSkill((s) => ({ ...s, category: e.target.value }))}
          className="bg-surface border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent transition-all">
          {CATS.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
        </select>
        <button onClick={handleAdd} disabled={saving}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-accent text-white text-xs font-mono rounded-lg hover:-translate-y-0.5 transition-all disabled:opacity-60">
          <FiPlus /> Add
        </button>
      </div>

      {/* Skills by category */}
      {CATS.map(({ key, label }) => {
        const catSkills = skills.filter((s) => s.category === key)
        if (!catSkills.length) return null
        return (
          <div key={key} className="mb-6">
            <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-3">{label}</p>
            <div className="flex flex-wrap gap-2">
              {catSkills.map((sk) => (
                <div key={sk.id} className={`inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded ${sk.color_class}`}>
                  {sk.name}
                  <button onClick={() => handleDelete(sk.id)} className="opacity-50 hover:opacity-100 ml-1">
                    <FiTrash2 className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}