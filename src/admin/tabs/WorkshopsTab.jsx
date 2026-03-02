import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase.js'
import { XP_BTN, XP_BTN_DANGER, XP_BTN_GREEN, INPUT, TEXTAREA, FormField, AdminCard, SectionHeader, Alert, ConfirmDelete } from '../adminUI.jsx'

const EMPTY = { title: '', organization: '', date: '', description: '' }

export default function WorkshopsTab() {
  const [workshops, setWorkshops] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [alert, setAlert] = useState(null)
  const [confirmId, setConfirmId] = useState(null)

  const load = () => supabase.from('workshops').select('*').order('date', { ascending: false }).then(({ data }) => setWorkshops(data || []))
  useEffect(() => { load() }, [])

  const showAlert = (type, msg) => { setAlert({ type, msg }); setTimeout(() => setAlert(null), 3000) }

  const save = async () => {
    if (!form.title) { showAlert('error', 'Title required'); return }
    setSaving(true)
    let error
    if (editing === 'new') { ({ error } = await supabase.from('workshops').insert([form])) }
    else { ({ error } = await supabase.from('workshops').update(form).eq('id', editing.id)) }
    setSaving(false)
    if (error) { showAlert('error', error.message); return }
    showAlert('success', 'Saved!'); setEditing(null); setForm(EMPTY); load()
  }

  const doDelete = async () => {
    await supabase.from('workshops').delete().eq('id', confirmId)
    setConfirmId(null); showAlert('success', 'Deleted!'); load()
  }

  return (
    <div>
      <SectionHeader title="🎓 Workshops" onAdd={!editing ? () => { setForm(EMPTY); setEditing('new') } : null} />
      {alert && <Alert type={alert.type} msg={alert.msg} />}

      {editing && (
        <AdminCard style={{ border: '2px solid #3265be', marginBottom: 16 }}>
          <div style={{ fontFamily: 'Tahoma', fontSize: 13, fontWeight: 'bold', marginBottom: 12, color: '#0831d9' }}>{editing==='new'?'➕ Add Workshop':'✏️ Edit Workshop'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <FormField label="Title *"><input value={form.title||''} onChange={e=>setForm({...form,title:e.target.value})} style={INPUT} /></FormField>
            <FormField label="Organization"><input value={form.organization||''} onChange={e=>setForm({...form,organization:e.target.value})} style={INPUT} /></FormField>
            <FormField label="Date"><input value={form.date||''} onChange={e=>setForm({...form,date:e.target.value})} placeholder="2024-05" style={INPUT} /></FormField>
          </div>
          <FormField label="Description">
            <textarea value={form.description||''} onChange={e=>setForm({...form,description:e.target.value})} rows={3} style={TEXTAREA} />
          </FormField>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button onClick={save} disabled={saving} style={XP_BTN_GREEN()}>{saving?'Saving...':'💾 Save'}</button>
            <button onClick={() => { setEditing(null); setForm(EMPTY) }} style={XP_BTN()}>Cancel</button>
          </div>
        </AdminCard>
      )}

      {workshops.map(w => (
        <AdminCard key={w.id} style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>🎓</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Tahoma', fontSize: 13, fontWeight: 'bold' }}>{w.title}</div>
              <div style={{ fontSize: 11, color: '#777', fontFamily: 'Tahoma' }}>{w.organization}{w.date?` · ${w.date}`:''}</div>
              {w.description && <div style={{ fontSize: 11, color: '#555', fontFamily: 'Tahoma', marginTop: 4 }}>{w.description}</div>}
            </div>
            <button onClick={() => { setForm({...w}); setEditing(w) }} style={XP_BTN({ padding: '3px 10px' })}>✏️</button>
            <button onClick={() => setConfirmId(w.id)} style={XP_BTN_DANGER({ padding: '3px 10px' })}>🗑️</button>
          </div>
        </AdminCard>
      ))}

      {workshops.length === 0 && !editing && <div style={{ textAlign: 'center', color: '#999', padding: 30, fontFamily: 'Tahoma', fontSize: 12 }}>No workshops yet.</div>}
      {confirmId && <ConfirmDelete onConfirm={doDelete} onCancel={() => setConfirmId(null)} />}
    </div>
  )
}
