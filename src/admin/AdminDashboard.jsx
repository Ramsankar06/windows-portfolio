import React, { useState } from 'react'
import { supabase } from '../lib/supabase.js'
import ProjectsTab from './tabs/ProjectsTab.jsx'
import SkillsTab from './tabs/SkillsTab.jsx'
import CertificatesTab from './tabs/CertificatesTab.jsx'
import WorkshopsTab from './tabs/WorkshopsTab.jsx'
import AboutTab from './tabs/AboutTab.jsx'
import MessagesTab from './tabs/MessagesTab.jsx'

const TITLE_GRADIENT = 'linear-gradient(to bottom, #0a246a 0%, #3169c4 6%, #2663d3 50%, #1941a5 95%)'
const TABS = [
  { id: 'projects',     icon: '📁', label: 'Projects',     Component: ProjectsTab },
  { id: 'skills',       icon: '🧠', label: 'Skills',       Component: SkillsTab },
  { id: 'certificates', icon: '📜', label: 'Certificates', Component: CertificatesTab },
  { id: 'workshops',    icon: '🎓', label: 'Workshops',    Component: WorkshopsTab },
  { id: 'about',        icon: '👤', label: 'About & Resume', Component: AboutTab },
  { id: 'messages',     icon: '✉️', label: 'Messages',     Component: MessagesTab },
]

export default function AdminDashboard({ session }) {
  const [activeTab, setActiveTab] = useState('projects')
  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    await supabase.auth.signOut()
  }

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.Component

  return (
    <div style={{
      minHeight: '100vh', background: '#d4d0c8',
      fontFamily: 'Tahoma, sans-serif', display: 'flex', flexDirection: 'column'
    }}>
      {/* Top Bar */}
      <div style={{ background: TITLE_GRADIENT, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, width: 18, height: 18 }}>
          {[['#f25022','#7fba00'],['#00a4ef','#ffb900']].flat().map((c,i) => <div key={i} style={{ background: c }} />)}
        </div>
        <span style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, textShadow: '1px 1px 2px rgba(0,0,0,0.5)', flex: 1 }}>
          Portfolio XP — Admin Dashboard
        </span>
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>{session?.user?.email}</span>
        <a href="/" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, textDecoration: 'none', marginLeft: 12 }}>← View Portfolio</a>
        <button
          onClick={handleSignOut} disabled={signingOut}
          style={{
            background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff', borderRadius: 4, padding: '4px 14px',
            fontFamily: 'Tahoma', fontSize: 12, cursor: 'pointer'
          }}
        >{signingOut ? 'Signing out...' : '⏻ Sign Out'}</button>
      </div>

      {/* Blue accent */}
      <div style={{ height: 3, background: 'linear-gradient(to right, #2459c9, #7ba2e4, #2459c9)' }} />

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <div style={{
          width: 180, background: '#ece9d8',
          borderRight: '1px solid #aca899',
          padding: '12px 0', flexShrink: 0,
        }}>
          <div style={{ fontSize: 10, color: '#888', fontWeight: 'bold', padding: '4px 16px 10px', textTransform: 'uppercase', letterSpacing: 1 }}>Sections</div>
          {TABS.map(tab => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 16px', cursor: 'pointer', fontSize: 13,
                background: activeTab === tab.id
                  ? 'linear-gradient(to right, #3169c4, #2456be)'
                  : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#333',
                borderLeft: activeTab === tab.id ? '3px solid #0831d9' : '3px solid transparent',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                transition: 'background 0.1s',
              }}
            >
              <span style={{ fontSize: 18 }}>{tab.icon}</span>
              <span>{tab.label}</span>
            </div>
          ))}

          <div style={{ height: 1, background: '#aca899', margin: '12px 0' }} />

          <div style={{ padding: '0 12px' }}>
            <div style={{ fontSize: 11, color: '#888', marginBottom: 8, padding: '0 4px' }}>Quick Links</div>
            <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', fontSize: 11, color: '#0831d9', padding: '4px', textDecoration: 'none' }}>
              🔗 Supabase Dashboard
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 20, maxWidth: 900 }}>
          {/* Panel */}
          <div style={{
            background: '#fff', border: '1px solid #c0bdb4',
            borderRadius: 4, padding: 20, minHeight: 400,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
          }}>
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div style={{
        background: '#d4d0c8', borderTop: '1px solid #aca899',
        padding: '3px 12px', display: 'flex', alignItems: 'center', gap: 16
      }}>
        <span style={{ fontSize: 11, color: '#666' }}>Portfolio XP Admin</span>
        <span style={{ fontSize: 11, color: '#999' }}>|</span>
        <span style={{ fontSize: 11, color: '#666' }}>Logged in as: {session?.user?.email}</span>
      </div>
    </div>
  )
}
