import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase.js'
import { XP_BTN, XP_BTN_DANGER, XP_BTN_GREEN, INPUT, FormField, AdminCard, SectionHeader, Alert, ConfirmDelete } from '../adminUI.jsx'

const EMPTY = { category: '', name: '', level: 'Intermediate' }
const LEVELS = ['Expert', 'Advanced', 'Intermediate', 'Beginner']
const LEVEL_COLORS = { Expert: '#27ae60', Advanced: '#2980b9', Intermediate: '#e67e22', Beginner: '#95a5a6' }

export default function SkillsTab() {
  const [skills, setSkills] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [alert, setAlert] = useState(null)
  const [confirmId, setConfirmId] = useState(null)

  const load = () => supabase.from('skills').select('*').order('category').then(({ data }) => setSkills(data || []))
  useEffect(() => { load() }, [])

  const showAlert = (type, msg) => { setAlert({ type, msg }); setTimeout(() => setAlert(null), 3000) }

  const save = async () => {
    if (!form.name) { showAlert('error', 'Name is required'); return }
    setSaving(true)
    let error
    if (editing === 'new') { ({ error } = await supabase.from('skills').insert([form])) }
    else { ({ error } = await supabase.from('skills').update(form).eq('id', editing.id)) }
    setSaving(false)
    if (error) { showAlert('error', error.message); return }
    showAlert('success', 'Saved!'); setEditing(null); setForm(EMPTY); load()
  }

  const doDelete = async () => {
    await supabase.from('skills').delete().eq('id', confirmId)
    setConfirmId(null); showAlert('success', 'Deleted!'); load()
  }

  const grouped = skills.reduce((acc, s) => { (acc[s.category||'Other'] = acc[s.category||'Other'] || []).push(s); return acc }, {})

  return (
    <div>
      <SectionHeader title="🧠 Skills" onAdd={!editing ? () => { setForm(EMPTY); setEditing('new') } : null} />
      {alert && <Alert type={alert.type} msg={alert.msg} />}

      {editing && (
        <AdminCard style={{ border: '2px solid #3265be', marginBottom: 16 }}>
          <div style={{ fontFamily: 'Tahoma', fontSize: 13, fontWeight: 'bold', marginBottom: 12, color: '#0831d9' }}>
            {editing === 'new' ? '➕ Add Skill' : '✏️ Edit Skill'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <FormField label="Category">
              <input value={form.category||''} onChange={e => setForm({...form,category:e.target.value})} placeholder="Frontend" style={INPUT} />
            </FormField>
            <FormField label="Skill Name *">
              <input value={form.name||''} onChange={e => setForm({...form,name:e.target.value})} placeholder="React" style={INPUT} />
            </FormField>
            <FormField label="Level">
              <select value={form.level||'Intermediate'} onChange={e => setForm({...form,level:e.target.value})} style={INPUT}>
                {LEVELS.map(l => <option key={l}>{l}</option>)}
              </select>
            </FormField>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button onClick={save} disabled={saving} style={XP_BTN_GREEN()}>{saving ? 'Saving...' : '💾 Save'}</button>
            <button onClick={() => { setEditing(null); setForm(EMPTY) }} style={XP_BTN()}>Cancel</button>
          </div>
        </AdminCard>
      )}

      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 'bold', color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6, fontFamily: 'Tahoma' }}>{cat}</div>
          {items.map(s => (
            <AdminCard key={s.id} style={{ padding: '8px 12px', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'Tahoma', fontSize: 13, flex: 1 }}>{s.name}</span>
                <span style={{ background: LEVEL_COLORS[s.level]||'#999', color: '#fff', borderRadius: 3, padding: '1px 8px', fontSize: 11, fontWeight: 'bold' }}>{s.level}</span>
                <button onClick={() => { setForm({...s}); setEditing(s) }} style={XP_BTN({ padding: '2px 8px', fontSize: 11 })}>✏️</button>
                <button onClick={() => setConfirmId(s.id)} style={XP_BTN_DANGER({ padding: '2px 8px', fontSize: 11 })}>🗑️</button>
              </div>
            </AdminCard>
          ))}
        </div>
      ))}

      {skills.length === 0 && !editing && <div style={{ textAlign: 'center', color: '#999', padding: 30, fontFamily: 'Tahoma', fontSize: 12 }}>No skills yet.</div>}
      {confirmId && <ConfirmDelete onConfirm={doDelete} onCancel={() => setConfirmId(null)} />}
    </div>
  )
}
