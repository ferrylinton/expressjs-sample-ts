import { Router } from 'express';
import * as authController from '../controllers/auth-controller';

const router = Router();

router.post('/token', authController.generateToken);

export default router;