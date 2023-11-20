import { NextFunction, Request, Response } from 'express';
import { getWhitelist } from '../services/whitelist-service';
import requestIp from 'request-ip';


export const ipWhitelistHandler = async (req: Request, res: Response, next: NextFunction) => {
    const ip = requestIp.getClientIp(req);

    if (ip && (await getWhitelist()).has(ip)) {
        next();
    } else {
        return res.status(403).json({
            message: "Access Restricted"
        });
    }
};