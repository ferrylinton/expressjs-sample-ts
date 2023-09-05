import { Router } from 'express';
import * as whitelistController from '../controllers/whitelist-controller';

const router = Router();

router.get('/', whitelistController.find);
router.get('/reload', whitelistController.reload);
router.post('/', whitelistController.create);
router.get("/:id", whitelistController.findById);
router.delete("/:id", whitelistController.deleteById);

export default router;