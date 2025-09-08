import React from 'react'

export default function LoginButton() {
  const startOAuth = () => {
    // Open backend OAuth route in same tab to allow cookie setting via redirect
    window.location.href = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/auth/google`
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-medium mb-3">Connect your Gmail</h2>
      <p className="text-sm text-gray-600 mb-4">We will request read-only access to your Gmail to summarize unread emails.</p>
      <button
        onClick={startOAuth}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Login with Google
      </button>
    </div>
  )
}
