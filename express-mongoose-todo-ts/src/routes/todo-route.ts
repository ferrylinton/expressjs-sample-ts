import { Router } from 'express';
import * as controller from '../controllers/todo-controller';

const router = Router();

router.get('/', controller.find);
router.get("/:id", controller.findById);
router.post('/', controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.deleteById);

export default router;