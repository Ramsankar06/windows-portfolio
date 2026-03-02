import React, { useState } from 'react'

export const XP_BTN = (extra = {}) => ({
  background: 'linear-gradient(to bottom, #6a9ed5, #3265be)',
  border: '1px solid #1a47a0', color: '#fff',
  fontFamily: 'Tahoma', fontSize: 12, cursor: 'pointer',
  padding: '5px 16px', borderRadius: 3,
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
  ...extra,
})

export const XP_BTN_DANGER = (extra = {}) => ({
  background: 'linear-gradient(to bottom, #e07070, #c03030)',
  border: '1px solid #901010', color: '#fff',
  fontFamily: 'Tahoma', fontSize: 12, cursor: 'pointer',
  padding: '5px 16px', borderRadius: 3,
  ...extra,
})

export const XP_BTN_GREEN = (extra = {}) => ({
  background: 'linear-gradient(to bottom, #6abd4a, #308020)',
  border: '1px solid #1a6010', color: '#fff',
  fontFamily: 'Tahoma', fontSize: 12, cursor: 'pointer',
  padding: '5px 16px', borderRadius: 3,
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
  ...extra,
})

export const INPUT = {
  width: '100%', padding: '5px 8px', border: '1px solid #a0a0a0',
  borderRadius: 2, fontFamily: 'Tahoma', fontSize: 12,
  boxSizing: 'border-box', background: '#fff',
}

export const TEXTAREA = {
  ...INPUT, resize: 'vertical', lineHeight: 1.5,
}

export function FormField({ label, children }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 'bold', color: '#444', marginBottom: 3, fontFamily: 'Tahoma' }}>{label}</label>
      {children}
    </div>
  )
}

export function AdminCard({ children, style = {} }) {
  return (
    <div style={{
      background: '#f5f4f0', border: '1px solid #c0bdb4', borderRadius: 4,
      padding: 14, marginBottom: 12,
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
      ...style,
    }}>{children}</div>
  )
}

export function SectionHeader({ title, onAdd }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, borderBottom: '2px solid #aca899', paddingBottom: 10 }}>
      <h3 style={{ fontFamily: 'Tahoma', fontSize: 15, color: '#0831d9', margin: 0 }}>{title}</h3>
      {onAdd && (
        <button onClick={onAdd} style={XP_BTN_GREEN()}>+ Add New</button>
      )}
    </div>
  )
}

export function Alert({ type, msg }) {
  const styles = {
    success: { bg: '#d4edda', border: '#28a745', color: '#155724' },
    error:   { bg: '#fde8e8', border: '#e07070', color: '#c00' },
  }
  const s = styles[type] || styles.error
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 3, padding: '6px 10px', fontSize: 12, color: s.color, marginBottom: 10, fontFamily: 'Tahoma' }}>
      {type === 'success' ? '✅ ' : '⚠️ '}{msg}
    </div>
  )
}

export function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <div style={{
        background: '#ece9d8', border: '2px solid #0831d9',
        borderRadius: 6, padding: 24, width: 300, textAlign: 'center',
        fontFamily: 'Tahoma', boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
      }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
        <div style={{ fontSize: 13, marginBottom: 20, color: '#333' }}>Are you sure you want to delete this? This action cannot be undone.</div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button onClick={onConfirm} style={XP_BTN_DANGER()}>Delete</button>
          <button onClick={onCancel} style={XP_BTN()}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
