import React, { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import EmailCard from '../components/EmailCard'

export default function Dashboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function fetchSummaries() {
      setLoading(true)
      setError(null)
      try {
        const res = await axiosClient.get('/summaries')
        if (mounted) {
          setItems(res.data.items || [])
        }
      } catch (err) {
        setError(err?.response?.data || { message: err.message })
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchSummaries()
    return () => { mounted = false }
  }, [])

  if (loading) return <div className="p-6 bg-white rounded shadow">Loading summaries…</div>
  if (error) return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-lg font-medium mb-2">Error</h2>
      <pre className="text-sm text-red-600">{JSON.stringify(error, null, 2)}</pre>
      <p className="mt-2">Try logging in again.</p>
      <button onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/auth/google`} className="mt-3 px-3 py-1 bg-blue-600 text-white rounded">Login</button>
    </div>
  )

  if (items.length === 0) return <div className="p-6 bg-white rounded shadow">No unread emails found.</div>

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Unread Email Summaries</h2>
      {items.map(item => <EmailCard key={item.id} item={item} />)}
    </div>
  )
}
