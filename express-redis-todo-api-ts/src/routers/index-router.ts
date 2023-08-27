import { Router } from 'express';
import { create } from '../services/todo-service';

const router = Router();

router.get('/', async (req, res) => {

    await create('test');

    res.status(200).json({ message: 'OK' });
});

export default router;