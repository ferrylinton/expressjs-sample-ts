import { Router } from 'express';
import * as userController from '../controllers/authority-controller';

const userRouter = Router();

userRouter.get('/', userController.find);
userRouter.get("/:id", userController.findById);
userRouter.post('/', userController.create);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.deleteById);

export default userRouter;