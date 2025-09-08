import React, { useState } from 'react'
import axiosClient from './api/axiosClient'
import LoginButton from './components/LoginButton'
import Dashboard from './pages/Dashboard'

export default function App() {
  // simple navigation state: 'login' or 'dashboard'
  const [page, setPage] = useState('dashboard') // default attempt to show dashboard
  const [loggedIn, setLoggedIn] = useState(true) // optimistic; backend will respond otherwise

  // check auth by trying to fetch summaries on load
  React.useEffect(() => {
    async function check() {
      try {
        const res = await axiosClient.get('/summaries')
        if (res?.data) {
          setLoggedIn(true)
          setPage('dashboard')
        } else {
          setLoggedIn(false)
          setPage('login')
        }
      } catch (err) {
        setLoggedIn(false)
        setPage('login')
      }
    }
    check()
  }, [])

  return (
    <div className="min-h-screen p-6">
      <header className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">AI Email Summarizer</h1>
        <nav className="space-x-2">
          <button
            onClick={() => setPage('dashboard')}
            className="px-3 py-1 rounded-md bg-white shadow-sm"
          >
            Dashboard
          </button>
          <button
            onClick={() => setPage('login')}
            className="px-3 py-1 rounded-md bg-white shadow-sm"
          >
            Login
          </button>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto">
        {page === 'login' && <LoginButton />}
        {page === 'dashboard' && <Dashboard />}
      </main>
    </div>
  )
}
