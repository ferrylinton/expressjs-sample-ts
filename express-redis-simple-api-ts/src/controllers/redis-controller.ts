import { NextFunction, Request, Response } from 'express';
import client from '../config/redis';

export async function setValue(req: Request, res: Response, next: NextFunction) {
    let key = req.query.key as string;
    let value = req.query.value as string;

    // expire in seconds
    // const result = await client.set(key, value, {
    //     EX: 30
    // });

    // expire in miliseconds
    const result = await client.set(key, value, {
        PX: 30000
    });


    

    res.status(200).json({result});
};

export async function getValue(req: Request, res: Response, next: NextFunction) {
    let key = req.query.key as string;
    const value = await client.get(key);

    if (value) {
        res.status(200).json({key : value});
    } else {
        res.status(404).json({ message: 'not found' });
    }

};