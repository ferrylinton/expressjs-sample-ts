import { NextFunction, Request, Response } from 'express';
import { logger } from "../configs/winston";

export const logRequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const data = {
        id: req.hostname,
        method: req.method,
        url: req.url
    };

    logger.log({
        request: true,
        level: 'debug',
        message: `REQUEST :: ${JSON.stringify(data)}`
    });
    
    next();
};
