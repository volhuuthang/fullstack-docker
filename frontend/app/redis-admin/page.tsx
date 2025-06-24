'use client'
import { useEffect, useState } from 'react'

export default function RedisAdminPage() {
  const [keys, setKeys] = useState<string[]>([])
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [selectedValue, setSelectedValue] = useState('')

  const fetchKeys = async () => {
    const res = await fetch('http://localhost:3001/api/redis/keys')
    const data = await res.json()
    setKeys(data)
  }

  const fetchValue = async (k: string) => {
    const res = await fetch(`http://localhost:3001/api/redis/keys/${k}`)
    const data = await res.json()
    setSelected(k)
    setSelectedValue(data.value)
  }

  useEffect(() => {
    fetchKeys()
  }, [])

  const addKey = async () => {
    await fetch('http://localhost:3001/api/redis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    })
    setKey('')
    setValue('')
    fetchKeys()
  }

  const deleteKey = async (k: string) => {
    await fetch(`http://localhost:3001/api/redis/keys/${k}`, { method: 'DELETE' })
    setSelected(null)
    fetchKeys()
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Quản lý Cache (Redis)</h2>
      <div style={{ margin: '16px 0' }}>
        <input placeholder="Key" value={key} onChange={e => setKey(e.target.value)} />
        <input placeholder="Value" value={value} onChange={e => setValue(e.target.value)} />
        <button onClick={addKey}>Thêm key-value</button>
      </div>
      <ul>
        {keys.map(k => (
          <li key={k} style={{ marginBottom: 12 }}>
            <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => fetchValue(k)}>{k}</span>
            <button onClick={() => deleteKey(k)}>Xóa</button>
            {selected === k && (
              <span style={{ marginLeft: 8 }}><b>Value:</b> {selectedValue}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
} 