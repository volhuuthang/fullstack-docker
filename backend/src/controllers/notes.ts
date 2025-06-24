import { Request, Response } from 'express';
import pool from '../utils/db';

export const getNotes = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query('SELECT * FROM notes');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const [result]: any = await pool.query('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content]);
    res.status(201).json({ id: result.insertId, title, content });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    await pool.query('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, id]);
    res.json({ id, title, content });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM notes WHERE id = ?', [id]);
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
