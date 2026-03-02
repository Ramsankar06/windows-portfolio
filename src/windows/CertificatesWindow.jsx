import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { Loading, Empty, WinHeader } from './ProjectsWindow.jsx'

export default function CertificatesWindow() {
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('certificates').select('*').order('date', { ascending: false })
      .then(({ data }) => { setCerts(data || []); setLoading(false) })
  }, [])

  if (loading) return <Loading />

  return (
    <div style={{ padding: 16, fontFamily: 'Tahoma, sans-serif' }}>
      <WinHeader icon="📜" title="Certificates" count={certs.length} />
      {certs.length === 0 && <Empty msg="No certificates added yet." />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {certs.map(c => (
          <div key={c.id} style={{
            border: '1px solid #c0bdb4', borderRadius: 4, padding: '12px 14px',
            background: '#f5f4f0', display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
          }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>🏆</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: 13, color: '#0831d9', marginBottom: 3 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: '#555' }}>
                <strong>{c.issuer}</strong>
                {c.date && <> · <span style={{ color: '#888' }}>{c.date}</span></>}
              </div>
            </div>
            {c.certificate_url && (
              <a href={c.certificate_url} target="_blank" rel="noopener noreferrer"
                style={{
                  fontSize: 11, color: '#fff', background: 'linear-gradient(to bottom, #4890d0, #2060b0)',
                  padding: '4px 12px', borderRadius: 3, textDecoration: 'none',
                  border: '1px solid #1a4a8a', fontFamily: 'Tahoma', whiteSpace: 'nowrap'
                }}>View →</a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
