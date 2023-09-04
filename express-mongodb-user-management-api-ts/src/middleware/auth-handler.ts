import { NextFunction, Request, Response } from 'express';
import * as tokenService from '../services/token-service';
import * as redisService from '../services/redis-service';

const PUBLIC_API = ['/', '/auth/token']

export const authHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (PUBLIC_API.indexOf(req.path) === -1) {
        const token = tokenService.getTokenFromRequest(req);

        if (token) {
            try {
                const username = await redisService.findToken(token);

                if (username) {
                    if (tokenService.isTokenValid(username, req, token)) {
                        next();
                    } else {
                        return res.status(401).json({ message: "Invalid token" });
                    }

                } else {
                    return res.status(401).json({ message: "Invalid token" });
                }
            } catch (err: any) {
                return res.status(401).json({
                    message: err.message
                });
            }


        } else {
            return res.status(401).json({ message: "Token is required" });
        }
    } else {
        next();
    }
};