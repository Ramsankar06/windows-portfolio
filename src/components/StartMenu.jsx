import React, { useState } from 'react'

const TITLE_GRADIENT = 'linear-gradient(to bottom, #0a246a 0%, #a6b5da 4%, #3169c4 6%, #4d80e4 8%, #2157cf 10%, #2663d3 50%, #1941a5 95%, #0f2c80 100%)'

export default function StartMenu({ onOpenWindow, onShutdown, onClose }) {
  const [hovered, setHovered] = useState(null)

  const leftItems = [
    { id: 'projects',     icon: '📁', label: 'Projects' },
    { id: 'skills',       icon: '🧠', label: 'Skills' },
    { id: 'certificates', icon: '📜', label: 'Certificates' },
    { id: 'workshops',    icon: '🎓', label: 'Workshops' },
    { id: 'resume',       icon: '📄', label: 'Resume' },
  ]
  const rightItems = [
    { id: 'about',   icon: '👤', label: 'About Me' },
    { id: 'contact', icon: '✉️', label: 'Contact' },
    { id: 'secret',  icon: '🐱', label: 'Secret...' },
  ]

  const Item = ({ item, side }) => (
    <div
      onClick={() => { onOpenWindow(item.id); onClose() }}
      onMouseEnter={() => setHovered(`${side}-${item.id}`)}
      onMouseLeave={() => setHovered(null)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '6px 12px', cursor: 'pointer', borderRadius: 3,
        background: hovered === `${side}-${item.id}` ? 'linear-gradient(to bottom, #3a72d4, #2456be)' : 'transparent',
        color: hovered === `${side}-${item.id}` ? '#fff' : '#000',
        fontFamily: 'Tahoma', fontSize: 12, transition: 'background 0.1s',
      }}
    >
      <span style={{ fontSize: 22 }}>{item.icon}</span>
      <span>{item.label}</span>
    </div>
  )

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'fixed', bottom: 40, left: 0,
        width: 380, background: '#ece9d8',
        zIndex: 2000,
        border: '2px solid #0831d9',
        borderRadius: '8px 8px 0 0',
        boxShadow: '4px -2px 16px rgba(0,0,0,0.5)',
        fontFamily: 'Tahoma, sans-serif',
        overflow: 'hidden',
        animation: 'menuSlideUp 0.15s ease-out',
      }}
    >
      <style>{`@keyframes menuSlideUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>

      {/* User Banner */}
      <div style={{ background: TITLE_GRADIENT, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 4,
          background: '#fff', border: '2px solid rgba(255,255,255,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26
        }}>👨‍💻</div>
        <div>
          <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Developer</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>Portfolio Owner</div>
        </div>
      </div>

      {/* Two-column menu */}
      <div style={{ display: 'flex', minHeight: 260 }}>
        {/* Left: pinned apps */}
        <div style={{ flex: 1, borderRight: '1px solid #bbb', padding: '8px 4px' }}>
          <div style={{ fontSize: 10, color: '#888', fontWeight: 'bold', padding: '2px 12px 6px', textTransform: 'uppercase', letterSpacing: 0.8 }}>Open</div>
          {leftItems.map(item => <Item key={item.id} item={item} side="left" />)}
        </div>
        {/* Right: places */}
        <div style={{ flex: 1, padding: '8px 4px' }}>
          <div style={{ fontSize: 10, color: '#888', fontWeight: 'bold', padding: '2px 12px 6px', textTransform: 'uppercase', letterSpacing: 0.8 }}>Places</div>
          {rightItems.map(item => <Item key={item.id} item={item} side="right" />)}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#aca899', margin: '0 0' }} />

      {/* Bottom bar */}
      <div style={{ background: '#d4d0c8', padding: '6px 12px', display: 'flex', justifyContent: 'flex-end' }}>
        <div
          onClick={onShutdown}
          onMouseEnter={() => setHovered('shutdown')}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '4px 12px', cursor: 'pointer', borderRadius: 3,
            background: hovered === 'shutdown' ? 'linear-gradient(to bottom, #3a72d4, #2456be)' : 'transparent',
            color: hovered === 'shutdown' ? '#fff' : '#000',
            fontFamily: 'Tahoma', fontSize: 12, border: hovered === 'shutdown' ? '1px solid #1a47a0' : '1px solid transparent',
          }}
        >
          <span style={{ fontSize: 18 }}>⏻</span> Shut Down
        </div>
      </div>
    </div>
  )
}
