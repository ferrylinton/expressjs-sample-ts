import { NextFunction, Request, Response } from 'express';
import client from '../config/redis';

export async function setValue(req: Request, res: Response, next: NextFunction) {
    let key = req.query.key as string;
    let value = req.query.value as string;

    const result = await client.set(key, value, {
        EX: 30
    });

    res.status(200).json(result);
};