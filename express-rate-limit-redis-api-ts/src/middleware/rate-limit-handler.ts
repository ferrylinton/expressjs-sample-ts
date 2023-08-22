import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redisClient from '../configs/redis';


const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'ratelimiter',
    dbName:'dbName',
    tableName: 'tableName',
    points: 10,
    duration: 300,
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