'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [count, setCount] = useState<number | null>(null)
  const [source, setSource] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/api/counter')
      .then(res => res.json())
      .then(data => {
        setCount(data.count)
        setSource(data.source)
      })
  }, [])

  return (
    <main style={{ padding: 24 }}>
      <h1>Số lượt truy cập: {count !== null ? count : 'Đang tải...'}</h1>
      <p style={{ color: '#888' }}>(Nguồn: {source})</p>
      <div style={{ marginTop: 32 }}>
        <a href="/notes" style={{ marginRight: 16 }}>Quản lý Ghi chú</a>
        <a href="/redis-admin">Quản lý Cache (Redis)</a>
      </div>
    </main>
  )
}
