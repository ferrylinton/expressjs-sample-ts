import { NextFunction, Request, Response } from 'express';

const WHITE_LIST = ['localhost', '192.168.112.31'];

export const restrictOriginHandler = (req: Request, res: Response, next: NextFunction) => {
    if (WHITE_LIST.indexOf(req.hostname) === -1) {
        return res.status(403).json({
            message: "Access Restricted"
        });
    }else{
        next();
    }
};
