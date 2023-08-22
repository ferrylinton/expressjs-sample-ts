import { NextFunction, Request, Response } from 'express';
import { RateLimiterMongo } from 'rate-limiter-flexible';
import { mongoClient } from '../configs/mongodb';
import { MONGODB_DATABASE } from '../configs/constant';


const rateLimiter = new RateLimiterMongo({
    storeClient: mongoClient,
    dbName: MONGODB_DATABASE,
    tableName: 'ratelimiter',
    points: 10,
    duration: 5,
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