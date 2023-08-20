import cors, { CorsOptions } from 'cors';
import { Request } from 'express';
import { CORS_WHITELIST } from '../configs/constant';

type CallbackCors = (err: Error | null, options?: CorsOptions) => void

var corsOptionsDelegate = function (req: Request, callback: CallbackCors) {
    const origin = req.header('Origin') || '';

    if (CORS_WHITELIST.indexOf(origin) !== -1) {
        callback(null, { origin: true });
    } else {
        callback(null, { origin: false })
    }
}


export const corsHandler = cors(corsOptionsDelegate);