import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { Loading, WinHeader } from './ProjectsWindow.jsx'

export default function AboutWindow() {
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('about').select('*').limit(1).single()
      .then(({ data }) => { setAbout(data); setLoading(false) })
  }, [])

  if (loading) return <Loading />
  if (!about) return (
    <div style={{ padding: 24, fontFamily: 'Tahoma', textAlign: 'center', color: '#888' }}>
      No about info yet. Add it in the Admin panel.
    </div>
  )

  return (
    <div style={{ padding: 16, fontFamily: 'Tahoma, sans-serif' }}>
      <WinHeader icon="👤" title="About Me" />

      {/* Avatar + Bio */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'flex-start' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, #4d80e4, #0831d9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, flexShrink: 0, border: '3px solid #fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>👨‍💻</div>
        <div style={{
          flex: 1, background: '#f5f4f0', border: '1px solid #c0bdb4',
          borderRadius: 4, padding: 12, fontSize: 13, color: '#333',
          lineHeight: 1.7, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)'
        }}>
          {about.bio || 'No bio provided.'}
        </div>
      </div>

      {/* Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {[
          { icon: '📍', label: 'Location', val: about.location },
          { icon: '✉️', label: 'Email', val: about.email, href: `mailto:${about.email}` },
        ].filter(d => d.val).map(d => (
          <div key={d.label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 12px', background: '#f5f4f0',
            border: '1px solid #c0bdb4', borderRadius: 4,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
          }}>
            <span style={{ fontSize: 18 }}>{d.icon}</span>
            <span style={{ fontSize: 12, color: '#888', minWidth: 60 }}>{d.label}:</span>
            {d.href
              ? <a href={d.href} style={{ fontSize: 12, color: '#0831d9' }}>{d.val}</a>
              : <span style={{ fontSize: 12, color: '#333' }}>{d.val}</span>
            }
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {about.linkedin && (
          <a href={about.linkedin} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 12, color: '#fff', background: '#0077b5',
              padding: '6px 16px', borderRadius: 4, textDecoration: 'none',
              fontFamily: 'Tahoma', border: '1px solid #005a8e'
            }}>
            💼 LinkedIn
          </a>
        )}
        {about.github && (
          <a href={about.github} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 12, color: '#fff', background: '#24292e',
              padding: '6px 16px', borderRadius: 4, textDecoration: 'none',
              fontFamily: 'Tahoma', border: '1px solid #111'
            }}>
            🐙 GitHub
          </a>
        )}
      </div>
    </div>
  )
}
