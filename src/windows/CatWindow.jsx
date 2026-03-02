import React, { useState } from 'react'
import { WinHeader } from './ProjectsWindow.jsx'

export default function CatWindow() {
  const [seed, setSeed] = useState(Date.now())
  const [loading, setLoading] = useState(false)
  const [revealed, setRevealed] = useState(false)

  const fetchNewCat = () => {
    setLoading(true)
    setSeed(Date.now())
    setRevealed(true)
    setTimeout(() => setLoading(false), 600)
  }

  // cataas.com returns a cat image directly as an img src — no API key needed
  const catSrc = `https://cataas.com/cat?t=${seed}`

  return (
    <div style={{ padding: 16, fontFamily: 'Tahoma, sans-serif', textAlign: 'center' }}>
      <WinHeader icon="🐱" title="Secret Cat Mode" />

      <div style={{ fontSize: 12, color: '#888', marginBottom: 16, fontStyle: 'italic' }}>
        You found the secret! 🎉 Here, have a cat.
      </div>

      {revealed && (
        <div style={{
          marginBottom: 16, minHeight: 200, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: '#f5f4f0', border: '1px solid #c0bdb4', borderRadius: 6, overflow: 'hidden',
        }}>
          {loading
            ? <div style={{ fontSize: 40 }}>🐱</div>
            : (
              <img
                src={catSrc}
                alt="Random cat"
                style={{ maxWidth: '100%', maxHeight: 240, display: 'block', margin: '0 auto' }}
                onLoad={() => setLoading(false)}
                onError={(e) => {
                  // Fallback to another cat API
                  e.target.src = `https://placekitten.com/400/${250 + (seed % 50)}`
                }}
              />
            )
          }
        </div>
      )}

      <button
        onClick={fetchNewCat}
        disabled={loading}
        style={{
          background: loading
            ? '#aaa'
            : 'linear-gradient(to bottom, #6a9ed5, #3265be)',
          border: '1px solid #1a47a0', color: '#fff',
          padding: '7px 24px', borderRadius: 4,
          fontFamily: 'Tahoma', fontSize: 13,
          cursor: loading ? 'default' : 'pointer',
          fontWeight: 'bold',
        }}
      >
        {loading ? '🐾 Loading...' : revealed ? '🔀 Another Cat!' : '🐱 Reveal Cat!'}
      </button>

      {revealed && (
        <div style={{ marginTop: 12, fontSize: 11, color: '#bbb' }}>
          Powered by ramsankar🐾
        </div>
      )}
    </div>
  )
}
