import { Router } from 'express';
import * as userController from '../controllers/user-controller';

const router = Router();

router.get('/', userController.find);
router.post('/', userController.create);
router.get("/:id", userController.findById);
router.put("/:id", userController.update);
router.delete("/:id", userController.deleteById);

export default router;