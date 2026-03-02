import React, { useState } from 'react'

export default function DesktopIcon({ icon, label, onDoubleClick }) {
  const [selected, setSelected] = useState(false)
  const [clicking, setClicking] = useState(false)

  const handleClick = (e) => {
    e.stopPropagation()
    setSelected(true)
    setClicking(true)
    setTimeout(() => setClicking(false), 100)
  }

  const handleDoubleClick = (e) => {
    e.stopPropagation()
    onDoubleClick()
    setSelected(false)
  }

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      tabIndex={0}
      onBlur={() => setSelected(false)}
      onKeyDown={(e) => e.key === 'Enter' && onDoubleClick()}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: 80, cursor: 'default', padding: '6px',
        borderRadius: 4, marginBottom: 4,
        background: selected ? 'rgba(49,105,196,0.45)' : 'transparent',
        border: selected ? '1px dashed rgba(255,255,255,0.6)' : '1px solid transparent',
        userSelect: 'none',
        transform: clicking ? 'scale(0.96)' : 'scale(1)',
        transition: 'transform 0.08s',
        outline: 'none',
      }}
    >
      <div style={{
        fontSize: 40, lineHeight: 1,
        filter: 'drop-shadow(2px 3px 5px rgba(0,0,0,0.7))',
        marginBottom: 5,
      }}>
        {icon}
      </div>
      <span style={{
        color: '#fff', fontSize: 11, fontFamily: 'Tahoma, sans-serif',
        textAlign: 'center', maxWidth: 76,
        textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0 2px 4px rgba(0,0,0,0.8)',
        lineHeight: 1.3, wordBreak: 'break-word',
      }}>{label}</span>
    </div>
  )
}
