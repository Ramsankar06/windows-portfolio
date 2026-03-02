import React, { useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { WinHeader } from './ProjectsWindow.jsx'

const XP_BTN = {
  background: 'linear-gradient(to bottom, #6a9ed5 0%, #4a7bc8 50%, #3265be 100%)',
  border: '1px solid #1a47a0', borderRadius: 4, color: '#fff',
  fontFamily: 'Tahoma', fontSize: 12, cursor: 'pointer', padding: '5px 20px',
}
const INPUT_STYLE = {
  width: '100%', padding: '5px 8px', border: '1px solid #a0a0a0',
  borderRadius: 2, fontFamily: 'Tahoma', fontSize: 12,
  background: '#fff', boxSizing: 'border-box',
  outline: 'none',
}

export default function ContactWindow() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState('idle') // idle | loading | success | error
  const [err, setErr] = useState('')

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setErr('Please fill in all fields.'); return
    }
    setState('loading')
    const { error } = await supabase.from('messages').insert([form])
    if (error) { setErr(error.message); setState('error') }
    else { setState('success') }
  }

  if (state === 'success') return (
    <div style={{ padding: 24, fontFamily: 'Tahoma', textAlign: 'center' }}>
      <WinHeader icon="✉️" title="Contact Me" />
      <div style={{ background: '#d4edda', border: '1px solid #28a745', borderRadius: 4, padding: 20, marginTop: 20 }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
        <div style={{ fontSize: 13, color: '#155724', fontWeight: 'bold' }}>Message sent successfully!</div>
        <div style={{ fontSize: 12, color: '#155724', marginTop: 6 }}>I'll get back to you soon.</div>
        <button onClick={() => { setForm({ name: '', email: '', message: '' }); setState('idle') }} style={{ ...XP_BTN, marginTop: 16 }}>Send Another</button>
      </div>
    </div>
  )

  return (
    <div style={{ padding: 16, fontFamily: 'Tahoma, sans-serif' }}>
      <WinHeader icon="✉️" title="Contact Me" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { label: 'Your Name', key: 'name', type: 'text', placeholder: 'John Doe' },
          { label: 'Email Address', key: 'email', type: 'email', placeholder: 'john@example.com' },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key}>
            <label style={{ fontSize: 12, display: 'block', marginBottom: 4, fontWeight: 'bold', color: '#444' }}>{label}</label>
            <input
              type={type} value={form[key]} placeholder={placeholder}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              style={INPUT_STYLE}
            />
          </div>
        ))}
        <div>
          <label style={{ fontSize: 12, display: 'block', marginBottom: 4, fontWeight: 'bold', color: '#444' }}>Message</label>
          <textarea
            value={form.message} rows={5} placeholder="Your message here..."
            onChange={e => setForm({ ...form, message: e.target.value })}
            style={{ ...INPUT_STYLE, resize: 'vertical' }}
          />
        </div>
        {(state === 'error' || err) && (
          <div style={{ background: '#fde', border: '1px solid #c00', borderRadius: 3, padding: '6px 10px', fontSize: 12, color: '#c00' }}>
            ⚠️ {err || 'Something went wrong.'}
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleSubmit} disabled={state === 'loading'} style={XP_BTN}>
            {state === 'loading' ? 'Sending...' : '📤 Send Message'}
          </button>
        </div>
      </div>
    </div>
  )
}
