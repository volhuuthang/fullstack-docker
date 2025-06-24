import { Request, Response } from 'express';
import pool from '../utils/db';
import redisClient from '../utils/redis';

export const getCounter = async (req: Request, res: Response) => {
  try {
    // Kiểm tra cache Redis trước
    let count = await redisClient.get('visitor_count');
    if (count) {
      count = (parseInt(count) + 1).toString();
      await redisClient.set('visitor_count', count);
      // Đồng bộ lên MySQL (không bắt buộc mỗi lần)
      await pool.query('UPDATE counter SET count = ? WHERE id = 1', [count]);
      return res.json({ count: Number(count), source: 'redis' });
    }
    // Nếu chưa có cache, lấy từ MySQL
    const [rows]: any = await pool.query('SELECT count FROM counter WHERE id = 1');
    let dbCount = rows.length ? rows[0].count + 1 : 1;
    if (!rows.length) {
      await pool.query('INSERT INTO counter (id, count) VALUES (1, 1)');
    } else {
      await pool.query('UPDATE counter SET count = ? WHERE id = 1', [dbCount]);
    }
    await redisClient.set('visitor_count', dbCount.toString());
    return res.json({ count: dbCount, source: 'mysql' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
