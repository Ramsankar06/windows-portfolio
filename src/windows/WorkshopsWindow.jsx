import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { Loading, Empty, WinHeader } from './ProjectsWindow.jsx'

export default function WorkshopsWindow() {
  const [workshops, setWorkshops] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('workshops').select('*').order('date', { ascending: false })
      .then(({ data }) => { setWorkshops(data || []); setLoading(false) })
  }, [])

  if (loading) return <Loading />

  return (
    <div style={{ padding: 16, fontFamily: 'Tahoma, sans-serif' }}>
      <WinHeader icon="🎓" title="Workshops & Events" count={workshops.length} />
      {workshops.length === 0 && <Empty msg="No workshops added yet." />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {workshops.map(w => (
          <div key={w.id} style={{
            border: '1px solid #c0bdb4', borderRadius: 4, padding: '12px 14px',
            background: '#f5f4f0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
          }}>
            <div style={{ fontWeight: 'bold', fontSize: 13, color: '#0831d9', marginBottom: 4 }}>{w.title}</div>
            <div style={{ fontSize: 12, color: '#777', marginBottom: 6 }}>
              🏢 {w.organization}
              {w.date && <> · 📅 {w.date}</>}
            </div>
            {w.description && (
              <div style={{ fontSize: 12, color: '#444', lineHeight: 1.6 }}>{w.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
