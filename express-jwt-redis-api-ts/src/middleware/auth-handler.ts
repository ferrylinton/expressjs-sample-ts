import { NextFunction, Request, Response } from 'express';
import { getToken, verifyToken } from '../services/auth-service';

const PUBLIC_API = ['/', '/auth/token', '/auth/revoke']

export const authHandler = (req: Request, res: Response, next: NextFunction) => {
    if (PUBLIC_API.indexOf(req.path) === -1) {
        const token = getToken(req);

        if (token) {
            try {
                const jwtPayload = verifyToken(token);
                

                if (jwtPayload) {
                    const username = jwtPayload.sub;
                    console.log(username);
                    next();
                } else {
                    return res.status(401).json({
                        message: "Invalid token"
                    });
                }
            } catch (err: any) {
                return res.status(401).json({
                    message: err.message
                });
            }


        } else {
            return res.status(401).json({
                message: "Token is required"
            });
        }
    } else {
        next();
    }
};