import React from 'react'

export default function EmailCard({ item }) {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{item.subject}</h3>
          <p className="text-sm text-gray-500">{item.from} • {new Date(item.date).toLocaleString()}</p>
        </div>
        <div className="text-sm">
          <a target="_blank" rel="noreferrer" href={item.gmailLink} className="underline text-blue-600">Open in Gmail</a>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-700 mb-2">{item.snippet}</p>
        <ul className="list-disc list-inside text-sm text-gray-800">
          {item.summary && item.summary.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
    </div>
  )
}
