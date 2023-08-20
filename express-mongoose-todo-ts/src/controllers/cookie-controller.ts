import { NextFunction, Request, Response } from 'express';
import { COOKIE_OPTIONS } from '../configs/constant';


export async function set(req: Request, res: Response, next: NextFunction) {
    try {

        const key = req.query.key as string;
        const value = req.query.value as string;

        if (key && value) {
            res.cookie(key, value, COOKIE_OPTIONS);
        }

        res.status(200).send({ key, value });
    } catch (error) {
        next(error);
    }
};

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        if(req.signedCookies){
            res.status(200).send(req.signedCookies);
        }else{
            res.status(200).send({message : 'cookies is empty'});
        }
        
    } catch (error) {
        next(error);
    }
};
