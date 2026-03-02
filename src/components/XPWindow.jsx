import React, { useState, useEffect, useRef } from 'react'

const TITLE_GRADIENT = 'linear-gradient(to bottom, #0a246a 0%, #a6b5da 4%, #3169c4 6%, #4d80e4 8%, #2157cf 10%, #2663d3 50%, #1941a5 95%, #0f2c80 100%)'

export default function XPWindow({
  id, title, icon, children,
  onClose, onMinimize, onFocus,
  zIndex, initialPos, initialSize
}) {
  const [pos, setPos] = useState(initialPos || { x: 80, y: 60 })
  const [size] = useState(initialSize || { w: 560, h: 440 })
  const [maximized, setMaximized] = useState(false)
  const [preMax, setPreMax] = useState(null)
  const [hoverBtn, setHoverBtn] = useState(null)

  const dragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  const onMouseDown = (e) => {
    if (maximized) return
    dragging.current = true
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    onFocus()
    e.preventDefault()
  }

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y })
    }
    const onUp = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  const toggleMax = () => {
    if (!maximized) {
      setPreMax({ pos, size })
      setPos({ x: 0, y: 0 })
      setMaximized(true)
    } else {
      if (preMax) setPos(preMax.pos)
      setMaximized(false)
    }
  }

  const currentW = maximized ? window.innerWidth : size.w
  const currentH = maximized ? window.innerHeight - 40 : size.h
  const currentX = maximized ? 0 : pos.x
  const currentY = maximized ? 0 : pos.y

  const btns = [
    { key: 'min',   label: '–',   action: onMinimize, normal: '#4890d0', hover: '#7ab5f0' },
    { key: 'max',   label: maximized ? '❐' : '□', action: toggleMax, normal: '#4890d0', hover: '#7ab5f0' },
    { key: 'close', label: '✕',   action: onClose,    normal: '#c0392b', hover: '#e74c3c' },
  ]

  return (
    <div
      onMouseDown={onFocus}
      style={{
        position: 'absolute',
        left: currentX, top: currentY,
        width: currentW, height: currentH,
        zIndex,
        display: 'flex', flexDirection: 'column',
        border: '2px solid #0831d9',
        borderRadius: maximized ? 0 : '8px 8px 4px 4px',
        boxShadow: 'inset 1px 1px 0 #6b89d4, 6px 6px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,50,0.3)',
        overflow: 'hidden',
        fontFamily: 'Tahoma, sans-serif',
        animation: 'windowOpen 0.15s ease-out',
      }}
    >
      <style>{`
        @keyframes windowOpen {
          from { opacity: 0.5; transform: scale(0.97); }
          to   { opacity: 1;   transform: scale(1); }
        }
      `}</style>

      {/* Title Bar */}
      <div
        onMouseDown={onMouseDown}
        onDoubleClick={toggleMax}
        style={{
          background: TITLE_GRADIENT,
          padding: '3px 6px',
          display: 'flex', alignItems: 'center',
          cursor: maximized ? 'default' : 'move',
          userSelect: 'none', flexShrink: 0, minHeight: 28,
        }}
      >
        <span style={{ fontSize: 14, marginRight: 5, lineHeight: 1 }}>{icon}</span>
        <span style={{
          color: '#fff', fontSize: 12, fontWeight: 'bold', flex: 1,
          textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
        }}>{title}</span>

        <div style={{ display: 'flex', gap: 3, marginLeft: 8 }}>
          {btns.map(({ key, label, action, normal, hover }) => (
            <button
              key={key}
              onClick={(e) => { e.stopPropagation(); action() }}
              onMouseEnter={() => setHoverBtn(key)}
              onMouseLeave={() => setHoverBtn(null)}
              style={{
                width: 21, height: 21,
                background: hoverBtn === key ? hover : normal,
                border: '1px solid rgba(0,0,0,0.5)',
                borderRadius: 3,
                color: '#fff', fontSize: key === 'close' ? 10 : 12,
                fontWeight: 'bold', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Tahoma', lineHeight: 1,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* Blue accent line */}
      <div style={{ height: 2, background: 'linear-gradient(to right, #2459c9, #7ba2e4, #2459c9)', flexShrink: 0 }} />

      {/* Content Area */}
      <div style={{ flex: 1, overflow: 'auto', background: '#fff' }}>
        {children}
      </div>

      {/* Status bar */}
      <div style={{
        height: 20, background: '#ece9d8', borderTop: '1px solid #aca899',
        display: 'flex', alignItems: 'center', paddingLeft: 8, flexShrink: 0
      }}>
        <span style={{ fontSize: 10, color: '#666', fontFamily: 'Tahoma' }}>Ready</span>
      </div>
    </div>
  )
}
