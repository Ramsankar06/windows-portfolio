import React, { useState, useEffect } from 'react'

const TASKBAR_GRADIENT = 'linear-gradient(to bottom, #1f3f9e 0%, #3a6bc0 8%, #3e77bf 15%, #245fc0 50%, #1e49ad 85%, #163a8f 100%)'
const START_GRADIENT = 'linear-gradient(to right, #3c8b25 0%, #76c044 50%, #3c8b25 100%)'

const WINDOW_CONFIGS = {
  projects:     { icon: '📁', label: 'Projects' },
  skills:       { icon: '🧠', label: 'Skills' },
  certificates: { icon: '📜', label: 'Certificates' },
  workshops:    { icon: '🎓', label: 'Workshops' },
  about:        { icon: '👤', label: 'About Me' },
  contact:      { icon: '✉️', label: 'Contact' },
  resume:       { icon: '📄', label: 'Resume' },
  secret:       { icon: '🐱', label: 'Secret' },
}

export default function Taskbar({ openWindows, minimized, activeWindow, onWindowClick, onStartClick, startOpen }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, height: 40,
      background: TASKBAR_GRADIENT,
      zIndex: 1000, display: 'flex', alignItems: 'center',
      boxShadow: '0 -2px 6px rgba(0,0,0,0.4)',
      borderTop: '1px solid rgba(255,255,255,0.15)',
    }}>
      {/* Start Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onStartClick() }}
        style={{
          background: startOpen ? 'linear-gradient(to right, #2a6b1a, #5ca030)' : START_GRADIENT,
          border: '1px solid rgba(0,80,0,0.7)', borderRadius: '0 14px 14px 0',
          color: '#fff', fontFamily: 'Tahoma, sans-serif',
          fontWeight: 'bold', fontSize: 14, fontStyle: 'italic',
          padding: '4px 18px 4px 10px', cursor: 'pointer',
          height: 36, display: 'flex', alignItems: 'center', gap: 6,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.3)',
          flexShrink: 0,
        }}
      >
        {/* Windows flag */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, width: 18, height: 18 }}>
          {[['#f25022','#7fba00'],['#00a4ef','#ffb900']].flat().map((c,i) => (
            <div key={i} style={{ background: c, borderRadius: 1 }} />
          ))}
        </div>
        start
      </button>

      {/* Separator */}
      <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.2)', margin: '0 4px' }} />

      {/* Open Windows */}
      <div style={{ display: 'flex', gap: 2, flex: 1, overflow: 'hidden', padding: '0 4px' }}>
        {openWindows.map(id => {
          const cfg = WINDOW_CONFIGS[id]
          if (!cfg) return null
          const isMin = minimized.includes(id)
          const isActive = activeWindow === id && !isMin
          return (
            <button
              key={id}
              onClick={() => onWindowClick(id)}
              title={cfg.label}
              style={{
                background: isActive
                  ? 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.2))'
                  : 'linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.1))',
                border: `1px solid ${isActive ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.3)'}`,
                borderRadius: 3, color: '#fff',
                fontFamily: 'Tahoma', fontSize: 11,
                padding: '2px 8px', cursor: 'pointer',
                maxWidth: 140, overflow: 'hidden',
                textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                height: 28, display: 'flex', alignItems: 'center', gap: 5,
                boxShadow: isActive ? 'inset 1px 1px 3px rgba(0,0,0,0.4)' : 'none',
                fontWeight: isMin ? 'normal' : isActive ? 'bold' : 'normal',
                opacity: isMin ? 0.7 : 1,
              }}
            >
              <span>{cfg.icon}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{cfg.label}</span>
            </button>
          )
        })}
      </div>

      {/* System Tray */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        paddingRight: 8, paddingLeft: 10,
        borderLeft: '1px solid rgba(255,255,255,0.2)',
        height: '100%',
        background: 'rgba(0,0,60,0.2)',
      }}>
        <span style={{ fontSize: 14 }}>🔊</span>
        <span style={{ fontSize: 14 }}>🌐</span>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#fff', fontSize: 11, fontFamily: 'Tahoma', lineHeight: 1.2 }}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 9, fontFamily: 'Tahoma' }}>
            {time.toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  )
}
