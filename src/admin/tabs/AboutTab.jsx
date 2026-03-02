import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase.js'
import { XP_BTN, XP_BTN_GREEN, INPUT, TEXTAREA, FormField, AdminCard, SectionHeader, Alert } from '../adminUI.jsx'

export default function AboutTab() {
  const [form, setForm] = useState({ bio: '', location: '', email: '', linkedin: '', github: '', resume_url: '' })
  const [id, setId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [alert, setAlert] = useState(null)
  const [uploading, setUploading] = useState(false)

  const showAlert = (type, msg) => { setAlert({ type, msg }); setTimeout(() => setAlert(null), 4000) }

  useEffect(() => {
    supabase.from('about').select('*').limit(1).single().then(({ data }) => {
      if (data) { setForm(data); setId(data.id) }
    })
  }, [])

  const save = async () => {
    setSaving(true)
    let error
    if (id) {
      ({ error } = await supabase.from('about').update(form).eq('id', id))
    } else {
      const { data, error: err } = await supabase.from('about').insert([form]).select().single()
      if (data) setId(data.id)
      error = err
    }
    setSaving(false)
    if (error) { showAlert('error', error.message) } else { showAlert('success', 'About info updated!') }
  }

  const uploadResume = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') { showAlert('error', 'Please upload a PDF file only.'); return }
    if (file.size > 5 * 1024 * 1024) { showAlert('error', 'File size must be under 5MB.'); return }

    setUploading(true)
    // Upload to Supabase Storage bucket "resumes"
    const fileName = `resume-${Date.now()}.pdf`
    const { data, error } = await supabase.storage.from('resumes').upload(fileName, file, {
      cacheControl: '3600', upsert: true
    })
    if (error) {
      // If bucket doesn't exist yet, guide user
      if (error.message?.includes('Bucket not found') || error.statusCode === 400) {
        showAlert('error', 'Storage bucket "resumes" not found. Create it in Supabase Storage dashboard, set it to public, then try again.')
      } else {
        showAlert('error', `Upload failed: ${error.message}`)
      }
      setUploading(false)
      return
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage.from('resumes').getPublicUrl(fileName)
    setForm(f => ({ ...f, resume_url: publicUrl }))
    showAlert('success', '✅ Resume uploaded! Click "Save Changes" to apply.')
    setUploading(false)
  }

  const removeResume = () => { setForm(f => ({ ...f, resume_url: '' })) }

  const F = (key, label, type='text', ph='') => (
    <FormField label={label}><input type={type} value={form[key]||''} placeholder={ph} onChange={e=>setForm({...form,[key]:e.target.value})} style={INPUT} /></FormField>
  )

  return (
    <div>
      <SectionHeader title="👤 About Me" />
      {alert && <Alert type={alert.type} msg={alert.msg} />}

      <AdminCard>
        <FormField label="Bio / About Me">
          <textarea value={form.bio||''} onChange={e=>setForm({...form,bio:e.target.value})} rows={5} placeholder="Tell visitors about yourself..." style={TEXTAREA} />
        </FormField>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {F('location', 'Location', 'text', 'Amsterdam, Netherlands')}
          {F('email', 'Email', 'email', 'you@example.com')}
          {F('linkedin', 'LinkedIn URL', 'url', 'https://linkedin.com/in/...')}
          {F('github', 'GitHub URL', 'url', 'https://github.com/...')}
        </div>
      </AdminCard>

      {/* Resume Section */}
      <AdminCard style={{ border: '2px dashed #3265be' }}>
        <div style={{ fontFamily: 'Tahoma', fontSize: 13, fontWeight: 'bold', marginBottom: 10, color: '#0831d9' }}>📄 Resume / CV</div>

        {form.resume_url ? (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: '#333', fontFamily: 'Tahoma', marginBottom: 8 }}>
              ✅ Current resume: <a href={form.resume_url} target="_blank" rel="noopener noreferrer" style={{ color: '#0831d9' }}>View PDF</a>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <label style={{
                ...XP_BTN_GREEN(), display: 'inline-block', cursor: 'pointer'
              }}>
                🔄 Replace Resume
                <input type="file" accept=".pdf" onChange={uploadResume} style={{ display: 'none' }} />
              </label>
              <button onClick={removeResume} style={{ ...XP_BTN(), background: 'linear-gradient(to bottom, #e07070, #c03030)', border: '1px solid #901010' }}>
                🗑️ Remove
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 12, color: '#777', fontFamily: 'Tahoma', marginBottom: 10 }}>
              Upload a PDF resume (max 5MB). It will be stored in Supabase Storage.
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: '#999', fontFamily: 'Tahoma', marginBottom: 6 }}>
                ℹ️ First create a public bucket named <strong>resumes</strong> in your Supabase Storage dashboard.
              </div>
            </div>
            <label style={{ ...XP_BTN_GREEN(), display: 'inline-block', cursor: uploading ? 'default' : 'pointer', opacity: uploading ? 0.6 : 1 }}>
              {uploading ? '⏳ Uploading...' : '📤 Upload PDF Resume'}
              <input type="file" accept=".pdf" onChange={uploadResume} disabled={uploading} style={{ display: 'none' }} />
            </label>
          </div>
        )}

        {/* Or paste URL manually */}
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #ddd' }}>
          <FormField label="Or paste a direct URL to your resume:">
            <input type="url" value={form.resume_url||''} placeholder="https://drive.google.com/... or any PDF URL"
              onChange={e=>setForm({...form,resume_url:e.target.value})} style={INPUT} />
          </FormField>
        </div>
      </AdminCard>

      <button onClick={save} disabled={saving} style={XP_BTN_GREEN({ padding: '8px 24px', fontSize: 13 })}>
        {saving ? 'Saving...' : '💾 Save Changes'}
      </button>
    </div>
  )
}
