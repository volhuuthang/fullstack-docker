import { Router } from 'express';
import { getAllKeys, getKey, createKey, deleteKey } from '../controllers/redis';

const router = Router();

router.get('/keys', getAllKeys);
router.get('/keys/:key', getKey);
router.post('/', createKey);
router.delete('/keys/:key', deleteKey);

export default router;
