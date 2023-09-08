import { Router } from 'express';
import * as whitelistController from '../controllers/whitelist-controller';
import { hasAuthority } from '../middleware/has-authority-handler';
import { MODIFY_WHITELIST_DATA, READ_WHITELIST_DATA } from '../configs/auth-constant';

const router = Router();

router.get('/', hasAuthority(READ_WHITELIST_DATA), whitelistController.find);
router.get('/reload', hasAuthority(READ_WHITELIST_DATA), whitelistController.reload);
router.post('/', hasAuthority(MODIFY_WHITELIST_DATA), whitelistController.create);
router.get("/:id", hasAuthority(READ_WHITELIST_DATA), whitelistController.findById);
router.delete("/:id", hasAuthority(MODIFY_WHITELIST_DATA), whitelistController.deleteById);

export default router;