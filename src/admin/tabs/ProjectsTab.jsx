import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase.js'
import { XP_BTN, XP_BTN_DANGER, XP_BTN_GREEN, INPUT, TEXTAREA, FormField, AdminCard, SectionHeader, Alert, ConfirmDelete } from '../adminUI.jsx'

const EMPTY = { title: '', description: '', tech_stack: '', github_url: '', live_url: '', image_url: '' }

export default function ProjectsTab() {
  const [projects, setProjects] = useState([])
  const [editing, setEditing] = useState(null) // null | 'new' | {id,...}
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [alert, setAlert] = useState(null)
  const [confirmId, setConfirmId] = useState(null)

  const load = () => supabase.from('projects').select('*').order('created_at', { ascending: false }).then(({ data }) => setProjects(data || []))
  useEffect(() => { load() }, [])

  const showAlert = (type, msg) => { setAlert({ type, msg }); setTimeout(() => setAlert(null), 3000) }

  const startNew = () => { setForm(EMPTY); setEditing('new') }
  const startEdit = (p) => { setForm({ ...p }); setEditing(p) }
  const cancelEdit = () => { setEditing(null); setForm(EMPTY) }

  const save = async () => {
    if (!form.title) { showAlert('error', 'Title is required'); return }
    setSaving(true)
    let error
    if (editing === 'new') {
      ({ error } = await supabase.from('projects').insert([form]))
    } else {
      ({ error } = await supabase.from('projects').update(form).eq('id', editing.id))
    }
    setSaving(false)
    if (error) { showAlert('error', error.message); return }
    showAlert('success', editing === 'new' ? 'Project added!' : 'Project updated!')
    setEditing(null); setForm(EMPTY); load()
  }

  const confirmDelete = (id) => setConfirmId(id)
  const doDelete = async () => {
    const { error } = await supabase.from('projects').delete().eq('id', confirmId)
    setConfirmId(null)
    if (error) { showAlert('error', error.message); return }
    showAlert('success', 'Deleted!'); load()
  }

  const F = (key, label, type = 'text', placeholder = '') => (
    <FormField label={label}>
      <input type={type} value={form[key] || ''} placeholder={placeholder}
        onChange={e => setForm({ ...form, [key]: e.target.value })} style={INPUT} />
    </FormField>
  )

  return (
    <div>
      <SectionHeader title="📁 Projects" onAdd={!editing ? startNew : null} />
      {alert && <Alert type={alert.type} msg={alert.msg} />}

      {/* Form */}
      {editing && (
        <AdminCard style={{ border: '2px solid #3265be', marginBottom: 16 }}>
          <div style={{ fontFamily: 'Tahoma', fontSize: 13, fontWeight: 'bold', marginBottom: 12, color: '#0831d9' }}>
            {editing === 'new' ? '➕ Add Project' : '✏️ Edit Project'}
          </div>
          {F('title', 'Title *')}
          <FormField label="Description">
            <textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} style={TEXTAREA} />
          </FormField>
          {F('tech_stack', 'Tech Stack', 'text', 'React, Node.js, PostgreSQL')}
          {F('github_url', 'GitHub URL', 'url', 'https://github.com/...')}
          {F('live_url', 'Live Demo URL', 'url', 'https://...')}
          {F('image_url', 'Image URL', 'url', 'https://...')}
          {form.image_url && (
            <div style={{ marginBottom: 10 }}>
              <img src={form.image_url} alt="preview" style={{ maxWidth: 200, maxHeight: 100, borderRadius: 3, border: '1px solid #bbb' }} onError={e => e.target.style.display='none'} />
            </div>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={save} disabled={saving} style={XP_BTN_GREEN()}>{saving ? 'Saving...' : '💾 Save'}</button>
            <button onClick={cancelEdit} style={XP_BTN()}>Cancel</button>
          </div>
        </AdminCard>
      )}

      {/* List */}
      {projects.length === 0 && !editing && (
        <div style={{ textAlign: 'center', color: '#999', padding: 30, fontFamily: 'Tahoma', fontSize: 12 }}>No projects yet. Click "Add New" to get started.</div>
      )}
      {projects.map(p => (
        <AdminCard key={p.id}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            {p.image_url && <img src={p.image_url} alt="" style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 3, border: '1px solid #bbb', flexShrink: 0 }} onError={e => e.target.style.display='none'} />}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'Tahoma', fontSize: 13, fontWeight: 'bold', marginBottom: 3 }}>{p.title}</div>
              {p.description && <div style={{ fontSize: 11, color: '#555', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.description}</div>}
              {p.tech_stack && <div style={{ fontSize: 11, color: '#888' }}>🔧 {p.tech_stack}</div>}
            </div>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <button onClick={() => startEdit(p)} style={XP_BTN({ padding: '3px 10px' })}>✏️ Edit</button>
              <button onClick={() => confirmDelete(p.id)} style={XP_BTN_DANGER({ padding: '3px 10px' })}>🗑️</button>
            </div>
          </div>
        </AdminCard>
      ))}

      {confirmId && <ConfirmDelete onConfirm={doDelete} onCancel={() => setConfirmId(null)} />}
    </div>
  )
}
