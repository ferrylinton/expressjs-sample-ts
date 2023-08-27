import { Router } from 'express';
import * as redisController from '../controllers/redis-controller';

const router = Router();

router.get('/set', redisController.setValue);
router.get('/get', redisController.getValue);

export default router;