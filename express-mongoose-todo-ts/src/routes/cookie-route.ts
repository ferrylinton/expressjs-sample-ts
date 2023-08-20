import { Router } from 'express';
import * as controller from '../controllers/cookie-controller';

const router = Router();

router.get('/get', controller.get);
router.get("/set", controller.set);

export default router;