import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase.js'
import BootScreen from './components/BootScreen.jsx'
import Desktop from './components/Desktop.jsx'
import AdminLogin from './admin/AdminLogin.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'

function ProtectedRoute({ children, session }) {
  if (!session) return <Navigate to="/admin/login" replace />
  return children
}

export default function App() {
  const [booting, setBooting] = useState(true)
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleShutdown = () => setBooting(true)

  return (
    <Routes>
      <Route path="/admin/login" element={
        session ? <Navigate to="/admin" replace /> : <AdminLogin />
      } />
      <Route path="/admin/*" element={
        authLoading ? <div style={{background:'#000',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Tahoma'}}>Loading...</div> :
        <ProtectedRoute session={session}>
          <AdminDashboard session={session} />
        </ProtectedRoute>
      } />
      <Route path="/*" element={
        booting
          ? <BootScreen onFinish={() => setBooting(false)} />
          : <Desktop onShutdown={handleShutdown} />
      } />
    </Routes>
  )
}
