import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "Horas lae", NODE_ENV: process.env.NODE_ENV });
});

export default router;