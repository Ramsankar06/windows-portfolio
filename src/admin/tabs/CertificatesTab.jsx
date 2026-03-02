import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase.js'
import { XP_BTN, XP_BTN_DANGER, XP_BTN_GREEN, INPUT, FormField, AdminCard, SectionHeader, Alert, ConfirmDelete } from '../adminUI.jsx'

const EMPTY = { title: '', issuer: '', date: '', certificate_url: '' }

export default function CertificatesTab() {
  const [certs, setCerts] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [alert, setAlert] = useState(null)
  const [confirmId, setConfirmId] = useState(null)

  const load = () => supabase.from('certificates').select('*').order('date', { ascending: false }).then(({ data }) => setCerts(data || []))
  useEffect(() => { load() }, [])

  const showAlert = (type, msg) => { setAlert({ type, msg }); setTimeout(() => setAlert(null), 3000) }

  const save = async () => {
    if (!form.title) { showAlert('error', 'Title required'); return }
    setSaving(true)
    let error
    if (editing === 'new') { ({ error } = await supabase.from('certificates').insert([form])) }
    else { ({ error } = await supabase.from('certificates').update(form).eq('id', editing.id)) }
    setSaving(false)
    if (error) { showAlert('error', error.message); return }
    showAlert('success', 'Saved!'); setEditing(null); setForm(EMPTY); load()
  }

  const doDelete = async () => {
    await supabase.from('certificates').delete().eq('id', confirmId)
    setConfirmId(null); showAlert('success', 'Deleted!'); load()
  }

  const F = (key, label, type='text', ph='') => (
    <FormField label={label}><input type={type} value={form[key]||''} placeholder={ph} onChange={e=>setForm({...form,[key]:e.target.value})} style={INPUT} /></FormField>
  )

  return (
    <div>
      <SectionHeader title="📜 Certificates" onAdd={!editing ? () => { setForm(EMPTY); setEditing('new') } : null} />
      {alert && <Alert type={alert.type} msg={alert.msg} />}

      {editing && (
        <AdminCard style={{ border: '2px solid #3265be', marginBottom: 16 }}>
          <div style={{ fontFamily: 'Tahoma', fontSize: 13, fontWeight: 'bold', marginBottom: 12, color: '#0831d9' }}>{editing==='new'?'➕ Add Certificate':'✏️ Edit Certificate'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {F('title', 'Certificate Title *')}
            {F('issuer', 'Issuer / Organization')}
            {F('date', 'Date', 'text', '2024-06')}
            {F('certificate_url', 'Certificate URL', 'url', 'https://...')}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button onClick={save} disabled={saving} style={XP_BTN_GREEN()}>{saving?'Saving...':'💾 Save'}</button>
            <button onClick={() => { setEditing(null); setForm(EMPTY) }} style={XP_BTN()}>Cancel</button>
          </div>
        </AdminCard>
      )}

      {certs.map(c => (
        <AdminCard key={c.id} style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 22 }}>🏆</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Tahoma', fontSize: 13, fontWeight: 'bold' }}>{c.title}</div>
            <div style={{ fontSize: 11, color: '#777', fontFamily: 'Tahoma' }}>{c.issuer}{c.date?` · ${c.date}`:''}</div>
          </div>
          <button onClick={() => { setForm({...c}); setEditing(c) }} style={XP_BTN({ padding: '3px 10px' })}>✏️</button>
          <button onClick={() => setConfirmId(c.id)} style={XP_BTN_DANGER({ padding: '3px 10px' })}>🗑️</button>
        </AdminCard>
      ))}

      {certs.length === 0 && !editing && <div style={{ textAlign: 'center', color: '#999', padding: 30, fontFamily: 'Tahoma', fontSize: 12 }}>No certificates yet.</div>}
      {confirmId && <ConfirmDelete onConfirm={doDelete} onCancel={() => setConfirmId(null)} />}
    </div>
  )
}
