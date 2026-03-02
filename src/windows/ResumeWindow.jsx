import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { Loading, WinHeader } from './ProjectsWindow.jsx'

export default function ResumeWindow() {
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('about').select('resume_url').limit(1).single()
      .then(({ data }) => { setAbout(data); setLoading(false) })
  }, [])

  if (loading) return <Loading />

  const hasResume = about?.resume_url

  return (
    <div style={{ padding: 24, fontFamily: 'Tahoma, sans-serif', textAlign: 'center' }}>
      <WinHeader icon="📄" title="Resume / CV" />
      <div style={{
        margin: '20px auto', padding: 30, maxWidth: 320,
        background: '#f5f4f0', border: '1px solid #c0bdb4',
        borderRadius: 6, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
      }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>📄</div>
        <div style={{ fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>Resume / CV</div>
        <div style={{ fontSize: 12, color: '#777', marginBottom: 20 }}>
          {hasResume ? 'Download my latest resume to learn more about my experience and qualifications.' : 'Resume not available yet. Check back later!'}
        </div>

        {hasResume ? (
          <a
            href={about.resume_url}
            target="_blank"
            rel="noopener noreferrer"
            download
            style={{
              display: 'inline-block',
              background: 'linear-gradient(to bottom, #6a9ed5, #3265be)',
              border: '1px solid #1a47a0', color: '#fff',
              padding: '8px 24px', borderRadius: 4,
              textDecoration: 'none', fontSize: 13,
              fontFamily: 'Tahoma', fontWeight: 'bold',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            ⬇️ Download Resume
          </a>
        ) : (
          <div style={{
            padding: '8px 20px', background: '#ddd', border: '1px solid #bbb',
            borderRadius: 4, fontSize: 12, color: '#888', display: 'inline-block'
          }}>
            Not available
          </div>
        )}
      </div>

      <div style={{ fontSize: 11, color: '#aaa', marginTop: 12 }}>
        PDF format · Updated regularly
      </div>
    </div>
  )
}
