import { Router } from 'express';
import * as userController from '../controllers/user-controller';

const userRouter = Router();

userRouter.get('/', userController.getUsers);

export default userRouter;