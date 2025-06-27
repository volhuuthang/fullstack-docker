import { Request, Response } from 'express';
import redisClient from '../utils/redis';

export const getCounter = async (req: Request, res: Response) => {
  try {
    console.log('📥 GET /api/counter triggered');

    // Log Redis host để xác nhận
    console.log('🔧 REDIS_HOST =', process.env.REDIS_HOST);

    const count = await redisClient.incr('counter');

    console.log('✅ Counter incremented:', count);

    res.json({ count });
  } catch (err) {
    console.error('❌ Redis error in getCounter:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
