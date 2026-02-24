import { useState, useRef } from 'react'
import { supabase } from '../../../lib/supabase'
import toast from 'react-hot-toast'
import { FiUpload, FiTrash2, FiUser, FiImage } from 'react-icons/fi'

const Field = ({ label, children }) => (
  <div className="mb-4">
    <label className="block font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1.5">
      {label}
    </label>
    {children}
  </div>
)

const Input = (props) => (
  <input
    {...props}
    className="w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-accent transition-all"
  />
)

/**
 * AvatarUploader
 *
 * Handles profile picture upload to Supabase Storage bucket "avatars".
 * Features:
 *  - Drag-and-drop or click-to-browse
 *  - Live preview before confirming upload
 *  - Upload progress indicator
 *  - Delete existing photo
 *  - Validates file type (image/*) and size (≤ 5 MB)
 *
 * Storage setup required in Supabase:
 *  1. Storage → New bucket → Name: "avatars" → Public: ON
 *  2. Storage → Policies → avatars bucket:
 *     - SELECT: true (public read)
 *     - INSERT/UPDATE/DELETE: auth.role() = 'authenticated'
 */
function AvatarUploader({ currentUrl, onUploadSuccess }) {
  const [preview, setPreview]   = useState(null)   // local blob URL before upload
  const [file, setFile]         = useState(null)   // File object staged for upload
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef(null)

  /* ── Validate & stage file ── */
  const stageFile = (f) => {
    if (!f) return
    if (!f.type.startsWith('image/')) {
      toast.error('Only image files are supported.')
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5 MB.')
      return
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleFileInput  = (e) => stageFile(e.target.files?.[0])
  const handleDrop       = (e) => { e.preventDefault(); setDragOver(false); stageFile(e.dataTransfer.files?.[0]) }
  const handleDragOver   = (e) => { e.preventDefault(); setDragOver(true) }
  const handleDragLeave  = () => setDragOver(false)
  const handleCancel     = () => { setFile(null); setPreview(null); setProgress(0) }

  /* ── Upload to Supabase Storage ── */
  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setProgress(10)

    try {
      // Unique filename keeps cache-busting simple
      const ext      = file.name.split('.').pop()
      const filename = `profile-${Date.now()}.${ext}`

      setProgress(30)

      const { error: upErr } = await supabase.storage
        .from('avatars')
        .upload(filename, file, { upsert: true, contentType: file.type })

      if (upErr) throw upErr
      setProgress(70)

      // Get public URL
      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filename)
      const publicUrl = urlData.publicUrl

      // Persist URL into portfolio_content
      const { error: dbErr } = await supabase
        .from('portfolio_content')
        .upsert({ section: 'hero', key: 'avatar_url', value: publicUrl }, { onConflict: 'section,key' })

      if (dbErr) throw dbErr
      setProgress(100)

      toast.success('Profile picture uploaded!')
      onUploadSuccess(publicUrl)
      setFile(null)
      setPreview(null)
    } catch (err) {
      toast.error('Upload failed: ' + err.message)
    } finally {
      setUploading(false)
      setTimeout(() => setProgress(0), 800)
    }
  }

  /* ── Delete from storage + clear DB ── */
  const handleDelete = async () => {
    if (!currentUrl) return
    if (!confirm('Remove your profile picture?')) return

    try {
      // Extract filename from URL
      const filename = currentUrl.split('/').pop()
      await supabase.storage.from('avatars').remove([filename])
      await supabase
        .from('portfolio_content')
        .upsert({ section: 'hero', key: 'avatar_url', value: '' }, { onConflict: 'section,key' })

      toast.success('Profile picture removed.')
      onUploadSuccess('')
    } catch (err) {
      toast.error('Delete failed: ' + err.message)
    }
  }

  const displayUrl = preview || currentUrl

  return (
    <div className="mb-8">
      <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-3">
        Profile Picture
      </p>

      <div className="flex flex-col sm:flex-row gap-5 items-start">

        {/* ── Avatar preview ── */}
        <div className="relative flex-shrink-0">
          <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-white/10 bg-surface flex items-center justify-center">
            {displayUrl ? (
              <img
                src={displayUrl}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-1 text-white/20">
                <FiUser className="w-10 h-10" />
                <span className="font-mono text-[9px]">No photo</span>
              </div>
            )}
          </div>

          {/* Progress ring overlay while uploading */}
          {uploading && (
            <div className="absolute inset-0 rounded-2xl bg-bg/80 flex items-center justify-center">
              <div className="text-center">
                <div className="font-syne font-bold text-lg text-accent">{progress}%</div>
                <div className="font-mono text-[9px] text-white/40">uploading</div>
              </div>
            </div>
          )}
        </div>

        {/* ── Right side: dropzone + actions ── */}
        <div className="flex-1 w-full">

          {/* Staged file pending upload */}
          {file && !uploading ? (
            <div className="mb-3 p-3 bg-accent/10 border border-accent/30 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <FiImage className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="font-mono text-xs text-white/70 truncate">{file.name}</span>
                <span className="font-mono text-[10px] text-white/30 flex-shrink-0">
                  ({(file.size / 1024).toFixed(0)} KB)
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleUpload}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-accent text-white text-xs font-mono rounded-lg hover:-translate-y-0.5 transition-all"
                >
                  <FiUpload className="w-3.5 h-3.5" />
                  Upload
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-white/10 text-white/50 text-xs font-mono rounded-lg hover:text-white transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* Drag & drop zone */
            <div
              onClick={() => !uploading && inputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all
                ${dragOver
                  ? 'border-accent bg-accent/10 scale-[1.01]'
                  : 'border-white/10 hover:border-accent/50 hover:bg-white/[0.02]'
                }
                ${uploading ? 'pointer-events-none opacity-50' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <FiUpload className="w-4 h-4 text-accent" />
              </div>
              <div className="text-center">
                <p className="text-sm text-white/60">
                  <span className="text-accent font-medium">Click to browse</span> or drag & drop
                </p>
                <p className="font-mono text-[10px] text-white/25 mt-1">
                  PNG, JPG, WEBP — max 5 MB
                </p>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          )}

          {/* Progress bar */}
          {uploading && progress > 0 && (
            <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Delete button — only if there's a saved photo */}
          {currentUrl && !file && !uploading && (
            <button
              onClick={handleDelete}
              className="mt-3 flex items-center gap-1.5 font-mono text-xs text-red-400/60 hover:text-red-400 transition-colors"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
              Remove current photo
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   HeroPanel — main export
═══════════════════════════════════════════ */
export default function HeroPanel({ content }) {
  const h = content?.hero || {}
  const [data, setData] = useState({
    name:        h.name        || '',
    role:        h.role        || '',
    tagline:     h.tagline     || '',
    stat1_num:   h.stat1_num   || '',
    stat1_label: h.stat1_label || '',
    stat2_num:   h.stat2_num   || '',
    stat2_label: h.stat2_label || '',
    stat3_num:   h.stat3_num   || '',
    stat3_label: h.stat3_label || '',
  })
  const [avatarUrl, setAvatarUrl] = useState(h.avatar_url || '')
  const [saving, setSaving]       = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      const updates = Object.entries(data).map(([key, value]) =>
        supabase.from('portfolio_content').upsert(
          { section: 'hero', key, value },
          { onConflict: 'section,key' }
        )
      )
      await Promise.all(updates)
      toast.success('Hero section saved!')
    } catch (err) {
      toast.error('Save failed: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }))

  return (
    <div>
      <h2 className="font-syne font-bold text-xl mb-6 pb-4 border-b border-white/8">
        Hero Section
      </h2>

      {/* ── Profile picture uploader ── */}
      <AvatarUploader
        currentUrl={avatarUrl}
        onUploadSuccess={(url) => setAvatarUrl(url)}
      />

      {/* ── Text fields ── */}
      <Field label="Full Name">
        <Input value={data.name} onChange={set('name')} placeholder="Dave E. Matchica" />
      </Field>
      <Field label="Role / Title">
        <Input value={data.role} onChange={set('role')} placeholder="IT Student & Aspiring Web Developer" />
      </Field>
      <Field label="Tagline">
        <textarea
          value={data.tagline}
          onChange={set('tagline')}
          rows={3}
          className="w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-accent transition-all resize-none"
        />
      </Field>

      {/* ── Stats grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {[1, 2, 3].map((n) => (
          <div key={n} className="space-y-2">
            <Field label={`Stat ${n} — #`}>
              <Input value={data[`stat${n}_num`]} onChange={set(`stat${n}_num`)} placeholder="3+" />
            </Field>
            <Field label={`Stat ${n} — Label`}>
              <Input value={data[`stat${n}_label`]} onChange={set(`stat${n}_label`)} placeholder="projects built" />
            </Field>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-6 py-2.5 bg-accent text-white text-sm rounded-lg hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-60"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}