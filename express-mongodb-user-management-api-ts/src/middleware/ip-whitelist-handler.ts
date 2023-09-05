import { NextFunction, Request, Response } from 'express';
import { getWhitelist } from '../services/whitelist-service';


export const ipWhitelistHandler = async (req: Request, res: Response, next: NextFunction) => {
    if ((await getWhitelist()).has(req.hostname)) {
        next();
    } else {
        return res.status(403).json({
            message: "Access Restricted"
        });
    }
};