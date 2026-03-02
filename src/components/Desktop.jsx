import React, { useState, useCallback, useEffect } from 'react'
import XPWindow from './XPWindow.jsx'
import DesktopIcon from './DesktopIcon.jsx'
import Taskbar from './Taskbar.jsx'
import StartMenu from './StartMenu.jsx'
import ProjectsWindow from '../windows/ProjectsWindow.jsx'
import SkillsWindow from '../windows/SkillsWindow.jsx'
import CertificatesWindow from '../windows/CertificatesWindow.jsx'
import WorkshopsWindow from '../windows/WorkshopsWindow.jsx'
import AboutWindow from '../windows/AboutWindow.jsx'
import ContactWindow from '../windows/ContactWindow.jsx'
import CatWindow from '../windows/CatWindow.jsx'
import ResumeWindow from '../windows/ResumeWindow.jsx'
import VPNAlert from './VPNAlert.jsx'

const BLISS_URL = '/bliss.jpg'

const WINDOWS_CONFIG = [
  {
    id: 'projects', icon: '📁', label: 'Projects', title: 'My Projects',
    Content: ProjectsWindow,
    pos: { x: 100, y: 30 }, size: { w: 620, h: 460 },
  },
  {
    id: 'skills', icon: '🧠', label: 'Skills', title: 'Skills & Technologies',
    Content: SkillsWindow,
    pos: { x: 130, y: 40 }, size: { w: 520, h: 400 },
  },
  {
    id: 'certificates', icon: '📜', label: 'Certificates', title: 'Certificates',
    Content: CertificatesWindow,
    pos: { x: 150, y: 50 }, size: { w: 540, h: 400 },
  },
  {
    id: 'workshops', icon: '🎓', label: 'Workshops', title: 'Workshops & Events',
    Content: WorkshopsWindow,
    pos: { x: 160, y: 55 }, size: { w: 520, h: 400 },
  },
  {
    id: 'about', icon: '👤', label: 'About Me', title: 'About Me',
    Content: AboutWindow,
    pos: { x: 120, y: 45 }, size: { w: 500, h: 400 },
  },
  {
    id: 'contact', icon: '✉️', label: 'Contact', title: 'Contact Me',
    Content: ContactWindow,
    pos: { x: 200, y: 60 }, size: { w: 460, h: 420 },
  },
  {
    id: 'resume', icon: '📄', label: 'Resume', title: 'Resume / CV',
    Content: ResumeWindow,
    pos: { x: 180, y: 55 }, size: { w: 460, h: 340 },
  },
  {
    id: 'secret', icon: '🐱', label: 'Secret', title: '🐱 Secret Cat Mode',
    Content: CatWindow,
    pos: { x: 220, y: 70 }, size: { w: 400, h: 380 },
  },
]

export default function Desktop({ onShutdown }) {
  const [openWindows, setOpenWindows] = useState([])
  const [minimized, setMinimized] = useState([])
  const [zStack, setZStack] = useState([])
  const [startOpen, setStartOpen] = useState(false)
  const [showVPNAlert, setShowVPNAlert] = useState(true)

  const openWindow = useCallback((id) => {
    setMinimized(m => m.filter(x => x !== id))
    setOpenWindows(w => w.includes(id) ? w : [...w, id])
    setZStack(z => [...z.filter(x => x !== id), id])
    setStartOpen(false)
  }, [])

  const closeWindow = (id) => {
    setOpenWindows(w => w.filter(x => x !== id))
    setMinimized(m => m.filter(x => x !== id))
    setZStack(z => z.filter(x => x !== id))
  }

  const minWindow = (id) => {
    setMinimized(m => m.includes(id) ? m : [...m, id])
  }

  const focusWindow = (id) => {
    setZStack(z => [...z.filter(x => x !== id), id])
  }

  const handleTaskbarClick = (id) => {
    const isMin = minimized.includes(id)
    const isActive = zStack[zStack.length - 1] === id && !isMin
    if (isMin) {
      setMinimized(m => m.filter(x => x !== id))
      setZStack(z => [...z.filter(x => x !== id), id])
    } else if (isActive) {
      minWindow(id)
    } else {
      focusWindow(id)
    }
  }

  const getZ = (id) => {
    const i = zStack.indexOf(id)
    return i === -1 ? 10 : 10 + i
  }

  const activeWindow = minimized.includes(zStack[zStack.length - 1])
    ? null
    : zStack[zStack.length - 1]

  return (
    <div
      onClick={() => setStartOpen(false)}
      style={{
        width: '100vw', height: '100vh',
        overflow: 'hidden', position: 'relative',
        backgroundImage: `url(${BLISS_URL})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}
    >
      {/* Fallback gradient if image fails */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(180deg, #4a9de8 0%, #7cc8f0 34%, #6ab04c 35%, #4e8c35 60%, #3a6e28 100%)',
        backgroundImage: `url(${BLISS_URL})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />

      {/* Desktop Icons */}
      <div style={{
        position: 'absolute', top: 16, left: 12,
        display: 'flex', flexDirection: 'column',
        zIndex: 5, gap: 0,
      }}>
        {WINDOWS_CONFIG.map(cfg => (
          <DesktopIcon
            key={cfg.id}
            icon={cfg.icon}
            label={cfg.label}
            onDoubleClick={() => openWindow(cfg.id)}
          />
        ))}
      </div>

      {/* Windows */}
      {openWindows.map(id => {
        const cfg = WINDOWS_CONFIG.find(w => w.id === id)
        if (!cfg) return null
        const isMin = minimized.includes(id)
        return (
          <div key={id} style={{ display: isMin ? 'none' : 'block' }}>
            <XPWindow
              id={id}
              title={cfg.title}
              icon={cfg.icon}
              onClose={() => closeWindow(id)}
              onMinimize={() => minWindow(id)}
              onFocus={() => focusWindow(id)}
              zIndex={getZ(id)}
              initialPos={cfg.pos}
              initialSize={cfg.size}
            >
              <cfg.Content />
            </XPWindow>
          </div>
        )
      })}

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows}
        minimized={minimized}
        activeWindow={activeWindow}
        onWindowClick={handleTaskbarClick}
        onStartClick={() => setStartOpen(s => !s)}
        startOpen={startOpen}
      />

      {/* Start Menu */}
      {startOpen && (
        <StartMenu
          onOpenWindow={openWindow}
          onShutdown={() => { setStartOpen(false); onShutdown() }}
          onClose={() => setStartOpen(false)}
        />
      )}

      {/* VPN Alert Popup */}
      {showVPNAlert && <VPNAlert onClose={() => setShowVPNAlert(false)} />}
    </div>
  )
}
