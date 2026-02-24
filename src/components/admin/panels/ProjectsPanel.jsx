import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import toast from 'react-hot-toast'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi'

const EMOJIS = ['💼', '🎮', '🛒', '🚀', '🌐', '📱', '🤖', '🎨', '📊', '🔧']
const ACCENTS = ['#6366f1', '#22d3ee', '#a78bfa', '#34d399', '#f59e0b', '#f87171']

const inputCls = "w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-accent transition-all"

/**
 * ProjectsPanel
 * Add / edit / delete projects. Changes are persisted to Supabase.
 */
export default function ProjectsPanel({ projects: initialProjects }) {
  const [projects, setProjects] = useState(initialProjects || [])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const blank = { title: '', description: '', tech_stack_str: '', demo_url: '', github_url: '', emoji: '🚀', accent_color: '#6366f1' }
  const [form, setForm] = useState(blank)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const openAdd = () => { setForm(blank); setEditId(null); setShowForm(true) }
  const openEdit = (p) => {
    setForm({ ...p, tech_stack_str: p.tech_stack?.join(', ') || '' })
    setEditId(p.id)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.title) { toast.error('Title is required.'); return }
    setSaving(true)
    const payload = {
      title: form.title,
      description: form.description,
      tech_stack: form.tech_stack_str.split(',').map((s) => s.trim()).filter(Boolean),
      demo_url: form.demo_url,
      github_url: form.github_url,
      emoji: form.emoji,
      accent_color: form.accent_color,
      sort_order: editId ? form.sort_order : projects.length + 1,
    }
    try {
      if (editId) {
        const { data, error } = await supabase.from('projects').update(payload).eq('id', editId).select().single()
        if (error) throw error
        setProjects((prev) => prev.map((p) => (p.id === editId ? data : p)))
        toast.success('Project updated!')
      } else {
        const { data, error } = await supabase.from('projects').insert(payload).select().single()
        if (error) throw error
        setProjects((prev) => [...prev, data])
        toast.success('Project added!')
      }
      setShowForm(false)
      setForm(blank)
      setEditId(null)
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    setDeleting(id)
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id)
      if (error) throw error
      setProjects((prev) => prev.filter((p) => p.id !== id))
      toast.success('Project deleted.')
    } catch (err) { toast.error(err.message) }
    finally { setDeleting(null) }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/8">
        <h2 className="font-syne font-bold text-xl">Projects</h2>
        <button onClick={openAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-white text-xs font-mono rounded-lg hover:-translate-y-0.5 transition-all">
          <FiPlus /> Add Project
        </button>
      </div>

      {/* Project list */}
      <div className="space-y-3 mb-6">
        {projects.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4 bg-bg2 border border-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{p.emoji}</span>
              <div>
                <p className="font-syne font-semibold text-sm">{p.title}</p>
                <p className="font-mono text-[10px] text-white/30">{p.tech_stack?.join(' · ')}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(p)} className="p-2 border border-white/10 rounded-lg text-accent hover:bg-accent/10 transition-all">
                <FiEdit2 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id}
                className="p-2 border border-red-400/20 rounded-lg text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-50">
                <FiTrash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        {!projects.length && (
          <p className="text-center text-white/30 font-mono text-xs py-8 border border-dashed border-white/10 rounded-xl">
            No projects yet. Add one above.
          </p>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-bg2 border border-white/8 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-syne font-semibold">{editId ? 'Edit Project' : 'New Project'}</h3>
            <button onClick={() => { setShowForm(false); setForm(blank); setEditId(null) }}>
              <FiX className="text-white/40 hover:text-white" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="col-span-2">
              <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1.5">Title *</label>
              <input type="text" value={form.title} onChange={set('title')} className={inputCls} placeholder="My Awesome Project" />
            </div>
            <div className="col-span-2">
              <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1.5">Description</label>
              <textarea rows={3} value={form.description} onChange={set('description')} className={`${inputCls} resize-none`} />
            </div>
            <div className="col-span-2">
              <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1.5">Tech Stack (comma-separated)</label>
              <input type="text" value={form.tech_stack_str} onChange={set('tech_stack_str')} className={inputCls} placeholder="React, Node.js, PostgreSQL" />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1.5">Demo URL</label>
              <input type="url" value={form.demo_url} onChange={set('demo_url')} className={inputCls} placeholder="https://..." />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1.5">GitHub URL</label>
              <input type="url" value={form.github_url} onChange={set('github_url')} className={inputCls} placeholder="https://github.com/..." />
            </div>
          </div>

          {/* Emoji + Color pickers */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-2">Emoji Icon</label>
              <div className="flex flex-wrap gap-2">
                {EMOJIS.map((em) => (
                  <button key={em} onClick={() => setForm((f) => ({ ...f, emoji: em }))}
                    className={`w-8 h-8 rounded text-lg flex items-center justify-center border transition-all ${form.emoji === em ? 'border-accent bg-accent/20' : 'border-white/10'}`}>
                    {em}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-2">Accent Color</label>
              <div className="flex flex-wrap gap-2">
                {ACCENTS.map((col) => (
                  <button key={col} onClick={() => setForm((f) => ({ ...f, accent_color: col }))}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${form.accent_color === col ? 'border-white scale-110' : 'border-transparent'}`}
                    style={{ background: col }} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent text-white text-sm rounded-lg hover:-translate-y-0.5 transition-all disabled:opacity-60">
              <FiCheck /> {saving ? 'Saving...' : 'Save Project'}
            </button>
            <button onClick={() => { setShowForm(false); setForm(blank); setEditId(null) }}
              className="px-5 py-2.5 border border-white/10 text-white/60 text-sm rounded-lg hover:text-white transition-all">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}