import { Router } from 'express';
import * as authorityController from '../controllers/authority-controller';

const router = Router();

router.get('/', authorityController.find);
router.post('/', authorityController.create);
router.get("/:id", authorityController.findById);
router.put("/:id", authorityController.update);
router.delete("/:id", authorityController.deleteById);

export default router;