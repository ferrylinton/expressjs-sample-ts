import { NextFunction, Request, Response } from 'express';
import { IP_WHITELIST } from '../configs/env-constant';


export const ipWhitelistHandler = (req: Request, res: Response, next: NextFunction) => {
    if (IP_WHITELIST.indexOf(req.hostname) === -1) {
        return res.status(403).json({
            message: "Access Restricted"
        });
    } else {
        next();
    }
};