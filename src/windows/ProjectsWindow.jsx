import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'

export default function ProjectsWindow() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('projects').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setProjects(data || []); setLoading(false) })
  }, [])

  if (loading) return <Loading />

  return (
    <div style={{ padding: 16, fontFamily: 'Tahoma, sans-serif' }}>
      <WinHeader icon="📁" title="My Projects" count={projects.length} />
      {projects.length === 0 && <Empty msg="No projects yet. Add some in the Admin panel." />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {projects.map(p => (
          <div key={p.id} style={{
            display: 'flex', gap: 14, border: '1px solid #c0bdb4',
            borderRadius: 4, padding: 12, background: '#f5f4f0',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
          }}>
            {p.image_url && (
              <img
                src={p.image_url} alt={p.title}
                style={{ width: 130, height: 80, objectFit: 'cover', borderRadius: 3, border: '1px solid #bbb', flexShrink: 0 }}
                onError={e => e.target.style.display = 'none'}
              />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 4, color: '#0831d9' }}>{p.title}</div>
              <div style={{ fontSize: 12, color: '#444', marginBottom: 8, lineHeight: 1.5 }}>{p.description}</div>
              {p.tech_stack && (
                <div style={{
                  fontSize: 11, background: '#e0e8f8', border: '1px solid #c0cee8',
                  padding: '2px 8px', borderRadius: 10, display: 'inline-block', marginBottom: 8, color: '#1a3a8f'
                }}>🔧 {p.tech_stack}</div>
              )}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {p.github_url && <XPLink href={p.github_url} label="⚡ GitHub" />}
                {p.live_url && <XPLink href={p.live_url} label="🌐 Live Demo" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const XPLink = ({ href, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    style={{
      fontSize: 11, color: '#fff', background: 'linear-gradient(to bottom, #4890d0, #2060b0)',
      padding: '3px 10px', borderRadius: 3, textDecoration: 'none',
      border: '1px solid #1a4a8a', fontFamily: 'Tahoma',
    }}>{label}</a>
)

export const Loading = () => (
  <div style={{ padding: 40, textAlign: 'center', fontFamily: 'Tahoma', color: '#666' }}>
    <div style={{ fontSize: 24, marginBottom: 8 }}>⏳</div>Loading...
  </div>
)

export const Empty = ({ msg }) => (
  <div style={{ padding: 30, textAlign: 'center', fontFamily: 'Tahoma', color: '#999', fontSize: 12 }}>
    <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>{msg}
  </div>
)

export const WinHeader = ({ icon, title, count }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 8,
    borderBottom: '2px solid #aca899', paddingBottom: 10, marginBottom: 14
  }}>
    <span style={{ fontSize: 20 }}>{icon}</span>
    <h3 style={{ fontFamily: 'Tahoma', fontSize: 15, color: '#0831d9', margin: 0 }}>{title}</h3>
    {count !== undefined && (
      <span style={{
        marginLeft: 'auto', fontSize: 11, background: '#0831d9', color: '#fff',
        padding: '1px 8px', borderRadius: 10
      }}>{count}</span>
    )}
  </div>
)
