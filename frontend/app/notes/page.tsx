'use client'
import { useEffect, useState } from 'react'

interface Note {
  id: number
  title: string
  content: string
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editing, setEditing] = useState<null | number>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  const fetchNotes = async () => {
    const res = await fetch('http://localhost:3001/api/notes')
    const data = await res.json()
    setNotes(data)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const addNote = async () => {
    await fetch('http://localhost:3001/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
    setTitle('')
    setContent('')
    fetchNotes()
  }

  const deleteNote = async (id: number) => {
    await fetch(`http://localhost:3001/api/notes/${id}`, { method: 'DELETE' })
    fetchNotes()
  }

  const startEdit = (note: Note) => {
    setEditing(note.id)
    setEditTitle(note.title)
    setEditContent(note.content)
  }

  const saveEdit = async (id: number) => {
    await fetch(`http://localhost:3001/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, content: editContent })
    })
    setEditing(null)
    fetchNotes()
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Quản lý Ghi chú (Notes)</h2>
      <div style={{ margin: '16px 0' }}>
        <input placeholder="Tiêu đề" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Nội dung" value={content} onChange={e => setContent(e.target.value)} />
        <button onClick={addNote}>Thêm ghi chú</button>
      </div>
      <ul>
        {notes.map(note => (
          <li key={note.id} style={{ marginBottom: 12 }}>
            {editing === note.id ? (
              <>
                <input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                <input value={editContent} onChange={e => setEditContent(e.target.value)} />
                <button onClick={() => saveEdit(note.id)}>Lưu</button>
                <button onClick={() => setEditing(null)}>Hủy</button>
              </>
            ) : (
              <>
                <b>{note.title}</b>: {note.content}
                <button onClick={() => startEdit(note)}>Sửa</button>
                <button onClick={() => deleteNote(note.id)}>Xóa</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
} 