import { NextFunction, Request, Response } from 'express';
import * as redisService from '../services/redis-service';
import * as tokenService from '../services/token-service';


export async function generateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (username && password && username === 'admin' && password === 'admin') {
            const token = tokenService.createTokenFromRequest(username, req);
            await redisService.saveToken(username, token);
            res.status(200).json({ username, token });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }

    } catch (error) {
        next(error);
    }
};

export async function revokeToken(req: Request, res: Response, next: NextFunction) {
    try {
        const token = tokenService.getTokenFromRequest(req) as string;
        await redisService.deleteToken(token);
        res.status(200).json({ message: 'Token is revoked' });
    } catch (error) {
        next(error);
    }
};
