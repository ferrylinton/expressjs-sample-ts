
import { Request, Response } from 'express';
import * as authService from '../services/auth-service';

export async function authenticate(req: Request, res: Response) {
    const { username, password } = req.body;
    const token = await authService.authenticate(username, password);

    if (token) {
        res.status(200).json(token);
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }

};