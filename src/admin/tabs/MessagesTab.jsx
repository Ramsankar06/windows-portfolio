import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase.js'
import { XP_BTN_DANGER, AdminCard, SectionHeader, Alert, ConfirmDelete } from '../adminUI.jsx'

export default function MessagesTab() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [expanded, setExpanded] = useState(null)

  const load = () => {
    setLoading(true)
    supabase.from('messages').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setMessages(data || []); setLoading(false) })
  }
  useEffect(() => { load() }, [])

  const showAlert = (type, msg) => { setAlert({ type, msg }); setTimeout(() => setAlert(null), 3000) }

  const doDelete = async () => {
    await supabase.from('messages').delete().eq('id', confirmId)
    setConfirmId(null); showAlert('success', 'Message deleted.'); load()
  }

  return (
    <div>
      <SectionHeader title="✉️ Messages" />
      {alert && <Alert type={alert.type} msg={alert.msg} />}

      {loading && <div style={{ textAlign: 'center', padding: 30, fontFamily: 'Tahoma', color: '#666' }}>Loading...</div>}

      {!loading && messages.length === 0 && (
        <div style={{ textAlign: 'center', color: '#999', padding: 30, fontFamily: 'Tahoma', fontSize: 12 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📭</div>
          No messages yet.
        </div>
      )}

      {messages.map(m => {
        const isOpen = expanded === m.id
        const date = m.created_at ? new Date(m.created_at).toLocaleString() : ''
        return (
          <AdminCard key={m.id} style={{ marginBottom: 8, cursor: 'pointer' }} onClick={() => setExpanded(isOpen ? null : m.id)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>✉️</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Tahoma', fontSize: 13, fontWeight: 'bold' }}>{m.name || 'Anonymous'}</div>
                <div style={{ fontSize: 11, color: '#888', fontFamily: 'Tahoma' }}>
                  {m.email} · {date}
                </div>
                {!isOpen && (
                  <div style={{ fontSize: 11, color: '#555', fontFamily: 'Tahoma', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 400 }}>
                    {m.message}
                  </div>
                )}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setConfirmId(m.id) }}
                style={XP_BTN_DANGER({ padding: '3px 10px' })}
              >🗑️</button>
              <span style={{ fontSize: 12, color: '#888' }}>{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
              <div style={{
                marginTop: 10, padding: 12, background: '#fff',
                border: '1px solid #ddd', borderRadius: 3,
                fontFamily: 'Tahoma', fontSize: 12, color: '#333', lineHeight: 1.7
              }}>
                <strong>From:</strong> {m.name} &lt;{m.email}&gt;<br />
                <strong>Date:</strong> {date}<br />
                <strong>Message:</strong><br />
                <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>{m.message}</div>
              </div>
            )}
          </AdminCard>
        )
      })}

      {confirmId && <ConfirmDelete onConfirm={doDelete} onCancel={() => setConfirmId(null)} />}
    </div>
  )
}
