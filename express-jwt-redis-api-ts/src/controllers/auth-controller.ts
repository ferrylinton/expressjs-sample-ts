import { NextFunction, Request, Response } from 'express';
import * as authService from '../services/auth-service';



export async function generateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body;
        const token = authService.generateToken(username);
        res.status(201).json({
            token
        });
    } catch (error) {
        next(error);
    }
};

