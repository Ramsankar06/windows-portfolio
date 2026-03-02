import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { Loading, Empty, WinHeader } from './ProjectsWindow.jsx'

const LEVEL_COLORS = { Expert: '#27ae60', Advanced: '#2980b9', Intermediate: '#e67e22', Beginner: '#95a5a6' }
const LEVEL_ORDER  = ['Expert', 'Advanced', 'Intermediate', 'Beginner']

export default function SkillsWindow() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('skills').select('*').order('category')
      .then(({ data }) => { setSkills(data || []); setLoading(false) })
  }, [])

  if (loading) return <Loading />

  const grouped = skills.reduce((acc, s) => {
    const cat = s.category || 'Other'
    ;(acc[cat] = acc[cat] || []).push(s)
    return acc
  }, {})

  return (
    <div style={{ padding: 16, fontFamily: 'Tahoma, sans-serif' }}>
      <WinHeader icon="🧠" title="Skills & Technologies" count={skills.length} />
      {skills.length === 0 && <Empty msg="No skills added yet." />}
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} style={{ marginBottom: 20 }}>
          <div style={{
            fontSize: 11, fontWeight: 'bold', color: '#666', textTransform: 'uppercase',
            letterSpacing: 1.2, marginBottom: 8, paddingBottom: 4,
            borderBottom: '1px solid #ddd',
          }}>{cat}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {items
              .sort((a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level))
              .map(s => (
                <div key={s.id} style={{
                  border: '1px solid #c0bdb4', borderRadius: 4, padding: '6px 12px',
                  background: '#f5f4f0', display: 'flex', alignItems: 'center', gap: 8,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
                }}>
                  <span style={{ fontSize: 13, fontWeight: 'bold', color: '#222' }}>{s.name}</span>
                  <span style={{
                    background: LEVEL_COLORS[s.level] || '#999',
                    color: '#fff', borderRadius: 3,
                    padding: '1px 7px', fontSize: 10, fontWeight: 'bold'
                  }}>{s.level}</span>
                </div>
              ))
            }
          </div>
        </div>
      ))}
    </div>
  )
}
