import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';


const rateLimiter = new RateLimiterMemory({
    points: 5,
    duration: 10,
});

export const limiter = (req: Request, res: Response, next: NextFunction) => {
    rateLimiter.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).json({ message: 'Too Many Requests' });
        });
};