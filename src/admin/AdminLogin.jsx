import React, { useState } from 'react'
import { supabase } from '../lib/supabase.js'

const TITLE_GRADIENT = 'linear-gradient(to bottom, #0a246a 0%, #3169c4 6%, #2663d3 50%, #1941a5 95%)'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0d6db7',
      backgroundImage: 'radial-gradient(ellipse at center, #1e7fc9 0%, #0d5fa0 60%, #08387a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Tahoma, sans-serif',
    }}>
      {/* Login Window */}
      <div style={{
        background: '#ece9d8', width: 380,
        border: '2px solid #0831d9',
        borderRadius: '8px 8px 4px 4px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 1px 1px 0 #6b89d4',
      }}>
        {/* Title Bar */}
        <div style={{ background: TITLE_GRADIENT, padding: '6px 10px', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, width: 14, height: 14 }}>
            {[['#f25022','#7fba00'],['#00a4ef','#ffb900']].flat().map((c,i) => <div key={i} style={{ background: c }} />)}
          </div>
          <span style={{ color: '#fff', fontSize: 12, fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>Admin Login — Portfolio XP</span>
        </div>
        <div style={{ height: 2, background: 'linear-gradient(to right, #2459c9, #7ba2e4, #2459c9)' }} />

        <div style={{ padding: 24 }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, width: 40, height: 40, margin: '0 auto 8px' }}>
              {[['#f25022','#7fba00'],['#00a4ef','#ffb900']].flat().map((c,i) => <div key={i} style={{ background: c, borderRadius: 2 }} />)}
            </div>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Portfolio <span style={{ color: '#e58000' }}>XP</span></div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Administrator Access</div>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontWeight: 'bold', color: '#444' }}>Email Address</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                required autoFocus
                style={{
                  width: '100%', padding: '6px 8px', border: '1px solid #a0a0a0',
                  borderRadius: 2, fontFamily: 'Tahoma', fontSize: 12, boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontWeight: 'bold', color: '#444' }}>Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: '100%', padding: '6px 8px', border: '1px solid #a0a0a0',
                  borderRadius: 2, fontFamily: 'Tahoma', fontSize: 12, boxSizing: 'border-box'
                }}
              />
            </div>

            {error && (
              <div style={{
                background: '#fde8e8', border: '1px solid #e07070', borderRadius: 3,
                padding: '6px 10px', fontSize: 12, color: '#c00', marginBottom: 12
              }}>⚠️ {error}</div>
            )}

            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '7px',
                background: loading ? '#aaa' : 'linear-gradient(to bottom, #6a9ed5, #3265be)',
                border: '1px solid #1a47a0', borderRadius: 4,
                color: '#fff', fontFamily: 'Tahoma', fontSize: 13,
                fontWeight: 'bold', cursor: loading ? 'default' : 'pointer',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)'
              }}
            >{loading ? 'Signing in...' : '🔐 Sign In'}</button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <a href="/" style={{ fontSize: 11, color: '#0831d9' }}>← Back to Portfolio</a>
          </div>
        </div>
      </div>
    </div>
  )
}
