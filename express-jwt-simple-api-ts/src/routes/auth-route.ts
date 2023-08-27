import { Router } from 'express';
import * as authController from '../controllers/auth-controller';

const router = Router();

router.post('/authenticate', authController.authenticate);
router.post('/revoke', authController.revoke);
router.get('/me', authController.me);

export default router;