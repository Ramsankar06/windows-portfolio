import React, { useState, useEffect } from 'react'

export default function BootScreen({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('logo')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('loading'), 1000)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    if (phase !== 'loading') return
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(onFinish, 600)
          return 100
        }
        return p + 2
      })
    }, 50)
    return () => clearInterval(interval)
  }, [phase, onFinish])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', zIndex: 9999, fontFamily: 'Tahoma, sans-serif'
    }}>
      <style>{`
        @keyframes xpFadeIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
        @keyframes xpPulse { 0%,100% { opacity:0.7; } 50% { opacity:1; } }
        .xp-boot-logo { animation: xpFadeIn 0.9s ease forwards; }
        .xp-boot-bar { animation: xpPulse 2s ease-in-out infinite; }
      `}</style>

      <div className="xp-boot-logo" style={{ textAlign: 'center' }}>
        {/* XP Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
          {/* Windows flag */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, width: 56, height: 56 }}>
            {[['#f25022','#7fba00'],['#00a4ef','#ffb900']].flat().map((c,i) => (
              <div key={i} style={{ background: c, borderRadius: 2, opacity: 0.95 }} />
            ))}
          </div>
          <div>
            <div style={{ color: '#fff', fontSize: 36, fontWeight: '300', letterSpacing: 2, lineHeight: 1 }}>
              Portfolio <sup style={{ fontSize: 16, color: '#e58000', fontWeight: 'bold', verticalAlign: 'super' }}>XP</sup>
            </div>
            <div style={{ color: '#aaa', fontSize: 13, marginTop: 4 }}>Professional Edition</div>
          </div>
        </div>

        {/* Separator */}
        <div style={{ width: 300, height: 1, background: 'linear-gradient(to right, transparent, #555, transparent)', margin: '24px auto' }} />

        {phase === 'loading' && (
          <div className="xp-boot-bar">
            <div style={{ width: 220, margin: '0 auto', background: '#111', border: '1px solid #333', borderRadius: 16, overflow: 'hidden', height: 16 }}>
              <div style={{
                height: '100%', width: `${progress}%`,
                background: 'linear-gradient(to bottom, #4da6ff 0%, #1a6fd6 50%, #0d4fa8 100%)',
                borderRadius: 16, transition: 'width 0.08s linear',
                boxShadow: '0 0 6px rgba(77,166,255,0.6)'
              }} />
            </div>
            <div style={{ color: '#555', fontSize: 11, marginTop: 10 }}>
              {progress < 40 ? 'Preparing your experience...' :
               progress < 70 ? 'Loading portfolio data...' :
               progress < 90 ? 'Almost ready...' : 'Welcome!'}
            </div>
          </div>
        )}

        {phase === 'logo' && (
          <div style={{ color: '#333', fontSize: 12, marginTop: 20 }}>Please wait...</div>
        )}
      </div>

      <div style={{ position: 'absolute', bottom: 20, color: '#333', fontSize: 11 }}>
        Copyright © 2025 Portfolio XP
      </div>
    </div>
  )
}
