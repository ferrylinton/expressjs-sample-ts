import { NextFunction, Request, Response } from 'express';
import * as redisService from '../services/redis-service';
import * as tokenService from '../services/token-service';
import * as userService from '../services/user-service';

export async function generateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await userService.verifyUsernameAndPassword(username, password);

        if (user) {
            const token = tokenService.createTokenFromRequest(req);
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
