import { Router } from 'express';
import { getCounter } from '../controllers/counter';

const router = Router();

// GET /api/counter
router.get('/', getCounter);

export default router;
