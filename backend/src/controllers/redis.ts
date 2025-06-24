import { Request, Response } from 'express';
import redisClient from '../utils/redis';

export const getAllKeys = async (req: Request, res: Response) => {
  try {
    const keys = await redisClient.keys('*');
    res.json(keys);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getKey = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const value = await redisClient.get(key);
    res.json({ key, value });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createKey = async (req: Request, res: Response) => {
  try {
    const { key, value } = req.body;
    await redisClient.set(key, value);
    res.status(201).json({ key, value });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteKey = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    await redisClient.del(key);
    res.json({ key });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
